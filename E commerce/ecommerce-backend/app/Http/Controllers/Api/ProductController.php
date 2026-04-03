<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::all(), 200);
    }

    public function store(Request $request)
    {
        // 1. Validation එකට අලුත් fields එකතු කිරීම
        $request->validate([
            'name' => 'required',
            'scientific_name' => 'nullable',
            'description' => 'required',
            'price' => 'required|numeric',
            'category' => 'required',
            'sunlight' => 'required',
            'water' => 'required',
            'image' => 'nullable|image|mimes:jpg,jpeg,png'
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        } else {
            $imagePath = null;
        }

        // 2. Database එකට සියලුම දත්ත ඇතුළත් කිරීම
        $product = Product::create([
            'name' => $request->name,
            'scientific_name' => $request->scientific_name,
            'description' => $request->description,
            'price' => $request->price,
            'category' => $request->category,
            'sunlight' => $request->sunlight,
            'water' => $request->water,
            'image' => $imagePath
        ]);

        return response()->json($product, 201);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product, 200);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',
            'category' => 'required',
            'sunlight' => 'required',
            'water' => 'required',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $product->image = $imagePath;
        }

        // 3. Update කිරීමේදී ද සියලුම fields ඇතුළත් කිරීම
        $product->update([
            'name' => $request->name,
            'scientific_name' => $request->scientific_name,
            'description' => $request->description,
            'price' => $request->price,
            'category' => $request->category,
            'sunlight' => $request->sunlight,
            'water' => $request->water,
        ]);

        return response()->json($product, 200);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted'], 200);
    }
}