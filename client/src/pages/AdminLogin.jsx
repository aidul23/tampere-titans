import { React, useState } from 'react';
import { useNavigate } from "react-router-dom";
import api from "../helpers/api";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await api.post("/login", {
                email,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem("isAdminAuthenticated", "true");
                localStorage.setItem("loginTime", new Date().toISOString());
                navigate("/admin-dashboard");
            }
        } catch (err) {
            // Axios errors are caught here
            if (err.response && err.response.status === 401) {
                setError("Invalid credentials");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-96 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

                {error && <p className="text-red-500 text-center">{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            className="w-full border p-2 rounded mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password:</label>
                        <input
                            type="password"
                            className="w-full border p-2 rounded mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin;
