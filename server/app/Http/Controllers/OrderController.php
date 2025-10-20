<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // Récupérer toutes les commandes avec leur client
    public function index()
    {
        $orders = Order::with('customer')->get();
        return response()->json($orders);
    }

    // Créer une nouvelle commande
    public function store(Request $request)
    {
        $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'total' => 'required|numeric',
        ]);

        $order = Order::create([
            'customer_id' => $request->customer_id,
            'total' => $request->total,
        ]);

        return response()->json($order, 201);
    }

    // Supprimer une commande
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Commande supprimée avec succès']);
    }
}
