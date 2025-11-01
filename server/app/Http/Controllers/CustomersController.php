<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomersController extends Controller
{ public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'address' => 'required|string',
            'phone' => 'required|string',
        ]);

        $customer = Customer::create($validated);

        return response()->json($customer, 201);
    }

    public function index()
    {
        return Customer::all();
    }

    public function show($id)
{
    // Assure-toi de récupérer aussi les commandes
    return Customer::with('orders')->findOrFail($id);
}

    public function destroy($id)
    {
        Customer::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
