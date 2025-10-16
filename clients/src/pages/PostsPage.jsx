/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import "./PostsPage.css"; // ✅ Import du CSS responsive

export default function PostsPage() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 🧩 Récupérer les posts
  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🧩 Suppression
  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce post ?")) return;
    try {
      await api.delete(`/posts/${id}`);
      fetchPosts();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  // 🧩 Édition
  const handleEdit = (post) => {
    navigate(`/admin/edit-post/${post.id}`, { state: { post } });
  };

  return (
    <div className="posts-container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h5 className="mb-2 mb-md-0">📋 Posts</h5>
        <button
          onClick={() => navigate("/admin/create-post")}
          className="addBtn"
        >
          <span className="material-symbols-outlined">add</span> Create
        </button>
      </div>

      {/* ✅ Tableau des posts */}
      <div className="table-responsive">
        <table className="table table-striped border align-middle">
          <thead className="text-center">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price (€)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {posts.length > 0 ? (
              posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <img
                      src={post.image}
                      alt={post.title}
                      width="70"
                      height="70"
                      className="post-img"
                    />
                  </td>
                  <td>{post.title}</td>
                  <td>{post.category}</td>
                  <td>{post.price}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(post)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <span className="material-symbols-outlined text-white">
                        edit
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="btn btn-danger btn-sm"
                    >
                      <span className="material-symbols-outlined">
                        delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Aucun post trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
