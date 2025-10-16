import React from "react";
import PostsPage from "./PostsPage";
import Sidebar from "../components/Sidebar";
import NavAdmin from "../components/NavAdmin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboard() {
  return (
    <main style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
        <NavAdmin />
      <div className="mainDash">
        <PostsPage />
        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </main>
  );
}
