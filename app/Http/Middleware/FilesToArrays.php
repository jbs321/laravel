<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\UploadedFile;

class FilesToArrays
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $files = $request->allFiles();


        $files = array_map(function (UploadedFile $file) {
            switch ($file->getClientOriginalExtension()) {
                case 'csv':
                    return $this->csv2array($file);
                    break;
                default:
                    return $file;
            }

        }, $files);

        $request->files = $files;

        return $next($request);
    }

    private function csv2array(UploadedFile $file)
    {
        $arr = [];
        if ($handle = fopen($file->getRealPath(), 'r+')) {
            $isHeader = true;
            $headers  = [];
            while (($data = fgetcsv($handle, 0, ",")) !== false) {
                if ($isHeader) {
                    $headers  = $data;
                    $isHeader = false;
                    continue;
                }

                $arr[] = array_combine($headers, $data);
            }
        }

        return collect($arr);
    }
}
