import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchCustomer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);


  const fetchCustomer = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/customers/${id}`);
      setCustomer(response.data);
      setError(null);
    } catch (err) {
      console.error("Erreur Laravel :", err.response ? err.response.data : err);
      setError(
        "Erreur lors de la récupération du client : " +
          (err.response ? JSON.stringify(err.response.data) : err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Chargement du client...</p>;

  if (error) return <p className="p-6 text-red-600">{error}</p>;

  if (!customer) return <p className="p-6">Client introuvable.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Détails du client</h1>

      <div className="border p-4 rounded shadow mb-6">
        <p>
          <span className="font-semibold">Nom :</span> {customer.name}
        </p>
        <p>
          <span className="font-semibold">Email :</span> {customer.email}
        </p>
        <p>
          <span className="font-semibold">Adresse :</span> {customer.address}
        </p>
        <p>
          <span className="font-semibold">Téléphone :</span> {customer.phone || "-"}
        </p>
      </div>

      {customer.orders && customer.orders.length > 0 ? (
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Commandes</h2>
          <ul className="list-disc pl-5">
            {customer.orders.map((order) => (
              <li key={order.id}>
                #{order.id} - {order.total ? `${order.total.toFixed(2)} €` : "Montant inconnu"}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Aucune commande pour ce client.</p>
      )}

      <Link
        to="/admin/customers"
        className="inline-block mt-6 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
      >
        Retour à la liste des clients
      </Link>
    </div>
  );
};

export default CustomerDetails;
