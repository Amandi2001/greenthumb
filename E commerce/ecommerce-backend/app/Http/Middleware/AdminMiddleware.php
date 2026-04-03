<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // පරිශීලකයා Login වී ඇත්ද සහ ඔහුගේ role එක 'admin' ද කියා පරීක්ෂා කිරීම
        if (auth()->check() && auth()->user()->role === 'admin') {
            return $next($request);
        }

        // Admin නොවේ නම් Access Denied පණිවිඩය යැවීම
        return response()->json([
            'message' => 'Unauthorized Access! Admin privileges required.'
        ], 403);
    }
}