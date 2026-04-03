import { Link } from "react-router-dom";

const categories = [
  { name: "Flowering Plants", img: "https://images.unsplash.com/photo-1597047084897-51e81819a4a7?q=80&w=300", count: 5 },
  { name: "Hanging Plants", img: "https://images.unsplash.com/photo-1545239351-ef056c0082d2?q=80&w=300", count: 8 },
  { name: "Indoor Plants", img: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=300", count: 12 },
  { name: "Low Light Plants", img: "https://images.unsplash.com/photo-1592150621344-828416ee50e6?q=80&w=300", count: 4 }
];

function Collections() {
  return (
    <div className="container py-5 mt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold display-5">Plant Collections</h1>
        <p className="text-muted">Explore our organic and hand-picked varieties</p>
      </div>
      <div className="row g-4">
        {categories.map((cat, i) => (
          <div className="col-md-3" key={i}>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 collection-card">
              <img src={cat.img} className="card-img-top" style={{ height: '250px', objectFit: 'cover' }} alt={cat.name} />
              <div className="card-body text-center bg-white">
                <h5 className="fw-bold">{cat.name}</h5>
                <Link to="/products" className="btn btn-dark w-100 rounded-pill mt-2 py-2 small">
                  Show Products ({cat.count}) →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Collections;