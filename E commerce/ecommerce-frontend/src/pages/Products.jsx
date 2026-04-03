import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext"; 
import { FiSun, FiDroplet ,FiSearch } from "react-icons/fi"; 

const DUMMY_PLANTS = [
  { 
    id: 101, 
    name: "Snake Plant", 
    scientific_name: "Sansevieria", 
    price: 1250, 
    category: "Indoor", 
    sunlight: "Low", 
    water: "Weekly", 
    image: "https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 102, 
    name: "Monstera Deliciosa", 
    scientific_name: "Swiss Cheese Plant", 
    price: 3800, 
    category: "Indoor", 
    sunlight: "Medium", 
    water: "2 Weeks", 
    image: "https://images.plnts.com/optimize/q:80/w:3840/plain/https://webshop.plnts.com/media/catalog/product/cache/aa5d334f459227518b6c3cf7ea9d29ed/_/h/_hellomrfancyplants_ugc.jpg" 
  },
  { 
    id: 103, 
    name: "Areca Palm", 
    scientific_name: "Dypsis lutescens", 
    price: 2200, 
    category: "Outdoor", 
    sunlight: "High", 
    water: "Daily", 
    image: "https://images.pexels.com/photos/4006567/pexels-photo-4006567.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 104, 
    name: "Peace Lily", 
    scientific_name: "Spathiphyllum", 
    price: 1550, 
    category: "Indoor", 
    sunlight: "Medium", 
    water: "Weekly", 
    image: "https://images.pexels.com/photos/4505171/pexels-photo-4505171.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 105, 
    name: "Aloe Vera", 
    scientific_name: "Aloe barbadensis", 
    price: 950, 
    category: "Outdoor", 
    sunlight: "High", 
    water: "2 Weeks", 
    image: "https://images.pexels.com/photos/2261165/pexels-photo-2261165.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 106, 
    name: "Spider Plant", 
    scientific_name: "Chlorophytum", 
    price: 1100, 
    category: "Indoor", 
    sunlight: "Medium", 
    water: "Weekly", 
    image: "https://images.pexels.com/photos/4603349/pexels-photo-4603349.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 107, 
    name: "Rubber Plant", 
    scientific_name: "Ficus elastica", 
    price: 2900, 
    category: "Indoor", 
    sunlight: "Medium", 
    water: "Weekly", 
    image: "https://images.pexels.com/photos/4750302/pexels-photo-4750302.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 108, 
    name: "English Ivy", 
    scientific_name: "Hedera helix", 
    price: 1800, 
    category: "Outdoor", 
    sunlight: "Medium", 
    water: "Daily", 
    image: "https://images.pexels.com/photos/4505437/pexels-photo-4505437.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 109, 
    name: "ZZ Plant", 
    scientific_name: "Zamioculcas", 
    price: 3200, 
    category: "Indoor", 
    sunlight: "Low", 
    water: "2 Weeks", 
    image: "https://images.pexels.com/photos/7513150/pexels-photo-7513150.jpeg?auto=compress&cs=tinysrgb&w=600" 
  },
  { 
    id: 110, 
    name: "Fiddle Leaf Fig", 
    scientific_name: "Ficus lyrata", 
    price: 4500, 
    category: "Indoor", 
    sunlight: "High", 
    water: "Weekly", 
    image: "https://images.pexels.com/photos/7014410/pexels-photo-7014410.jpeg?auto=compress&cs=tinysrgb&w=600" 
  }
];

function Products({ limit }) {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart } = useCart();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.warn("Backend not connected, loading dummy data for demo.");
        setProducts(DUMMY_PLANTS); 
      });
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const finalProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;


  const getProductImage = (image) => {
    if (!image) return "https://via.placeholder.com/300x200";
    if (image.startsWith("http")) return image; 
    return `http://127.0.0.1:8000/storage/${image}`; 
  };

  return (
    <div className="container mt-4">
      {!limit && (
        <div className="row mb-5 justify-content-center">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control rounded-pill px-4 shadow-sm"
              placeholder="Search for your favorite plant..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-12 mt-3 text-center">
            {["All", "Indoor", "Outdoor"].map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm mx-1 rounded-pill px-3 ${selectedCategory === cat ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="row">
        {finalProducts.length > 0 ? (
          finalProducts.map((product) => (
            <div className="col-lg-4 col-md-6 mb-4" key={product.id}>
              <div className="card h-100 border-0 shadow-sm custom-card position-relative">
                <div className="quick-view-btn-container">
                   <button 
                    className="btn btn-quickview shadow-sm"
                    onClick={() => setQuickViewProduct(product)}
                   >
                     QUICK VIEW
                   </button>
                </div>

                <div className="img-container" style={{ height: '250px', overflow: 'hidden' }}>
                  <img 
                    src={getProductImage(product.image)} 
                    className="card-img-top h-100 w-100" 
                    alt={product.name} 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="card-body">
                  <span className="text-success small fw-bold text-uppercase">{product.scientific_name || 'House Plant'}</span>
                  <h5 className="card-title fw-bold mt-1">{product.name}</h5>
                  
                  <div className="care-guide-box d-flex justify-content-between my-3 p-2 rounded" style={{ backgroundColor: '#f8fdf9', border: '1px solid #e1f0e5' }}>
                  <div className="text-center w-100">
                    <small className="text-muted d-block mb-1" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>SUNLIGHT</small>
                    <span className="fw-bold" style={{ fontSize: '0.85rem', color: '#f59e0b' }}>
                      <FiSun className="me-1" /> {product.sunlight}
                    </span>
                  </div>
                  <div className="text-center w-100 border-start">
                    <small className="text-muted d-block mb-1" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>WATER</small>
                    <span className="fw-bold" style={{ fontSize: '0.85rem', color: '#0ea5e9' }}>
                      <FiDroplet className="me-1" /> {product.water}
                    </span>
                  </div>
                </div>

                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <span className="h5 mb-0 fw-bold" style={{ color: '#2D6A4F' }}>Rs. {product.price}</span>
                    <button 
                      className="btn btn-success rounded-pill px-3 shadow-sm"
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center my-5 py-5 w-100">
             <FiSearch size={40} className="text-muted opacity-50" />
             <h3 className="fw-bold text-dark mt-3">No Plants Found</h3>
          </div>
        )}
      </div>

      {/* --- Quick View Modal Section --- */}
      {quickViewProduct && (
        <div className="quick-view-modal-overlay" style={{ zIndex: 1050 }}>
          <div className="quick-view-modal-content animate__animated animate__zoomIn">
            <button className="close-modal" onClick={() => setQuickViewProduct(null)}>&times;</button>
            <div className="row g-0 h-100">
              <div className="col-md-6 h-100">
                <img 
                  src={getProductImage(quickViewProduct.image)} 
                  className="img-fluid h-100 w-100" 
                  style={{ objectFit: 'cover' }}
                  alt={quickViewProduct.name}
                />
              </div>
              <div className="col-md-6 p-4 d-flex flex-column justify-content-center">
                <h2 className="fw-bold mb-1">{quickViewProduct.name}</h2>
                <p className="text-success fw-semibold italic">{quickViewProduct.scientific_name}</p>
                <hr />
                <p className="text-muted">{quickViewProduct.description || "Perfect for adding a touch of nature to your lifestyle."}</p>
                <div className="d-flex gap-4 mb-4">
                  <div className="d-flex align-items-center">
                    <FiSun className="text-warning me-2 fs-5" /> 
                    <span><strong>Sunlight:</strong> {quickViewProduct.sunlight}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <FiDroplet className="text-info me-2 fs-5" /> 
                    <span><strong>Water:</strong> {quickViewProduct.water}</span>
                  </div>
                </div>
                <h3 className="fw-bold text-success mb-4">Rs. {quickViewProduct.price}.00</h3>
                <button 
                  className="btn btn-success btn-lg rounded-pill shadow w-100"
                  onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;