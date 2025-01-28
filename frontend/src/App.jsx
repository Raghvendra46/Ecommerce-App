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

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/policy" element={<Policy />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
