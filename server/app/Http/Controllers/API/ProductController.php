<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Récupérer tous les produits
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    // Récupérer un produit spécifique
    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    // Créer un nouveau produit
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'image' => 'required|string', // URL ou chemin
        ]);

        $product = Product::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image' => $request->image,
        ]);

        return response()->json($product, 201);
    }

    // Mettre à jour un produit existant
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string',
            'description' => 'sometimes|nullable|string',
            'price' => 'sometimes|required|numeric',
            'image' => 'sometimes|required|string',
        ]);

        $product->update($request->only(['name', 'description', 'price', 'image']));

        return response()->json($product);
    }

    // Supprimer un produit
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Produit supprimé avec succès']);
    }
}
