// App.jsx
import React, { lazy, Suspense, useContext } from "react";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Cart from "./components/home/Cart";
import Checkout from "./components/home/Checkout";
import Customers from "./pages/Customers";

// Pages publiques
const ClientDashboard = lazy(() => import("./pages/ClientDashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Pages admin
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const Overview = lazy(() => import("./pages/Overview"));
const Orders = lazy(() => import("./pages/Orders"));
const PostsPage = lazy(() => import("./pages/PostsPage"));
const FormPost = lazy(() => import("./components/FormPost"));
const EditPost = lazy(() => import("./components/EditPost"));

const NotFound = lazy(() => import("./pages/NotFound"));

// ProtectedRoute pour authentification + rôle
function ProtectedRoute({ roleRequired, children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;
  if (roleRequired && user.role !== roleRequired) return <Navigate to="/" replace />;

  return children;
}

// Layout pour routes publiques
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
  { path: "checkout" , element: <Checkout />},
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
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}
