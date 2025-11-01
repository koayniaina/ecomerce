import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children, roleRequired }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>; 

  if (!user) return <Navigate to="/login" />;


  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" />; 
  }

  return children;
}
