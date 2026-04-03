import { Link } from "react-router-dom";
import { BiLeaf, BiLogoFacebook, BiLogoInstagram, BiLogoWhatsapp, BiChevronRight } from "react-icons/bi";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

function Footer() {
  return (
    <>
      {/* --- 6. Professional & Modern Footer --- */}
      <footer className="footer-section pt-5 pb-4 bg-dark text-white border-top border-secondary">
        <div className="container mt-4">
          <div className="row g-4 mb-5">
            
            {/* 1. Brand Section */}
            <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
              <div className="d-flex align-items-center mb-4">
                <div className="footer-logo-box me-2">
                  <BiLeaf size={24} color="#4ade80" />
                </div>
                <h4 className="fw-bold mb-0 text-white" style={{ letterSpacing: '1px' }}>GreenThumb</h4>
              </div>
              <p className="footer-subtext mb-4 pe-lg-5">
                Elevate your living space with our premium botanical collection. We bring nature to your doorstep with expert care and sustainable living in mind.
              </p>
              <div className="footer-social-links d-flex gap-3">
                {/* Facebook */}
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                  <BiLogoFacebook size={20} />
                </a>
                
                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                  <BiLogoInstagram size={20} />
                </a>
                
                {/* Whatsapp */}
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn">
                  <BiLogoWhatsapp size={20} />
                </a>
              </div>
            </div>

            {/* 2. Quick Links */}
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h6 className="fw-bold text-success mb-4 text-uppercase" style={{ letterSpacing: '2px' }}>Explore</h6>
              <ul className="list-unstyled footer-links">
                <li><Link to="/"><BiChevronRight /> Home</Link></li>
                <li><Link to="/products"><BiChevronRight /> All Plants</Link></li>
                <li><a href="/#best-sellers"><BiChevronRight /> Best Sellers</a></li>
                <li><a href="/#about-us"><BiChevronRight /> Our Story</a></li>
              </ul>
            </div>

            {/* 3. Customer Care */}
            <div className="col-lg-2 col-md-6 mb-4 mb-md-0">
              <h6 className="fw-bold text-success mb-4 text-uppercase" style={{ letterSpacing: '2px' }}>Support</h6>
              <ul className="list-unstyled footer-links">
                <li><a href="#"><BiChevronRight /> Shipping Policy</a></li>
                <li><a href="#"><BiChevronRight /> Refund Policy</a></li>
                <li><a href="#"><BiChevronRight /> Plant Care Tips</a></li>
                <li><a href="/#contact"><BiChevronRight /> Contact Us</a></li>
              </ul>
            </div>

            {/* 4. Get in Touch */}
            <div className="col-lg-4 col-md-6">
              <h6 className="fw-bold text-success mb-4 text-uppercase" style={{ letterSpacing: '2px' }}>Connect With Us</h6>
              <div className="footer-contact-info">
                <div className="d-flex align-items-center mb-3">
                  <FiMapPin className="text-success me-3" />
                  <span className="footer-subtext">Colombo Road, Kandy, Sri Lanka</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <FiPhone className="text-success me-3" />
                  <span className="footer-subtext">+94 76 375 2137</span>
                </div>
                <div className="d-flex align-items-center">
                  <FiMail className="text-success me-3" />
                  <span className="footer-subtext">hello@greenthumb.com</span>
                </div>
              </div>
            </div>

          </div>

          <hr className="footer-divider" />

          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <p className="footer-copyright mb-0">© 2026 GreenThumb. All Rights Reserved. Crafted with ❤️ for Nature.</p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <div className="footer-legal-links">
                <a href="#" className="me-3">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;