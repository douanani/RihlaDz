<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsTourist
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
// app/Http/Middleware/IsTourist.php
public function handle($request, Closure $next)
{
    if (auth()->check() && auth()->user()->role === 'tourist') {
        return $next($request);
    }

    return response()->json(['message' => 'Unauthorized - Tourists only'], 403);
}


}
