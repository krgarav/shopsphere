import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Product from "./pages/Product/Product";
import Contact from "./pages/Contact/Contact";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/product" element={<Product />} />
      <Route path ="/contact" element={<Contact/>}/>
      <Route path="*" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
