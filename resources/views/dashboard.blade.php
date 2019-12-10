@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Log Transaction</div>

                    <style>
                        td {
                            text-align: center;
                        }
                    </style>

                    <div class="card-body">
                        <table class="col-12">
                            <thead>
                            <tr style="background: #5a6268;color: white">
                                <td>Category</td>
                                <td>January</td>
                                <td>February</td>
                                <td>March</td>
                                <td>April</td>
                                <td>May</td>
                                <td>June</td>
                                <td>July</td>
                                <td>August</td>
                                <td>September</td>
                                <td>October</td>
                                <td>November</td>
                                <td>December</td>
                            </tr>
                            </thead>
                            <tbody>
                            @foreach ($logs as $catId => $category)
                                <tr>
                                    <td>{{$catId}}</td>
                                    <td>{!! isset($category[1]['amount']) ? $category[1]['amount'] : 0!!}</td>
                                    <td>{!! isset($category[2]['amount']) ? $category[2]['amount'] : 0!!}</td>
                                    <td>{!! isset($category[3]['amount']) ? $category[3]['amount'] : 0!!}</td>
                                    <td>{!! isset($category[4]['amount']) ? $category[4]['amount'] : 0!!}</td>
                                    <td>{!! isset($category[5]['amount']) ? $category[5]['amount'] : 0!!}</td>
                                    <td>{!! isset($category[6]['amount']) ? $category[6]['amount'] : 0!!}</td>
                                    <td>{!! isset($category[7]['amount']) ? $category[7]['amount'] : 0!!}</td>
                                    <td>{!! isset($category[8]['amount']) ? $category[8]['amount'] : 0!!}</td>
                                    <td>{!! isset($category[9]['amount']) ? $category[9]['amount'] : 0!!}</td>
                                    <td>{!! isset($category[10]['amount']) ? $category[10]['amount'] : 0!!}</td>
                                    <td>{!! isset($category[11]['amount']) ? $category[11]['amount'] : 0!!}</td>
                                    <td>{!! isset($category[12]['amount']) ? $category[12]['amount'] : 0!!}</td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
