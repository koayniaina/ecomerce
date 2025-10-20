import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Panier</h1>
      <div className="mb-4">
        <Link to="/" className="text-blue-600 hover:underline mr-4">
          Voir les posts
        </Link>
      </div>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center border rounded-lg p-4 shadow justify-between"
              >
                <div className="flex items-center flex-1">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded mr-4"
                  />
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p>Catégorie: {item.category}</p>
                    <p className="font-bold">${item.price}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                  <button
                    onClick={handleCheckout}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-xl font-bold mt-6">Total: ${total.toFixed(2)}</h2>
        </>
      )}
    </div>
  );
};

export default Cart;
