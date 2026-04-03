<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller {
    // app/Http/Controllers/Api/OrderController.php


public function index()
{
    // සියලුම ඇණවුම් අලුත් ඒවා මුලට එන සේ ලබා ගැනීම
    $orders = Order::orderBy('created_at', 'desc')->get();
    return response()->json($orders);
}

public function store(Request $request)
{
    $request->validate([
        'customer_name' => 'required',
        'address' => 'required',
        'phone' => 'required',
        'total_price' => 'required',
        'items' => 'required', // මෙතන array එකක් එනවා
    ]);

    $order = Order::create([
        'customer_name' => $request->customer_name,
        'address' => $request->address,
        'phone' => $request->phone,
        'total_price' => $request->total_price,
        'items' => $request->items, // json_encode ඉවත් කරන්න, Model එකේ casts නිසා මෙය වැඩ කරයි
    ]);

    return response()->json(['message' => 'Order placed successfully!'], 201);
}

public function updateStatus(Request $request, $id)
{
    // 1. අදාළ Order එක සොයා ගැනීම
    $order = Order::findOrFail($id);

    // 2. Status එක Update කිරීම
    $order->status = $request->status;
    $order->save();

    // 3. Mock Notification Logic (Interviewer ට පෙන්වීමට)
    // සැබෑ SMS/Email Gateway එකක් තිබේ නම් මෙතැනදී එම function එක call කළ හැක.
    $notificationMessage = "Hi {$order->customer_name}, your GreenThumb order #GT-{$id} status has been updated to: {$request->status}.";

    // 4. සාර්ථක පණිවිඩය සමඟ Notification විස්තරයත් යැවීම
    return response()->json([
        'message' => 'Order status updated successfully!',
        'notification_sent' => true,
        'customer_notified_as' => $order->phone, // පාරිභෝගිකයාගේ අංකය
        'log' => $notificationMessage
    ], 200);
}
}
