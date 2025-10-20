import React from "react";

const CustomerForm = ({ customer, handleChange, handleSubmit }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Informations du client</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Nom</label>
          <input
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Adresse</label>
          <textarea
            name="address"
            value={customer.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
         <div>
          <label className="block mb-1 font-semibold">Phone</label>
          <textarea
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
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

export default CustomerForm;
