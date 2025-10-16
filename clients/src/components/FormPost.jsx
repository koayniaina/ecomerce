// src/components/FormPost.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";

export default function FormPost() {
  const navigate = useNavigate();
  const location = useLocation();
  const editingPost = location.state?.post || null;

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    image: "",
  });
  const [error, setError] = useState("");

  // Remplir le formulaire si on édite un post
  useEffect(() => {
    if (editingPost) {
      setForm(editingPost);
    }
  }, [editingPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = { ...form, price: Number(form.price) };

      if (editingPost) {
        await api.put(`/posts/${editingPost.id}`, payload);
      } else {
        await api.post("/posts", payload);
      }

      setForm({ title: "", category: "", price: "", image: "" });

      // ✅ Redirection après succès
      navigate("/admin");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || "Erreur serveur");
    }
  };

  return (
    <div className="container mt-4">
      <h2>{editingPost ? "Modifier un post" : "Créer un post"}</h2>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <input
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="form-control"
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" className="btn btn-success">
          {editingPost ? "Mettre à jour" : "Créer"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/admin")}
        >
          Annuler
        </button>
      </form>
    </div>
  );
}
