import { createContext, useState, useEffect } from "react";
import api from "../api/api";

// eslint-disable-next-line react-refresh/only-export-components
export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createPost = async (postData) => {
    try {
      const response = await api.post("/posts", postData);
      setPosts(prev => [...prev, response.data]); // ajouter directement le nouveau post
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updatePost = async (id, postData) => {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      setPosts(prev => prev.map(p => (p.id === id ? response.data : p)));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deletePost = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostsContext.Provider value={{ posts, fetchPosts, createPost, updatePost, deletePost }}>
      {children}
    </PostsContext.Provider>
  );
};
