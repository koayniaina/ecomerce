import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchCustomers();
  }, [location.state]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/customers");
      setCustomers(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la récupération des clients.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce client ?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/customers/${id}`);
      setCustomers(customers.filter(c => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression du client.");
    }
  };

  const handleView = (id) => {
    navigate(`/admin/customers/${id}`);
  };

  if (loading) return <p className="p-6">Chargement des clients...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Liste des clients</h1>
      {customers.length === 0 ? <p>Aucun client trouvé.</p> : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Nom</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Téléphone</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(c => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{c.name}</td>
                  <td className="py-2 px-4 border-b">{c.email}</td>
                  <td className="py-2 px-4 border-b">{c.phone || "-"}</td>
                  <td className="py-2 px-4 border-b text-center flex justify-center gap-2">
                    <button onClick={() => handleView(c.id)} className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">Voir</button>
                    <button onClick={() => handleDelete(c.id)} className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
