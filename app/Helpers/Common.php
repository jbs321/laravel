<?php

namespace App;

if (!function_exists('keyByColumns')) {
    function keyByColumns(array $data, array $columns): array
    {
        if (empty($columns) || empty($data)) {
            return $data;
        }

        foreach ($columns as $key) {
            if (!is_string($key)) {
                throw new \Exception('key must be string');
            }
        }

        $column = array_shift($columns);
        $data = keyBy($data, $column);

        foreach ($data as &$subLevelData) {
            $subLevelData = keyByColumns($subLevelData, $columns);
        }

        return $data;
    }
}


if (!function_exists('keyBy')) {
    function keyBy($data, $key)
    {
        $newData = [];
        foreach ($data as $row) {
            if (!isset($newData[$row[$key]])) {
                $newData[$row[$key]] = [];
            }

            $newData[$row[$key]][] = $row;
        }

        return $newData;
    }
}
