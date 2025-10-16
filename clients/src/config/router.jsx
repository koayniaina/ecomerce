import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ClientDashboard from '../pages/ClientDashboard';
import PostsPage from '../pages/PostsPage';
import AdminDashboard from '../pages/AdminDashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import FormPost from '../components/FormPost';
import EditPost from '../components/EditPost';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <ClientDashboard /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'posts', element: <PostsPage /> },
      {path: 'admin/create-post' , element: <FormPost /> },
      { path: "admin/edit-post/:id", element: <EditPost /> },
      {
        path: 'admin',
        element: (
          <ProtectedRoute roleRequired="admin">
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
