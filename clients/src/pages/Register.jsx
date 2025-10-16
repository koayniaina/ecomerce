import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/api/register", formData);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.status === 422) {
        const errors = err.response.data.errors || {};
        Object.values(errors).forEach((errArray) => {
          toast.error(errArray.join(", "));
        });
      } else {
        toast.error("An unexpected error occurred.");
        console.error(err);
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <div style={{ marginTop: "10px" }}>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
