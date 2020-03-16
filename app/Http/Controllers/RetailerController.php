<?php

namespace App\Http\Controllers;

use App\Retailer;
use App\RetailerCategories;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class RetailerController extends Controller
{
    public function index()
    {
        $retailers = Retailer::all(['id', 'name'])
            ->keyBy('name')
            ->sortBy('name', SORT_ASC)
            ->map(function (Retailer $retailer) {
                $categories = $retailer->categories()->first();
                $retailer->category = is_null($categories) ? 18 : $categories->id;

                return $retailer;
            })
            ->values();

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
            'category' => 'integer|max:50|exists:categories,id',
        ]);

        $retailer->update($request->all());
        $retailer->save();

        if($request->category) {
            $id = RetailerCategories::updateOrCreate(['retailer_id' => $retailer->id, 'category_id' => $request->category])->id;
            $retailer->category = $id;
        }

        return json_encode($retailer);
    }
}
