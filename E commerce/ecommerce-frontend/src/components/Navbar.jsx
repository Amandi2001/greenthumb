import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { BiLeaf, BiCartAlt, BiLogOut } from "react-icons/bi"; 
import Swal from 'sweetalert2';

function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    Swal.fire({
      title: 'Sign Out?',
      text: "Are you sure you want to logout?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2D6A4F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
      }
    });
  };

  
  const isActive = (path) => location.pathname === path ? "active-link" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top custom-nav py-2">
      <div className="container">
        {/* --- Logo Section --- */}
        <Link className="navbar-brand d-flex align-items-center fw-bold text-success fs-4" to="/">
          <div className="logo-icon me-2">
            <BiLeaf size={28} />
          </div>
          <span style={{ letterSpacing: '1px' }}>GreenThumb</span>
        </Link>

        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center fw-semibold">
            
            <li className="nav-item">
              <Link className={`nav-link px-3 nav-hover ${isActive('/')}`} to="/">Home</Link>
            </li>

            <li className="nav-item">
              <a className="nav-link px-3 nav-hover" href="/#best-sellers">Best Sellers</a>
            </li>

            <li className="nav-item">
              <Link className={`nav-link px-3 nav-hover ${isActive('/products')}`} to="/products">All Plants</Link>
            </li>

            <li className="nav-item">
              <a className="nav-link px-3 nav-hover" href="/#contact">Contact</a>
            </li>

            {/* --- Cart Icon Section --- */}
            <li className="nav-item">
              <Link className={`nav-link px-3 position-relative d-flex align-items-center nav-hover ${isActive('/cart')}`} to="/cart">
                <BiCartAlt size={22} className="me-1" />
                
                
                <span className="fw-semibold">Cart</span> 
                
                {cartCount > 0 && (
                  <span className="cart-badge animate__animated animate__bounceIn">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>

            {/* --- Admin Panel --- */}
            {token && localStorage.getItem("role") === "admin" && (
              <li className="nav-item ms-lg-2">
                <Link className="admin-pill px-3" to="/admin">Admin</Link>
              </li>
            )}

           {/* --- Auth Buttons Section --- */}
          <li className="nav-item ms-lg-3">
            {!token ? (
              <Link className="login-btn px-4" to="/login">
                Login
              </Link>
            ) : (
              
              <button className="logout-btn-custom px-4" onClick={handleLogout}>
                Logout
              </button>
             )}
          </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;