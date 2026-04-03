import { Link } from "react-router-dom";
import Products from "./Products";
import Swal from "sweetalert2";
import { FiHome, FiTruck } from "react-icons/fi";
import {FiShield, FiMessageCircle } from "react-icons/fi";
import { GiLeafSkeleton } from "react-icons/gi";
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";
import { BiLeaf, BiLogoFacebook, BiLogoInstagram, BiLogoWhatsapp, BiChevronRight } from "react-icons/bi";


function Home() {
  const handleContactSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Message Sent! ",
      text: "Thank you for contacting GreenThumb. We will get back to you soon!",
      icon: "success",
      confirmButtonColor: "#2d6a4f",
    });
  };

  return (
    <div className="home-container bg-white">


{/* --- 1. Premium Hero Section (Left Aligned - Modern Look) --- */}
<section className="hero-section position-relative overflow-hidden" style={{ minHeight: "90vh", backgroundColor: "#000" }}>
  
  {/* Automatic Background Slideshow */}
  <div className="hero-slideshow-container position-absolute top-0 start-0 w-100 h-100">
    {[
      "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80", 
      "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&q=80", 
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80", 
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80"
    ].map((image, index) => (
      <div
        key={index}
        className={`hero-slide position-absolute top-0 start-0 w-100 h-100 ${index === 0 ? 'active' : ''}`}
        style={{
          backgroundImage: `url("${image}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          animationDelay: `${index * 4}s`,
          filter: "brightness(0.7)" 
        }}
      ></div>
    ))}
    
    {/* Dark Gradient Overlay for Left Side Readability */}
    <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100" style={{
      background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
      zIndex: 1
    }}></div>
  </div>

  {/* Content Container - Aligned to the Left */}
  <div className="container position-relative d-flex align-items-center h-100" style={{ zIndex: 2 }}>
    <div className="row w-100 pt-5 mt-5">
      <div className="col-lg-8 text-start animate__animated animate__fadeInLeft">
        
        {/* Elite Badge Look */}
        <h6 className="text-success fw-bold text-uppercase mb-3" style={{ letterSpacing: "4px", fontSize: "0.9rem" }}>
          Premium Plant Destination
        </h6>

        {/* Heading Section (Left Aligned) */}
        <div className="main-heading mb-4">
          <h1 className="display-2 fw-bold text-white mb-0" style={{ letterSpacing: "-1px", lineHeight: "1.1" }}>
            CURATE YOUR OWN <br />
            <span className="green-text">GREEN SANCTUARY</span>
          </h1>
          
        </div>

        {/* Subtext */}
        <p className="lead mb-5 fs-4 text-white opacity-75" style={{ maxWidth: "600px", fontWeight: "300" }}>
          Start your botanical journey with hand-selected premium plants, expert care guides, and personalized collections.
        </p>

        {/* --- Action Buttons (Fixed & Professional) --- */}
          <div className="d-flex gap-3 mt-4 animate__animated animate__fadeInUp animate__delay-1s">
            <Link
              to="/products"
              className="btn btn-success btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg border-0 hero-action-btn"
              style={{ backgroundColor: "#2D6A4F", letterSpacing: "1px" }}
            >
              SHOP ALL PLANTS
            </Link>
            
            <a
              href="#about-us"
              className="btn btn-success btn-lg rounded-pill px-5 py-3 fw-bold shadow-lg border-0 hero-action-btn"
              style={{ backgroundColor: "#1B4332", opacity: "0.9", letterSpacing: "1px" }}
            >
              OUR STORY
            </a>
          </div>
                </div>
              </div>
            </div>
          </section>



{/* --- 2. Professional Trust Badges Section --- */}
<section className="py-5" style={{ backgroundColor: "#f8fdf9" }}> 
  <div className="container py-4">
    
    {/* Section Header */}
    <div className="text-center mb-5 animate__animated animate__fadeIn">
      <h6 className="text-success fw-bold text-uppercase mb-2" style={{ letterSpacing: "2px" }}>Why Choose Us</h6>
      <h2 className="fw-bold display-5 mb-3" style={{ color: "#1B4332" }}>The GreenThumb Promise</h2>
      <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
        We ensure every plant reach your home with the same love and care we gave them in our nursery.
      </p>
      <div className="mx-auto mt-3" style={{ width: "60px", height: "3px", background: "#2D6A4F", borderRadius: "10px" }}></div>
    </div>

    <div className="row text-center g-4">
      {/* Fast Delivery Card */}
      <div className="col-lg-3 col-md-6 animate__animated animate__fadeInUp">
        <div className="p-4 rounded-5 shadow-sm h-100 trust-card bg-white border-0">
          <div className="trust-icon-box mb-3">
            <FiTruck size={30} />
          </div>
          <h6 className="fw-bold text-dark mb-2">Fast Delivery</h6>
          <p className="small text-muted mb-0">Safe shipping across Sri Lanka within 2-4 days.</p>
        </div>
      </div>

      {/* 100% Organic Card */}
      <div className="col-lg-3 col-md-6 animate__animated animate__fadeInUp animate__delay-1s">
        <div className="p-4 rounded-5 shadow-sm h-100 trust-card bg-white border-0">
          <div className="trust-icon-box mb-3">
            <GiLeafSkeleton size={30} />
          </div>
          <h6 className="fw-bold text-dark mb-2">100% Organic</h6>
          <p className="small text-muted mb-0">Directly from our nursery, nurtured with love.</p>
        </div>
      </div>

      {/* Secure Payment Card */}
      <div className="col-lg-3 col-md-6 animate__animated animate__fadeInUp animate__delay-2s">
        <div className="p-4 rounded-5 shadow-sm h-100 trust-card bg-white border-0">
          <div className="trust-icon-box mb-3">
            <FiShield size={30} />
          </div>
          <h6 className="fw-bold text-dark mb-2">Secure Payment</h6>
          <p className="small text-muted mb-0">Guaranteed safe transaction via SSL encryption.</p>
        </div>
      </div>

      {/* Expert Support Card */}
      <div className="col-lg-3 col-md-6 animate__animated animate__fadeInUp animate__delay-3s">
        <div className="p-4 rounded-5 shadow-sm h-100 trust-card bg-white border-0">
          <div className="trust-icon-box mb-3">
            <FiMessageCircle size={30} />
          </div>
          <h6 className="fw-bold text-dark mb-2">Expert Support</h6>
          <p className="small text-muted mb-0">Talk to our expert botanists anytime you need.</p>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* --- 3. Best Sellers Section --- */}
      <div id="best-sellers" className="py-5 mt-5">
        <div className="container text-center mb-5">
          <h6 className="text-success fw-bold text-uppercase mb-2" style={{ letterSpacing: "2px" }}>Curated Choice</h6>
          <h2 className="fw-bold display-4 mb-3" style={{ color: "#1B4332" }}>Our Best Sellers</h2>
          <div className="mx-auto" style={{ width: "80px", height: "4px", background: "#2D6A4F", borderRadius: "10px" }}></div>
        </div>
        <div className="container px-4">
          <Products limit={3} />
          <div className="text-center mt-5">
            <Link to="/products" className="btn btn-outline-success rounded-pill px-4 fw-bold text-decoration-none">
              View All Products →
            </Link>
          </div>
        </div>
      </div>



      {/* --- 4. About Us Section --- */}
      <section id="about-us" className="about-section py-5 bg-light my-5 border-top border-bottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <div className="position-relative">
                <img
                  src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80"
                  className="img-fluid rounded-5 shadow-lg"
                  alt="GreenThumb Story"
                />
                <div className="position-absolute bottom-0 end-0 bg-white p-4 m-4 rounded-4 shadow-sm d-none d-lg-block border-start border-success border-5">
                  <h2 className="text-success fw-bold mb-0">10+</h2>
                  <p className="text-muted mb-0 small">Plant Species</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 px-lg-5">
              <h2 className="fw-bold mb-4 display-5" style={{ color: "#1B4332" }}>
                Cultivating Happiness, <br /> One Leaf at a Time.
              </h2>
              <p className="text-muted fs-5 mb-4 lead">
                GreenThumb isn't just a store; it's a mission to reconnect urban
                souls with nature. Every plant is nurtured in Kandy's perfect
                climate before arriving at your door.
              </p>
              <div className="row g-4 mt-2">

              {/* Interior Styling Card */}
              <div className="col-md-6">
                <div className="d-flex align-items-start bg-white p-3 rounded-4 shadow-sm border-start border-success border-4">
                  <div className="icon-box me-3 p-2 rounded-3" style={{ backgroundColor: '#f1f8f4', color: '#2D6A4F' }}>
                    <FiHome size={28} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: '#1B4332' }}>Interior Styling</h6>
                    <p className="small text-muted mb-0">Plants curated for home aesthetics.</p>
                  </div>
                </div>
              </div>

              {/* Eco-Shipping Card */}
              <div className="col-md-6">
                <div className="d-flex align-items-start bg-white p-3 rounded-4 shadow-sm border-start border-success border-4">
                  <div className="icon-box me-3 p-2 rounded-3" style={{ backgroundColor: '#f1f8f4', color: '#2D6A4F' }}>
                    <FiTruck size={28} />
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1" style={{ color: '#1B4332' }}>Eco-Shipping</h6>
                    <p className="small text-muted mb-0">Plastic-free, safe delivery.</p>
                  </div>
                </div>
              </div>
            </div>
             </div>
          </div>
        </div>
      </section>


      {/* --- 5. Contact Section --- */}
      <section id="contact" className="contact-section py-5 my-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              <div className="card border-0 shadow-lg rounded-5 overflow-hidden">
                <div className="row g-0">
                  <div className="col-md-5 p-5 text-white d-flex flex-column justify-content-center" style={{ backgroundColor: "#1B4332" }}>
                    <h3 className="fw-bold mb-4">Get in Touch</h3>
                    <p className="opacity-75 mb-5">Have questions about plant care or delivery? Our expert botanists are here to help.</p>
                    <div className="contact-info-list">
                    {/* Location */}
                    <div className="d-flex align-items-center mb-4">
                      <div className="contact-icon-box me-3">
                        <FiMapPin size={20} />
                      </div>
                      <span className="text-white opacity-75 fw-medium">Colombo Road, Kandy</span>
                    </div>

                    {/* Phone */}
                    <div className="d-flex align-items-center mb-4">
                      <div className="contact-icon-box me-3">
                        <FiPhone size={20} />
                      </div>
                      <span className="text-white opacity-75 fw-medium">+94 76 375 2137</span>
                    </div>

                    {/* Email */}
                    <div className="d-flex align-items-center">
                      <div className="contact-icon-box me-3">
                        <FiMail size={20} />
                      </div>
                      <span className="text-white opacity-75 fw-medium">hello@greenthumb.com</span>
                    </div>
                  </div>
                  </div>
                  <div className="col-md-7 p-5 bg-white">
                    <form onSubmit={handleContactSubmit}>
                      <div className="row g-3">
                        <div className="col-md-6 mb-2">
                          <input type="text" className="form-control rounded-pill border-2 p-3" placeholder="First Name" required />
                        </div>
                        <div className="col-md-6 mb-2">
                          <input type="email" className="form-control rounded-pill border-2 p-3" placeholder="Email Address" required />
                        </div>
                      </div>
                      <div className="mb-4 mt-3">
                        <textarea className="form-control rounded-4 border-2 p-3" rows="4" placeholder="How can we help you create your green space?" required></textarea>
                      </div>
                      <button className="btn btn-success w-100 rounded-pill py-3 fw-bold shadow-sm" style={{ backgroundColor: "#2D6A4F" }}>
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;