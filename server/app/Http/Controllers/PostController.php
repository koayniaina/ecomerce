<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
     public function index()
    {
        return response()->json(Post::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:255',
            'category' => 'required',
            'price' => 'required|numeric',
            'image' => 'required|string',
        ]);

        $post = Post::create($request->all());

        return response()->json($post, 201);
    }

    public function show($id)
    {
        return response()->json(Post::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|max:255',
            'category' => 'required',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
        ]);

        $post = Post::findOrFail($id);
        $post->update($request->all());

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();

        return response()->json(['message' => 'Post deleted successfully']);
    }
}
