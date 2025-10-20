import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartSummary from "./CartSummary";
import CustomerForm from "./CustomerForm";

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
  });

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customer.name || !customer.email || !customer.address) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    alert(
      `Merci ${customer.name}, votre commande de $${cart
        .reduce((acc, item) => acc + Number(item.price), 0)
        .toFixed(2)} a été passée !`
    );

    localStorage.removeItem("cart");
    setCart([]);
    navigate("/admin/customer");
  };

  if (cart.length === 0)
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <p>Votre panier est vide.</p>
        <Link to="/" className="text-blue-600 hover:underline">
          Retour à la liste des produits
        </Link>
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <CartSummary cart={cart} />
      <CustomerForm
        customer={customer}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Checkout;
