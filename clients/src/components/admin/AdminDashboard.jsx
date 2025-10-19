import React from "react";

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar";
import NavAdmin from '../NavAdmin'

export default function AdminDashboard() {
  return (
    <div>
      <NavAdmin />
      <Sidebar />

      <main className="outlets">
        <Outlet />
      </main>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}
