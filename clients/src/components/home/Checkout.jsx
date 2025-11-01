import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer.name || !customer.email || !customer.address || !customer.phone) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    try {
      
      await axios.post("http://127.0.0.1:8000/api/customers", customer);

    
      const totalAmount = cart.reduce((acc, item) => acc + Number(item.price), 0).toFixed(2);

      alert(`Merci ${customer.name}, votre commande de ${totalAmount} € a été passée !`);

      localStorage.removeItem("cart");
      setCart([]);

      navigate("/", { state: { refresh: true } });
    } catch (err) {
      console.error("Erreur Laravel :", err.response ? err.response.data : err);
      alert("Erreur lors de l’enregistrement du client. Vérifiez la console.");
    }
  };

  if (cart.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <p>Votre panier est vide.</p>
      </div>
    );
  }

  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="border rounded shadow p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Panier</h2>
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="flex items-center space-x-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">{Number(item.price).toFixed(2)} €</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-right font-bold mt-4">Total : {total.toFixed(2)} €</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Informations du client</h2>
        <input
          name="name"
          placeholder="Nom"
          value={customer.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={customer.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Adresse"
          value={customer.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="Téléphone"
          value={customer.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Passer la commande
        </button>
      </form>
    </div>
  );
};

export default Checkout;
