import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { BiLeaf } from "react-icons/bi";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", formData);
      Swal.fire({
        title: 'Account Created! ',
        text: 'You have successfully registered. Please login now.',
        icon: 'success',
        confirmButtonColor: '#2d6a4f',
        borderRadius: '15px'
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        title: 'Registration Failed',
        text: 'Something went wrong. Please check your details or try again later.',
        icon: 'error',
        confirmButtonColor: '#d33',
        borderRadius: '15px'
      });
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="card border-0 shadow-lg overflow-hidden rounded-4">
              <div className="row g-0">
                
                {/* --- Left Side: Image Section (Same as Login) --- */}
                <div className="col-lg-6 d-none d-lg-block login-image-side">
                  <div className="h-100 d-flex flex-column justify-content-end p-5 text-white overlay-content">
                    <h2 className="fw-bold display-6" style={{ color: "#1B4332" }}>
                      Grow Your Own <br /> Green Space.
                    </h2>
                    <p className="opacity-75 fw-medium text-dark">Join GreenThumb today and start your botanical journey with us.</p>
                  </div>
                </div>

                {/* --- Right Side: Register Form --- */}
                <div className="col-lg-6 bg-white p-4 p-md-5">
                  <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center login-logo mb-3">
                      <BiLeaf size={32} color="#2D6A4F" />
                    </div>
                    <h3 className="fw-bold text-dark">Create Account</h3>
                    <p className="text-muted small">Fill in the details to get started</p>
                  </div>

                  <form onSubmit={handleRegister}>
                    {/* Full Name */}
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted">FULL NAME</label>
                      <div className="input-group custom-input-group border rounded-3 overflow-hidden">
                        <span className="input-group-text bg-light border-0"><FiUser /></span>
                        <input
                          type="text"
                          className="form-control bg-light border-0 py-2 shadow-none"
                          placeholder="John Doe"
                          required
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted">EMAIL ADDRESS</label>
                      <div className="input-group custom-input-group border rounded-3 overflow-hidden">
                        <span className="input-group-text bg-light border-0"><FiMail /></span>
                        <input
                          type="email"
                          className="form-control bg-light border-0 py-2 shadow-none"
                          placeholder="name@example.com"
                          required
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                      <label className="form-label small fw-bold text-muted">PASSWORD</label>
                      <div className="input-group custom-input-group border rounded-3 overflow-hidden">
                        <span className="input-group-text bg-light border-0"><FiLock /></span>
                        <input
                          type="password"
                          className="form-control bg-light border-0 py-2 shadow-none"
                          placeholder="Minimum 8 characters"
                          required
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-success w-100 rounded-pill py-3 fw-bold shadow-lg login-submit-btn d-flex align-items-center justify-content-center"
                    >
                      CREATE ACCOUNT <FiArrowRight className="ms-2" />
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <p className="text-muted small">
                      Already have an account? <Link to="/login" className="text-success fw-bold text-decoration-none">Login Here</Link>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;