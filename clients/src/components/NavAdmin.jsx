import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import '../assets/css/navAdmin.css'

export default function NavAdmin() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navAdmin">
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span>
            <strong>{user.name}</strong>
          </span>
          <button
            onClick={logout}
            style={{
              backgroundColor: "#e63946",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "3px 12px",
              cursor: "pointer",
            }}
          >
           Logout
          </button>
        </div>
      ) : (
        <span>Chargement...</span>
      )}
    </nav>
  );
}
