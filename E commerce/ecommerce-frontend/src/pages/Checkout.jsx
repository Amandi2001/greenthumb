import { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { BiLeaf, BiChevronLeft } from "react-icons/bi";
import { FiUser, FiMapPin, FiPhone, FiCheckCircle } from "react-icons/fi";
import Swal from 'sweetalert2';

function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const [customer, setCustomer] = useState({ name: "", address: "", phone: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/orders", {
        customer_name: customer.name,
        address: customer.address,
        phone: customer.phone,
        total_price: totalPrice,
        items: cart,
      });

      Swal.fire({
        title: 'Order Placed! 🎉',
        text: 'Thank you for shopping with GreenThumb. We will deliver your plants soon!',
        icon: 'success',
        confirmButtonColor: '#2d6a4f',
        borderRadius: '15px'
      }).then(() => {
        clearCart();
        navigate("/");
      });

    } catch (error) {
      Swal.fire({
        title: 'Order Failed',
        text: 'Something went wrong. Please check your connection and try again.',
        icon: 'error',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="checkout-wrapper py-5 bg-light min-vh-100">
      <div className="container mt-4">
        
        {/* Back to Cart Link */}
        <Link to="/cart" className="text-decoration-none text-success fw-bold mb-4 d-inline-flex align-items-center">
          <BiChevronLeft size={24} /> Back to Cart
        </Link>

        <div className="row g-4 mt-2">
          
          {/* --- Left Side: Delivery Details Form --- */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white h-100">
              <div className="d-flex align-items-center mb-4">
                <div className="icon-badge me-3">
                  <FiMapPin size={24} color="#2D6A4F" />
                </div>
                <h3 className="fw-bold text-dark mb-0">Delivery Details</h3>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">FULL NAME</label>
                  <div className="input-group custom-input-group border rounded-3 overflow-hidden">
                    <span className="input-group-text bg-light border-0"><FiUser /></span>
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 py-2 shadow-none" 
                      placeholder="Amandi Perera"
                      required 
                      onChange={(e) => setCustomer({...customer, name: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">SHIPPING ADDRESS</label>
                  <div className="input-group custom-input-group border rounded-3 overflow-hidden align-items-start">
                    <span className="input-group-text bg-light border-0 pt-3"><FiMapPin /></span>
                    <textarea 
                      className="form-control bg-light border-0 py-2 shadow-none" 
                      rows="3" 
                      placeholder="Enter your street address, city and postal code..."
                      required
                      onChange={(e) => setCustomer({...customer, address: e.target.value})}
                    ></textarea>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label small fw-bold text-muted">PHONE NUMBER</label>
                  <div className="input-group custom-input-group border rounded-3 overflow-hidden">
                    <span className="input-group-text bg-light border-0"><FiPhone /></span>
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 py-2 shadow-none" 
                      placeholder="07X XXX XXXX"
                      required
                      onChange={(e) => setCustomer({...customer, phone: e.target.value})} 
                    />
                  </div>
                </div>

                <div className="payment-notice p-3 rounded-3 mb-4 d-flex align-items-center shadow-sm">
                  <FiCheckCircle className="text-success me-2" size={20} />
                  <span className="small text-muted">Cash on Delivery available for all island delivery.</span>
                </div>

                <button type="submit" className="btn btn-success w-100 rounded-pill py-3 fw-bold shadow-lg checkout-submit-btn">
                  CONFIRM & PLACE ORDER
                </button>
              </form>
            </div>
          </div>

          {/* --- Right Side: Order Summary --- */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style={{ top: '100px' }}>
              <div className="d-flex align-items-center mb-4">
                 <div className="footer-logo-box me-2">
                    <BiLeaf size={24} color="#2D6A4F" />
                 </div>
                 <h5 className="fw-bold mb-0">Order Summary</h5>
              </div>

              <div className="checkout-items mb-4" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {cart.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-3 pb-3 border-bottom border-light">
                    <img 
                      src={`http://127.0.0.1:8000/storage/${item.image}`} 
                      alt={item.name} 
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '10px' }}
                      className="me-3 border"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-0 small fw-bold text-dark">{item.name}</h6>
                      <span className="text-muted small">Qty: {item.quantity}</span>
                    </div>
                    <span className="fw-bold small text-dark">Rs. {item.price * item.quantity}.00</span>
                  </div>
                ))}
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted small">Subtotal:</span>
                <span className="text-dark fw-bold">Rs. {totalPrice}.00</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted small">Delivery Charges:</span>
                <span className="text-success fw-bold small">FREE</span>
              </div>
              
              <hr className="opacity-25" />
              
              <div className="d-flex justify-content-between align-items-center mt-3 p-3 bg-light rounded-3 border border-dashed">
                <span className="h5 mb-0 fw-bold">Grand Total:</span>
                <span className="h4 mb-0 fw-bold text-success">Rs. {totalPrice}.00</span>
              </div>

              <div className="mt-4 text-center">
                 <p className="text-muted" style={{ fontSize: '0.75rem' }}>
                    By clicking Confirm, you agree to our Terms & Conditions.
                 </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Checkout;