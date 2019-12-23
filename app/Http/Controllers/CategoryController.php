<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return new JsonResponse($categories);
    }

    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50|unique:categories,name',
        ]);

        $category = new Category;
        $category->name = $request->name;
        $category->save();

        return new JsonResponse($category);
    }

    public function delete(Category $category)
    {
        $category->delete();
        return json_encode(['action' => 'success']);
    }

    public function update(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50|unique:categories,name',
        ]);

        $category = new Category;
        $category->fill($request->all());
        $category->save();

        return json_encode($category);
    }
}
