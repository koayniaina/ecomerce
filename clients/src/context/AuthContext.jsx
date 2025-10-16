import { createContext, useState, useEffect } from "react";
import api from "../api/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ajouter token automatiquement sur toutes les requêtes
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Déconnexion automatique si 401
  api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (error.response?.status === 401) logout();
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      api.get("/me")
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(res.data));
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/login", { email, password });
    const token = res.data.access_token;
    const user = res.data.user;
    localStorage.setItem("access_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
