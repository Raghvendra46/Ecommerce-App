import "./App.css";
import { Routes, Route } from "react-router-dom";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import HomePage from "./components/pages/HomePage";
import Register from "./components/pages/Auth/Register";
import Login from "./components/pages/Auth/Login";
import PageNotFound from "./components/pages/PageNotFound";
import Policy from "./components/pages/Policy";
import ForgotPassword from "./components/pages/Auth/ForgotPassword";
import Dashboard from "./components/pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/Admin";
import AdminDashboard from "./components/pages/Admin/AdminDashboard";
import CreateCategory from "./components/pages/Admin/CreateCategory";
import CreateProduct from "./components/pages/Admin/CreateProduct";
import Products from "./components/pages/Admin/Products";
import Search from "./components/pages/Search";
import Users from "./components/pages/Admin/Users";
import MyProfile from "./components/pages/User/MyProfile";
import Orders from "./components/pages/User/Orders";
import UpdateProduct from "./components/pages/Admin/UpdateProduct";
import ProductDetails from "./components/pages/ProductDetails";
import CartPage from "./components/pages/CartPage";
import Categories from "./components/pages/Categories";

const App = () => {
  return (
    <>
      <Routes>
        {/* General Routes */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/product/:slug" element={<ProductDetails />}></Route>
        <Route path="/signUp" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/cart" element={<CartPage />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>

        {/* User Routes */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/my-profile" element={<MyProfile />}></Route>
          <Route path="user/my-orders" element={<Orders />}></Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route
            path="admin/create-category"
            element={<CreateCategory />}
          ></Route>
          <Route
            path="admin/create-product"
            element={<CreateProduct />}
          ></Route>
          <Route path="admin/products" element={<Products />}></Route>
          <Route path="admin/users" element={<Users />}></Route>
          <Route
            path="admin/products/:slug"
            element={<UpdateProduct />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
