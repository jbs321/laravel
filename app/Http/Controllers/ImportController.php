<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ImportController extends Controller
{
    public function import(Request $request)
    {
        $fields = $request->all();
        $file = $request->file('file');
        $arr = [];
        if($handle = fopen($file->getRealPath(), 'r+')) {
            while (($data = fgetcsv($handle, 0, ",")) !== false) {
                $arr[] = $data;
            }
        }

        return new JsonResponse($arr);
    }
}
