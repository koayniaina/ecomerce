import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Simulons l’état de connexion (plus tard tu utiliseras ton vrai auth context)
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  // Si pas connecté -> redirection vers /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Sinon, afficher le contenu enfant
  return <Outlet />;
}
