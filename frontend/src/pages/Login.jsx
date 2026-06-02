import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Hardcoded admin login
    if (
      formData.email === "admin@shopez.com" &&
      formData.password === "admin123"
    ) {
      const adminUser = {
        name: "Admin",
        email: "admin@shopez.com",
        role: "admin",
      };

      localStorage.setItem(
        "token",
        "admin-token-123"
      );

      localStorage.setItem(
        "user",
        JSON.stringify(adminUser)
      );

      alert("Admin login successful");

      window.location.href = "/admin";

      return;
    }

    // Regular user login
    try {
      console.log(formData);

      const res = await api.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login successful");

      console.log(res.data);

      window.location.href = "/";

    } catch (error) {
      console.log(error.response);

      alert("Login failed");
    }
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "10px",
            width: "400px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1>Login</h1>

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            style={{
              padding: "12px",
            }}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            style={{
              padding: "12px",
            }}
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#4f46e5",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <p
            style={{
              marginTop: "10px",
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}

            <span
              onClick={() => navigate("/register")}
              style={{
                color: "blue",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;