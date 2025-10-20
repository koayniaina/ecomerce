import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/Sidebar.css";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
  const linkClass =
    "";
  const activeClass = "";
  const { logout } = useContext(AuthContext);

  return (
    <div className="sidBar">
      <div className="top-links">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""} tooltip tooltip-right`
          }
          data-tip="Dashboard"
        >
          <span className="material-symbols-outlined">dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""} tooltip tooltip-right`
          }
          data-tip="Orders"
        >
          <span className="material-symbols-outlined">inventory</span>
        </NavLink>

        <NavLink
          to="/admin/customer"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""} tooltip tooltip-right`
          }
          data-tip="Customers"
        >
          <span className="material-symbols-outlined">account_circle</span>
        </NavLink>

        <NavLink
          to="/admin/posts"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : ""} tooltip tooltip-right`
          }
          data-tip="Posts"
        >
          <span className="material-symbols-outlined">deployed_code</span>
        </NavLink>
      </div>

      <div className="bottom-links">
        <button
          onClick={logout}
          className="tooltip tooltip-right btn-logout"
          data-tip="Logout"
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
      </div>
    </div>
  );
}
