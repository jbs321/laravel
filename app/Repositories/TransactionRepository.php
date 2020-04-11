<?php


namespace App\Repositories;


use App\RbcTransaction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class TransactionRepository extends Repository
{
    public function __construct(RbcTransaction $model)
    {
        parent::__construct($model);
    }

    public function fetchTransactionsByYear(int $year)
    {
        $sql = <<<SQL
        with transactions as (
            select extract(year from t.transaction_date)  as year,
                   extract(month from t.transaction_date) as month,
                   c.id                                   as category_id,
                   c.name                                 as category,
                   t.cad::FLOAT                           as amount
            from rbc_transaction t
                     left join retailers r on t.retailer_id = r.id
                     right join retailer_categories rc on r.id = rc.retailer_id
                     left join categories c on rc.category_id = c.id
            where t.retailer_id is not null
            and extract(year from t.transaction_date) = :year

            order by year, month, c.name
        )

        select t.year, t.month, t.category_id, t.category, sum(t.amount)
        from transactions t
        group by t.year, t.month, t.category_id, t.category
        order by t.year, t.month, t.category
SQL;

        $data =  DB::select($sql, compact('year'));
        $data = array_map(function (\stdClass $row) {
            return (array) $row;
        }, $data);

        return $data;
    }
}
