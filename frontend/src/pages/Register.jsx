import { useState } from "react";

import Navbar from "../components/Navbar";

import api from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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

    try {
      const res = await api.post(
        "/auth/register",
        formData
      );

      alert("Registration successful");

      console.log(res.data);
    } catch (error) {
      console.log(error);
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
          <h1>Register</h1>

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            style={{
              padding: "12px",
            }}
          />

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
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;