<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
{
    Product::create([
        'name' => 'Phone',
        'description' => 'Smart phone',
        'price' => 50000,
        'image' => null
    ]);

    Product::create([
        'name' => 'Laptop',
        'description' => 'Gaming laptop',
        'price' => 150000,
        'image' => null
    ]);
}
}
