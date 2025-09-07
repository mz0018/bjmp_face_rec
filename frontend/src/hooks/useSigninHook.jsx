import { useState } from "react";
import axios from "axios";

const useSigninHook = (API_URL) => {
    const [authMode, setAuthMode] = useState("login");
    const [loading, setLoading] = useState(false);

    const signup = async ({ username, email, password, retype }) => {
        if (password !== retype) return alert("Passwords do not match!");

        setLoading(true);
        try {
            const { data } = await axios.post(`${API_URL}/api/admin/signup`, { username, email, password });
            alert("Signup successful!");
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong!");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const signin = async ({ emailOrUsername, password }) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${API_URL}/api/admin/signin`, { email: emailOrUsername, password });
            alert("Signin successful!");
            window.location.href = "/dashboard";
        } catch (err) {
            alert(err.response?.data?.message || "Signin failed!");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { authMode, setAuthMode, signup, signin, loading };
};

export default useSigninHook;
