<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'customer_name', 
        'address', 
        'phone', 
        'total_price', 
        'items', // මෙතන items තියෙනවා නේද කියලා බලන්න
        'status'
    ];

    // අනිවාර්යයෙන්ම මේ කොටස ඇතුළත් කරන්න
    protected $casts = [
        'items' => 'array',
    ];
}

