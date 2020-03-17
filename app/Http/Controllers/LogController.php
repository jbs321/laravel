<?php

namespace App\Http\Controllers;

use App\Log;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LogController extends Controller
{
    public function index()
    {
        return view('log');
    }

    public function post(Request $request)
    {
        (new Log($request->all()))->save();

        return view('log');
    }

    public function showDashboard()
    {
        $response = [
            'data' => [
                [
                    'Category' => 10,
                    'January' => 10,
                    'February' => 10,
                    'March' => 10,
                    'April' => 10,
                    'May' => 10,
                    'June' => 10,
                    'July' => 10,
                    'August' => 10,
                    'September' => 10,
                    'October' => 10,
                    'November' => 10,
                    'December' => 10,
                ],
            ],
            'headers' => [
                'Category',
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
        ];

        return $response;

        //================================================= Frozen for now ==========================================

        $sql = "
            SELECT * FROM crosstab(
            '
               select c.name,
                      extract(month from l.datetime) as month,
                      sum(l.amount)                  as amount
               from logs l
               left join categories c on l.category_id = c.id
               where
               extract(year from l.datetime) = 2019
               group by c.name, extract(month from l.datetime)
               order by c.name, extract(month from l.datetime)
            ') AS logs(
                  name character varying,
                  January numeric,
                  February numeric,
                  March numeric,
                  April numeric,
                  May numeric,
                  June numeric,
                  July numeric,
                  August numeric,
                  September numeric,
                  October numeric,
                  November numeric,
                  December numeric);";

        $pivotSummary = DB::select($sql);

        $pivotSummary = array_map(function (\stdClass $cls) {
            $values = array_values((array)$cls);

            $values = array_map(function ($val) {
                if (is_null($val)) {
                    return 0;
                }

                return $val;
            }, $values);

            return $values;
        }, $pivotSummary);

        $response = [
            'data' => $pivotSummary,
            'headers' => [
                'Category',
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
        ];

        return new JsonResponse($response);
    }
}
