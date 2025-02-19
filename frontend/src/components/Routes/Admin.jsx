import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";
import { environment } from "../../environment";

export default function AdminRoute() {
  const apiUrl = environment.apiUrl;

  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get(`${apiUrl}/auth/admin-auth`);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          navigate("/login");
        }
      } catch (error) {
        console.error("Error in authentication", error);
        setOk(false);
        navigate("/login");
      }
    };
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner />;
}
