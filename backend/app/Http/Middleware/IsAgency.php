<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAgency
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
// app/Http/Middleware/IsAgency.php
public function handle($request, Closure $next)
{
    if (auth()->check() && auth()->user()->role === 'agency') {
        return $next($request);
    }

    return response()->json(['message' => 'Unauthorized - Agencies only'], 403);
}


}
