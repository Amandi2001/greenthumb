import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { BiLeaf } from "react-icons/bi";
import { FiMail, FiLock, FiArrowRight, FiAlertCircle } from "react-icons/fi";
import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    // --- 🔐 Mock Admin Login (For Vercel Demo without Backend) ---
    
    if (email === "admin@greenthumb.com" && password === "admin123") {
      const mockAdmin = { name: "GreenThumb Admin", role: "admin" };
      
      localStorage.setItem("token", "dummy-admin-token-99");
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", JSON.stringify(mockAdmin));

      Swal.fire({
        title: 'Welcome Admin! ',
        text: 'Accessing Control Panel...',
        icon: 'success',
        timer: 1800,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      
      setTimeout(() => navigate("/admin"), 1800);
      return;
    }
    // ------------------------------------------------------------

    try {
      const res = await api.post("/login", { email, password });
      
      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role); 
      localStorage.setItem("user", JSON.stringify(res.data.user));

      Swal.fire({
        title: 'Login Successful!',
        text: `Welcome back, ${res.data.user.name}!`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      // Role එක අනුව අදාළ පිටුවට යොමු කිරීම
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      
      // Backend එක offline නම් පෙන්වන පණිවිඩය
      const errorMessage = error.response?.data?.message || "Invalid email or password. Please try again.";
      setError(errorMessage);

      Swal.fire({
        title: 'Login Failed',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#2D6A4F'
      });
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="card border-0 shadow-lg overflow-hidden rounded-4">
              <div className="row g-0">
                
                {/* --- Left Side: Decorative Image Section --- */}
                <div className="col-lg-6 d-none d-lg-block login-image-side position-relative" 
                     style={{ 
                       backgroundImage: 'url("https://images.unsplash.com/photo-1470058869958-2a77ade41c02?auto=format&fit=crop&q=80")', 
                       backgroundSize: 'cover',
                       backgroundPosition: 'center'
                     }}>
                  <div className="h-100 d-flex flex-column justify-content-end p-5 text-white overlay-content" 
                       style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
                    <h2 className="fw-bold display-6 mb-3">
                      Pure Nature, <br /> Delivered to You.
                    </h2>
                    <p className="opacity-90 fw-medium">Join our community of plant lovers and start your green sanctuary today.</p>
                  </div>
                </div>

                {/* --- Right Side: Login Form --- */}
                <div className="col-lg-6 bg-white p-4 p-md-5 d-flex flex-column justify-content-center">
                  <div className="text-center mb-4">
                    <div className="d-inline-flex align-items-center justify-content-center login-logo mb-3 p-3 bg-success-subtle rounded-circle">
                      <BiLeaf size={40} color="#2D6A4F" />
                    </div>
                    <h2 className="fw-bold text-dark">Welcome Back</h2>
                    <p className="text-muted small">Access your GreenThumb account</p>
                  </div>

                  {/* --- Error Message Alert --- */}
                  {error && (
                    <div className="alert alert-danger border-0 rounded-3 d-flex align-items-center animate__animated animate__shakeX" role="alert">
                      <FiAlertCircle className="me-2 flex-shrink-0" />
                      <div className="small fw-bold">{error}</div>
                    </div>
                  )}

                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label className="form-label small fw-bold text-muted mb-1 text-uppercase ls-1">Email Address</label>
                      <div className="input-group custom-input-group border rounded-3 overflow-hidden shadow-sm">
                        <span className="input-group-text bg-light border-0 text-muted"><FiMail /></span>
                        <input
                          type="email"
                          className="form-control bg-light border-0 py-2 shadow-none"
                          placeholder="your@email.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-1">
                        <label className="form-label small fw-bold text-muted text-uppercase ls-1">Password</label>
                        <a href="#" className="text-success small text-decoration-none fw-bold">Forgot?</a>
                      </div>
                      <div className="input-group custom-input-group border rounded-3 overflow-hidden shadow-sm">
                        <span className="input-group-text bg-light border-0 text-muted"><FiLock /></span>
                        <input
                          type="password"
                          className="form-control bg-light border-0 py-2 shadow-none"
                          placeholder="••••••••"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="btn btn-success w-100 rounded-pill py-3 fw-bold shadow-lg login-submit-btn d-flex align-items-center justify-content-center transition-all"
                      style={{ letterSpacing: '1px' }}
                    >
                      LOGIN NOW <FiArrowRight className="ms-2" />
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <p className="text-muted small">
                      Don't have an account yet? <br />
                      <Link to="/register" className="text-success fw-bold text-decoration-none border-bottom border-success border-2 pb-1">Create free account</Link>
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

export default Login;