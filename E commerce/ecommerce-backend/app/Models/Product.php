<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
protected $fillable = [
    'name',
    'scientific_name', // මෙයත් ඇතුළත් කරන්න
    'description',
    'price',
    'category',        // අලුත් column එක
    'sunlight',        // අලුත් column එක
    'water',           // අලුත් column එක
    'image'
];
}
