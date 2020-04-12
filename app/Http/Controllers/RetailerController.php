<?php

namespace App\Http\Controllers;

use App\Category;
use App\Retailer;
use App\RetailerCategories;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RetailerController extends Controller
{
    public function index()
    {
        $retailers = Retailer::all(['id', 'name'])
            ->keyBy('name')
            ->sortBy('name', SORT_ASC)
            ->map(function (Retailer $retailer) {
                $retailer->categories;
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
        return json_encode($retailer->id);
    }

    public function update(Request $request, Retailer $retailer)
    {
        $request->validate([
            'name' => 'string|max:255',
            'categories' => 'array',
            'categories.*' => 'integer|exists:categories,id',
        ]);

        $retailer->fill($request->all());
        $retailer->save();

        //Clear all old categories
        RetailerCategories::where('retailer_id', $retailer->id)->delete();

        array_map(function (int $category_id) use (&$retailer) {
            $retailer_id = $retailer->id;

            RetailerCategories::updateOrCreate(compact('retailer_id', 'category_id'));
        }, $request->get('categories'));

        $retailer->categories;

        return json_encode($retailer);
    }

    public function updateRetailersWithCategory(Request $request, Category $category)
    {
        $request->validate([
            'retailers' => 'required|array|min:1',
            'retailers.*' => 'required|array',
            'retailers.*.id' => 'required|integer|exists:retailers,id',
        ]);

        $retailers = $request->get('retailers');

        $retailerIds = array_map(function ($retailer) {
            return $retailer['id'];
        }, $retailers);

        RetailerCategories::whereIn('retailer_id', $retailerIds)->delete();

        $retailers = array_map(function (array $retailer) use ($category) {
            return ['retailer_id' => $retailer['id'], 'category_id' => $category->id, 'created_at' => 'now()', 'updated_at' => 'now()'];
        }, $retailers);

        $result = DB::table('retailer_categories')->insert($retailers);

        return new JsonResponse($result);
    }

    public function bulkDelete(Request $request)
    {
        $request->validate([
            'retailers' => 'required|array',
            'retailers.*' => 'required|integer|exists:retailers,id',
        ]);

        $result = DB::table('retailers')->whereIn('id', $request->get('retailers'))->delete();

        return new JsonResponse(['status' => (bool) $result]);
    }
}
