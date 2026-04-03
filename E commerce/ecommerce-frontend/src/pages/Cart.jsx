import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag, FiArrowLeft } from "react-icons/fi"; 
import Swal from 'sweetalert2';

function Cart() {
  const { cart, removeFromCart, updateQty, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleCheckoutClick = (e) => {
    const token = localStorage.getItem("token");
    if (!token) {
      
      e.preventDefault(); 
      
      Swal.fire({
        title: 'Login Required',
        text: 'Please login to your GreenThumb account to proceed with checkout.',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#2d6a4f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login Now',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div className="container mt-5 mb-5 animate__animated animate__fadeIn">
      <div className="d-flex align-items-center mb-4">
        <FiShoppingBag className="me-2 text-success" size={28} />
        <h2 className="fw-bold mb-0" style={{ color: '#1B4332' }}>Shopping Cart</h2>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-5 shadow-sm rounded-4 bg-white border">
          <div className="mb-4">
             <FiShoppingBag size={80} className="text-muted opacity-25" />
          </div>
          <h4 className="text-muted mb-3">Your cart is currently empty</h4>
          <Link to="/products" className="btn btn-success rounded-pill px-5 py-2 shadow-sm fw-bold">
            <FiArrowLeft className="me-2" /> Start Shopping
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {/* --- Cart Items Table --- */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="ps-4 py-3 border-0">Product</th>
                      <th className="py-3 border-0">Price</th>
                      <th className="py-3 border-0 text-center">Quantity</th>
                      <th className="py-3 border-0">Subtotal</th>
                      <th className="py-3 border-0"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center">
                            <img 
  src={item.image.startsWith('http') ? item.image : `http://127.0.0.1:8000/storage/${item.image}`} 
  alt={item.name} 
  className="img-fluid rounded-3"
  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
  onError={(e) => {
    e.target.onerror = null; 
    e.target.src = "https://via.placeholder.com/100x100?text=Plant";
  }}
/>
                            <span className="fw-bold text-dark">{item.name}</span>
                          </div>
                        </td>
                        <td className="text-muted fw-medium">Rs. {item.price}</td>
                        <td className="text-center">
                          <div className="d-flex align-items-center justify-content-center">
                            <div className="qty-control d-flex align-items-center bg-light rounded-pill p-1 shadow-sm border">
                              <button 
                                className="btn btn-sm btn-white rounded-circle p-1"
                                onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                              >
                                <FiMinus size={14} />
                              </button>
                              <span className="mx-3 fw-bold" style={{ minWidth: '20px' }}>{item.quantity}</span>
                              <button 
                                className="btn btn-sm btn-white rounded-circle p-1"
                                onClick={() => updateQty(item.id, item.quantity + 1)}
                              >
                                <FiPlus size={14} />
                              </button>
                            </div>
                          </div>
                        </td>
                        <td className="fw-bold text-success">Rs. {(item.price * item.quantity).toFixed(2)}</td>
                        <td className="text-end pe-4">
                          <button 
                            className="btn btn-outline-danger btn-sm rounded-circle border-0 p-2" 
                            onClick={() => removeFromCart(item.id)}
                            title="Remove Item"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* --- Order Summary Card --- */}
          <div className="col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
              <h5 className="fw-bold mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal Items:</span>
                <span className="fw-bold">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Delivery Charges:</span>
                <span className="text-success fw-bold">FREE</span>
              </div>
              <hr className="opacity-50" />
              <div className="d-flex justify-content-between mb-4 mt-2">
                <span className="h5 fw-bold">Grand Total:</span>
                <span className="h5 fw-bold text-success">Rs. {totalPrice}.00</span>
              </div>
              
              <Link 
                to="/checkout" 
                className="btn btn-success w-100 rounded-pill py-3 fw-bold shadow-lg checkout-btn"
                onClick={handleCheckoutClick}
              >
                PROCEED TO CHECKOUT
              </Link>
              
              <div className="mt-4 text-center">
                <p className="small text-muted mb-0">
                  Secure Checkout Guaranteed <br />
                  <span className="fw-bold text-dark">Visa • Master • KOKO</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;