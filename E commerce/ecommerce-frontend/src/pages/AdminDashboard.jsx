import { useState, useEffect } from "react";
import api from "../api/axios";
import Swal from "sweetalert2";
import { FiSun, FiDroplet } from "react-icons/fi";

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); 
  const [activeTab, setActiveTab] = useState("inventory"); 
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Search සහ Filter සඳහා States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [formData, setFormData] = useState({
    name: "", scientific_name: "", description: "", price: "",
    category: "Indoor", sunlight: "", water: "", image: null
  });

  useEffect(() => { 
    fetchProducts(); 
    fetchOrders(); 
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Orders fetching failed");
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
  try {
    await api.put(`/orders/${orderId}/status`, { status: newStatus });
    Swal.fire({
      title: 'Updated!',
      text: `Order marked as ${newStatus}`,
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    });
    fetchOrders(); 
  } catch (err) {
    Swal.fire('Error', 'Failed to update status', 'error');
  }
};

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (p.scientific_name && p.scientific_name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const resetForm = () => {
    setFormData({ name: "", scientific_name: "", description: "", price: "", category: "Indoor", sunlight: "", water: "", image: null });
    setIsEditing(false);
    setCurrentId(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    try {
      if (isEditing) {
        data.append("_method", "PUT");
        await api.post(`/products/${currentId}`, data);
        Swal.fire({ title: "Updated!", icon: "success", timer: 1500, showConfirmButton: false });
      } else {
        await api.post("/products", data);
        Swal.fire({ title: "Added!", icon: "success", timer: 1500, showConfirmButton: false });
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      Swal.fire("Error", "Action failed.", "error");
    }
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentId(product.id);
    setFormData({
      name: product.name, scientific_name: product.scientific_name || "",
      description: product.description || "", price: product.price,
      category: product.category, sunlight: product.sunlight || "", water: product.water || "", image: null
    });
    setShowModal(true);
  };

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This will remove the item from inventory.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete'
    });
    if (result.isConfirmed) {
      await api.delete(`/products/${id}`);
      fetchProducts();
    }
  };

  

  return (
    <div className="admin-wrapper bg-light min-vh-100 py-4">
      <div className="container-fluid px-5">
        
        {/* --- Header Section --- */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="fw-bold text-dark mb-0">Admin Control Panel </h4>
            <div className="mt-2">
                <button 
                  className={`btn btn-sm me-2 rounded-pill px-3 fw-bold ${activeTab === 'inventory' ? 'btn-dark shadow' : 'btn-outline-dark'}`}
                  onClick={() => setActiveTab('inventory')}
                >
                  Inventory
                </button>
                <button 
                  className={`btn btn-sm rounded-pill px-3 fw-bold ${activeTab === 'orders' ? 'btn-dark shadow' : 'btn-outline-dark'}`}
                  onClick={() => setActiveTab('orders')}
                >
                  Customer Orders
                </button>
            </div>
          </div>
          {activeTab === 'inventory' && (
            <button 
              className="btn btn-success rounded-pill px-4 fw-bold shadow-sm btn-sm"
              onClick={() => { resetForm(); setShowModal(true); }}
            >
              + ADD NEW PLANT
            </button>
          )}
        </div>

        
        {activeTab === 'inventory' && (
          <div className="animate__animated animate__fadeIn">
            {/* Filter & Search Section */}
            <div className="card border-0 shadow-sm rounded-4 p-3 mb-4 bg-white">
              <div className="row align-items-center g-3">
                <div className="col-md-6">
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-white border-end-0 rounded-start-pill px-3 text-muted"></span>
                    <input 
                      type="text" 
                      className="form-control border-start-0 rounded-end-pill py-2" 
                      placeholder="Search by plant name or scientific name..." 
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-md-end gap-2">
                  {["All", "Indoor", "Outdoor"].map((cat) => (
                    <button
                      key={cat}
                      className={`btn btn-sm px-3 rounded-pill fw-semibold ${selectedCategory === cat ? 'btn-success' : 'btn-outline-success border-0'}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inventory Table */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.9rem' }}>
                  <thead className="bg-white border-bottom small text-uppercase fw-bold text-muted">
                    <tr>
                      <th className="py-3 ps-4">Product Info</th>
                      <th className="py-3">Care Info</th>
                      <th className="py-3 text-center">Category</th>
                      <th className="py-3">Price</th>
                      <th className="py-3 text-center pe-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {filteredProducts.map((p) => (
                      <tr key={p.id}>
                        <td className="py-3 ps-4">
                          <div className="d-flex align-items-center">
                            <img src={`http://127.0.0.1:8000/storage/${p.image}`} width="55" height="55" className="rounded-3 shadow-sm me-3 border" style={{ objectFit: 'cover' }} alt={p.name} />
                            <div>
                              <div className="fw-bold text-dark">{p.name}</div>
                              <div className="text-success x-small fw-semibold">{p.scientific_name}</div>
                              <div className="text-muted x-small text-truncate" style={{maxWidth: '220px'}}>{p.description}</div>
                            </div>
                          </div>
                        </td>
                       <td className="py-3">
                      <div className="d-flex flex-column gap-1">
                        {/* Sunlight Icon with Orange Color */}
                        <div className="small d-flex align-items-center fw-semibold text-dark">
                          <FiSun className="me-2 text-warning" style={{ fontSize: '1rem' }} /> 
                          {p.sunlight}
                        </div>
                        
                        {/* Water Icon with Blue Color */}
                        <div className="small d-flex align-items-center text-muted">
                          <FiDroplet className="me-2 text-info" style={{ fontSize: '1rem' }} /> 
                          {p.water}
                        </div>
                      </div>
                    </td>
                        <td className="text-center"><span className="badge-custom">{p.category}</span></td>
                        <td><div className="fw-bold text-dark">Rs. {Number(p.price).toLocaleString()}</div></td>
                        <td className="text-center pe-4">
                          <button className="btn btn-edit me-2" onClick={() => handleEdit(p)}>Edit</button>
                          <button className="btn btn-delete" onClick={() => deleteProduct(p.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredProducts.length === 0 && <div className="text-center py-5 text-muted">No plants found.</div>}
              </div>
            </div>
          </div>
        )}

        
        {activeTab === 'orders' && (
          <div className="animate__animated animate__fadeIn">
             <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0" style={{ fontSize: '0.85rem' }}>
                    <thead className="bg-white border-bottom small text-uppercase fw-bold text-muted">
                      <tr>
                        <th className="py-3 ps-4">Order ID</th>
                        <th>Customer Info</th>
                        <th>Delivery Address</th>
                        <th>Total Price</th>
                        <th className="text-center pe-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {orders.length > 0 ? orders.map((order) => (
                        <tr key={order.id}>
                          <td className="ps-4 fw-bold text-success">#GT-{order.id}</td>
                          <td>
                            <div className="fw-bold text-dark">{order.customer_name}</div>
                            <div className="text-muted small">{order.phone}</div>
                          </td>
                          <td style={{ maxWidth: '250px' }} className="text-muted">{order.address}</td>
                          <td><div className="fw-bold text-dark">Rs. {Number(order.total_price).toLocaleString()}.00</div></td>
                          <td className="text-center pe-4">
                            <select 
                              className={`form-select status-select rounded-pill shadow-sm ${
                                order.status === 'Pending' ? 'status-pending' : 
                                order.status === 'Processing' ? 'status-processing' : 
                                order.status === 'Delivered' ? 'status-delivered' : 
                                'status-cancelled'
                              }`}
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            >
                              <option value="Pending">PENDING</option>
                              <option value="Processing">PROCESSING</option>
                              <option value="Delivered">DELIVERED</option>
                              <option value="Cancelled">CANCELLED</option>
                            </select>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="5" className="text-center py-5 text-muted">No customer orders found yet. 🌿</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
             </div>
          </div>
        )}

        
        {showModal && (
          <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.4)", backdropFilter: 'blur(4px)' }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header border-0 p-4 pb-0">
                  <h5 className="fw-bold text-dark mb-0">{isEditing ? "Edit Plant Details" : "Add New Plant"}</h5>
                  <button type="button" className="btn-close" onClick={resetForm}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body p-4">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="label-style">Plant Name</label>
                        <input type="text" name="name" className="form-control form-control-sm" value={formData.name} required onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="label-style">Scientific Name</label>
                        <input type="text" name="scientific_name" className="form-control form-control-sm" value={formData.scientific_name} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="label-style">Price (Rs.)</label>
                        <input type="number" name="price" className="form-control form-control-sm" value={formData.price} required onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="label-style">Category</label>
                        <select name="category" className="form-select form-select-sm" value={formData.category} onChange={handleInputChange}>
                          <option value="Indoor">Indoor</option>
                          <option value="Outdoor">Outdoor</option>
                          <option value="Pots">Pots</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="label-style">Sunlight</label>
                        <input type="text" name="sunlight" className="form-control form-control-sm" value={formData.sunlight} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="label-style">Watering</label>
                        <input type="text" name="water" className="form-control form-control-sm" value={formData.water} onChange={handleInputChange} />
                      </div>
                      <div className="col-md-12">
                        <label className="label-style">Description</label>
                        <textarea name="description" className="form-control form-control-sm" rows="2" value={formData.description} onChange={handleInputChange}></textarea>
                      </div>
                      <div className="col-md-12">
                        <label className="label-style">Image {isEditing && "(Optional)"}</label>
                        <input type="file" className="form-control form-control-sm" onChange={handleFileChange} />
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer border-0 p-4 pt-0">
                    <button type="button" className="btn btn-light btn-sm px-4 fw-bold" onClick={resetForm}>Cancel</button>
                    <button type="submit" className="btn btn-success btn-sm px-4 fw-bold">{isEditing ? "SAVE CHANGES" : "ADD PLANT"}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;