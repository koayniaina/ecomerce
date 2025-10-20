import React from "react";

const CartSummary = ({ cart }) => {
  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow p-4 flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="text-gray-600">Catégorie: {item.category}</p>
            <p className="font-bold mt-2">${item.price}</p>
          </div>
        ))}
      </div>
      <h3 className="text-lg font-bold mt-6">Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default CartSummary;
