import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import AdminDashboard from "./pages/AdminDashboard";
import AllOrders from "./pages/AllOrders";
import AdminProducts from "./pages/AdminProducts";
import Users from "./pages/Users";
import NewProduct from "./pages/NewProduct";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route
  path="/product/:id"
  element={<ProductDetails />}
/>
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newproduct" element={<NewProduct />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/admin/products"
  element={<AdminProducts />}
/>
        <Route path="/cart" element={<Cart />} />
        <Route
  path="/admin"
  element={<AdminDashboard />}
/>

<Route
  path="/allorders"
  element={<AllOrders />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;