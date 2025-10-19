
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const postData = location.state?.post;
  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    if (postData) {
      setForm(postData);
    } else {
      api
        .get(`/posts/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => {
          toast.error("Erreur lors du chargement du post");
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/posts/${id}`, form);
      toast.success("Post mis à jour avec succès !");
      setTimeout(() => navigate("/admin"), 1500);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error(" Erreur lors de la mise à jour du post !");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Modifier le post</h2>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
        <input
          type="text"
          name="title"
          placeholder="Titre"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Catégorie"
          value={form.category}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Prix"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL de l'image"
          value={form.image}
          onChange={handleChange}
          required
        />

        {form.image && (
          <img
            src={form.image}
            alt="Aperçu"
            width="150"
            className="mt-2 rounded"
          />
        )}

        <button type="submit" className="btn btn-success mt-3">
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditPost;
