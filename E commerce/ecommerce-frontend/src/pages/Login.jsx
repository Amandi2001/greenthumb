import { useState } from "react";
import api from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { BiLeaf } from "react-icons/bi";
import { FiMail, FiLock, FiArrowRight, FiAlertCircle } from "react-icons/fi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role); 

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="card border-0 shadow-lg overflow-hidden rounded-4">
              <div className="row g-0">
                
                {/* --- Left Side: Image Section --- */}
                <div className="col-lg-6 d-none d-lg-block login-image-side">
                  <div className="h-100 d-flex flex-column justify-content-end p-5 text-white overlay-content">
                    <h2 className="fw-bold display-6" style={{ color: "#1B4332" }}>
                      Pure Nature, <br /> Delivered to You.
                    </h2>
                    <p className="opacity-75 fw-medium text-dark">Join our community of plant lovers and start your green sanctuary today.</p>
                  </div>
                </div>

                {/* --- Right Side: Login Form --- */}
                <div className="col-lg-6 bg-white p-4 p-md-5">
                  <div className="text-center mb-5">
                    <div className="d-inline-flex align-items-center justify-content-center login-logo mb-3">
                      <BiLeaf size={32} color="#2D6A4F" />
                    </div>
                    <h3 className="fw-bold text-dark">Welcome Back</h3>
                    <p className="text-muted small">Please enter your details to login</p>
                  </div>

                  {/* --- Error Message Alert --- */}
                  {error && (
                    <div className="alert alert-danger border-0 rounded-3 d-flex align-items-center animate__animated animate__shakeX" role="alert">
                      <FiAlertCircle className="me-2" />
                      <div className="small fw-bold">{error}</div>
                    </div>
                  )}

                  <form onSubmit={handleLogin}>
                    <div className="mb-4">
                      <label className="form-label small fw-bold text-muted">EMAIL ADDRESS</label>
                      <div className="input-group custom-input-group border rounded-3 overflow-hidden">
                        <span className="input-group-text bg-light border-0"><FiMail /></span>
                        <input
                          type="email"
                          className="form-control bg-light border-0 py-2 shadow-none"
                          placeholder="name@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label className="form-label small fw-bold text-muted">PASSWORD</label>
                        <a href="#" className="text-success small text-decoration-none fw-bold">Forgot?</a>
                      </div>
                      <div className="input-group custom-input-group border rounded-3 overflow-hidden">
                        <span className="input-group-text bg-light border-0"><FiLock /></span>
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
                      className="btn btn-success w-100 rounded-pill py-3 fw-bold shadow-lg login-submit-btn d-flex align-items-center justify-content-center"
                    >
                      LOGIN TO ACCOUNT <FiArrowRight className="ms-2" />
                    </button>
                  </form>

                  <div className="mt-5 text-center">
                    <p className="text-muted small">
                      Don't have an account? <Link to="/register" className="text-success fw-bold text-decoration-none">Create free account</Link>
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