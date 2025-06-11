// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import OurProducts from "./pages/OurProducts";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCart from "./pages/ShoppingCart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import SearchPage from "./components/SearchPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ProfilePage from "./components/Profile";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router basename="/ecommerce-app/">
      <div className="overflow-x-hidden flex flex-col min-h-screen dark:bg-dark">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<OurProducts />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </Router>
  );
}

export default App;
