// App.jsx
import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";

// Composants
import Cart from "./components/home/Cart";
import Checkout from "./components/home/Checkout";
import Customers from "./pages/Customers";
import CustomerDetails from "./components/home/CustomerDetails";

// Pages publiques
import ClientDashboard from "./pages/ClientDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Pages admin
import AdminDashboard from "./components/admin/AdminDashboard";
import Overview from "./pages/Overview";
import Orders from "./pages/Orders";
import PostsPage from "./pages/PostsPage";
import FormPost from "./components/FormPost";
import EditPost from "./components/EditPost";

import NotFound from "./pages/NotFound";


function ProtectedRoute({ roleRequired, children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (roleRequired && user.role !== roleRequired) return <Navigate to="/" replace />;

  return children;
}


function PublicLayout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <ClientDashboard /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "cart", element: <Cart /> },
  { path: "checkout", element: <Checkout /> },
  { path: "/admin/customers/:id", element: <CustomerDetails /> },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roleRequired="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      { path: "orders", element: <Orders /> },
      { path: "customer", element: <Customers /> },
      { path: "posts", element: <PostsPage /> },
      { path: "create-post", element: <FormPost /> },
      { path: "edit-post/:id", element: <EditPost /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
