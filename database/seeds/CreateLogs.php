<?php

use Illuminate\Database\Seeder;

class CreateLogs extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if ($h = fopen(storage_path("app/public/2019.csv"), "r")) {
            try {
                $headers = fgetcsv($h, 0, ",");

                while (($data = fgetcsv($h, 0, ",")) !== false) {

                    $data = array_combine($headers, $data);

                    $l = (new \App\Log);
                    $l->fill([
                        'description' => $data['description'],
                        'retailer'    => $data['retailer'],
                        'amount'      => $data['amount'],
                        'datetime'    => $data['datetime'],
                        'category_id' => $data['category_id'],
                        'user_id'     => 1,
                    ]);

                    $l->save();
                }
            } catch (Exception $e) {
            } finally {
                fclose($h);
            }
        }
    }
}
