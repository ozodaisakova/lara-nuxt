<?php

namespace App\Http\Controllers\Admin;

use App\Information;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;

class InformationController extends Controller
{
    
    public function index()
    {
        return response()->json(['informations' => Information::all()], 200);       
    }

    public function store(Request $request)
    {
        $info = new Information;
        $info->name=$request->name;
        $info->icon=$request->icon;
        $info->hidden=$request->hidden;
        $info->content=$request->content;
        $info->save();
        return response()->json("OK", 200);
        
    }

    public function show(Information $information)
    {
         
    }
    
    public function update(Request $request, Information $information)
    {
        $information->name=$request->name;
        $information->icon=$request->icon;
        $information->hidden=$request->hidden;
        $information->content=$request->content;
        $information->save();
        return response()->json("OK",200);        
    }

    public function destroy(Information $information)
    {
        if($information->delete()) return response()->json("Данные удалены", 200);
       else return response()->json('Данные не правильно заполнены!', 422);        
    }
}
