<?php

namespace App\Http\Controllers;

use App\Category;
use App\Log;
use App\RbcTransaction;
use App\Repositories\TransactionRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use function App\keyByColumns;

class LogController extends Controller
{
    const HEADERS = [
        0 => 'Category',
        1 => 'January',
        2 => 'February',
        3 => 'March',
        4 => 'April',
        5 => 'May',
        6 => 'June',
        7 => 'July',
        8 => 'August',
        9 => 'September',
        10 => 'October',
        11 => 'November',
        12 => 'December',
    ];

    protected $transactionRepository;

    public function __construct(TransactionRepository $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    public function index()
    {
        return view('log');
    }

    public function post(Request $request)
    {
        (new Log($request->all()))->save();

        return view('log');
    }


    public function showOverview(int $year)
    {
        $assembleResponse = [];

        $data = $this->transactionRepository->fetchTransactionsByYear($year);

        $data = keyByColumns($data, ['year', 'month', 'category_id']);
        $categories = Category::all();

        $categories->each(function(Category $category) use ($year, $data, &$assembleResponse){
            $row = [];
            $id   = $category->id;
            $name = $category->name;

            foreach (self::HEADERS as $key => $header) {
                if(0 === $key) {
                    $row[$header] = $name;
                    continue;
                }

                $month = $key;

                if(isset($data[$year][$month][$id][0])) {
                    $row[$header] = $data[$year][$month][$id][0]['sum'];
                } else {
                    $row[$header] = 0;
                }
            }

            $assembleResponse[] = $row;
        });

        return new JsonResponse($assembleResponse);
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
               from transactions l
               left join categories c on l.category_id = c.id
               where
               extract(year from l.datetime) = 2019
               and l.retailer
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
