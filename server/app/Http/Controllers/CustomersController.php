<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomersController extends Controller
{
    // Récupérer tous les clients avec leurs commandes
    public function index()
    {
        $customers = Customer::with('orders')->get();
        return response()->json($customers);
    }

    // Supprimer un client
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return response()->json(['message' => 'Client supprimé avec succès']);
    }
}
