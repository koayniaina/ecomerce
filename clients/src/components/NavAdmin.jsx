import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import '../assets/css/navAdmin.css'

export default function NavAdmin() {
  const { user } = useContext(AuthContext);

  return (
    <nav className="navAdmin">
      {user ? (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span>
            <strong>{user.name}</strong>
          </span>
        </div>
      ) : (
        <span>Chargement...</span>
      )}
    </nav>
  );
}
