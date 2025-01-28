import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const authCheck = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/auth/user-auth`);
                if (res.data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                    navigate('/login');
                }
            } catch (error) {
                console.error("Error checking authentication:", error);
                setOk(false);
                navigate('/login');
            }
        };

        if (auth?.token) {
            authCheck();
        }
    }, [auth?.token]);

    return ok ? <Outlet /> : <Spinner />;
}