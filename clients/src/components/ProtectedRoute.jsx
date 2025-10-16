import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, roleRequired }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>; // ou un spinner

  // Si pas d'utilisateur ou token expiré
  if (!user) return <Navigate to="/login" />;

  // Si rôle requis et non autorisé
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />; // redirige vers dashboard client
  }

  return children;
}
