
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Footer from "./pages/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import { CartProvider } from "./context/CartContext";

function App() {
  const userRole = localStorage.getItem("role"); 

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar /> 
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route 
              path="/admin" 
              element={userRole === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;