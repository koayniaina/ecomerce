/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/customers"); // API Laravel
      setCustomers(response.data);
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
      await axios.delete(`http://localhost:8000/api/customers/${id}`);
      setCustomers(customers.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression du client.");
    }
  };

  if (loading) return <p className="p-6">Chargement des clients...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Liste des clients</h1>

      {customers.length === 0 ? (
        <p>Aucun client trouvé.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-left">Nom</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Téléphone</th>
                <th className="py-2 px-4 border-b text-left">Commandes</th>
                <th className="py-2 px-4 border-b text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{customer.name}</td>
                  <td className="py-2 px-4 border-b">{customer.email}</td>
                  <td className="py-2 px-4 border-b">
                    {customer.phone || "-"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {customer.orders && customer.orders.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {customer.orders.map((order) => (
                          <li key={order.id}>
                            #{order.id} -{" "}
                            {order.total
                              ? `${order.total.toFixed(2)} €`
                              : "Montant inconnu"}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "Aucune commande"
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
                    >
                      Supprimer
                    </button>
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
