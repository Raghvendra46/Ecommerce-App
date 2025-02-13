import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth.jsx";
import { CartProvider } from "./context/cart.jsx";
import { SearchProvider } from "./context/search.jsx";

createRoot(document.getElementById("root")).render(
  <SearchProvider>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </SearchProvider>
);
