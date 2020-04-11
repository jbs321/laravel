<?php

namespace App\Http\Controllers;

use App\Category;
use App\Retailer;
use App\RetailerCategories;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class RetailerController extends Controller
{
    public function index()
    {
        $retailers = Retailer::all(['id', 'name'])
            ->keyBy('name')
            ->sortBy('name', SORT_ASC)
            ->map(function (Retailer $retailer) {
                $categories = $retailer->categories()->get()->map(function (Category $category) {
                    return $category->name;
                });
                $retailer->categories = $categories;
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
            'name' => 'string|max:255',
            'categories' => 'array',
        ]);

        $retailer->fill($request->all());
        $retailer->save();

        $categoryList = Category::all();

        RetailerCategories::where('retailer_id', $retailer->id)->delete();

        foreach ($request->categories as $categoryName) {
            $catId = $categoryList->firstWhere('name', 'ilike', $categoryName)->toArray()['id'];
            RetailerCategories::updateOrCreate(['retailer_id' => $retailer->id, 'category_id' => $catId]);
            $categories = $retailer->categories()->get()->map(function (Category $category) {
                return $category->name;
            });

            $retailer->categories = $categories;
        }

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
}
