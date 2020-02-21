<?php

namespace App\Http\Controllers;

use App\Retailer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class RetailerController extends Controller
{
    public function index()
    {
        $retailers = Retailer::all(['id', 'name'])->keyBy('name')->sortBy('name', SORT_ASC)->values();
        return new JsonResponse($retailers);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50|unique:retailers,name',
        ]);

        $retailer = new Retailer;
        $retailer->name = $request->name;
        $retailer->save();

        return new JsonResponse($retailer);
    }

    public function delete(Retailer $retailer)
    {
        $retailer->delete();
        return json_encode(['action' => 'success']);
    }

    public function update(Request $request, Retailer $retailer)
    {
        $request->validate([
            'name' => 'required|string|max:50|unique:retailers,name',
        ]);

        $retailer->fill($request->all());
        $retailer->save();

        return json_encode($retailer);
    }
}
