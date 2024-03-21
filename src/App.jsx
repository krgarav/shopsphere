import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product";
import Contact from "./pages/Contact/Contact";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Product />} />
      <Route path="/product" element={<Product />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/product/:id/" element={<ProductDetail />} />
      <Route path="*" element={<Product />}></Route>
    </Routes>
  );
}

export default App;
