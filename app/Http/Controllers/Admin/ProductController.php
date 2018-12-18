<?php

namespace App\Http\Controllers\Admin;

use App\Product;
use Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{

    public function index()
    {
        return response()->json(['products' => Product::all()],200);
    }  

    public function store(Request $request)
    {
        // Массивтерді хабарлау
        $colors = array();
        $images = array();
        
        // Міндетті түрде қажетті ақпараттардың барын тексеру
        $this->validate($request, [
            'name' => 'required',
            'price' => 'required',
            'catalog_id' => 'required',
            'description' => 'required'
        ]);

        // Тауарлардың түстерін деректер қорына json форматта жолдық тип ретінде сақтайды
        foreach($request->colors as $color){
            $json_color  = '{"color":"'.$color.'"}';
            array_push($colors, $json_color);         
        }
        $colors_string =  "[".implode(",", $colors)."]";

        // Суреттерді base_url/img/uploads/product папкасында сақтау және 
        // деректер қорына файл  аттарын json форматта жолдық тип ретінде сақтайды
        foreach($request->images as $file){
            $exploded = explode(',' , $file['path']);
            $decoded = base64_decode($exploded[1]);
            if(str_contains($exploded[0], 'jpeg')){
                $extencion = 'jpg';
            }else{
                $extencion = 'png';
            }
            $filename = str_random(45).'.'.$extencion;
            $path = public_path().'/img/uploads/product/'.$filename;
            file_put_contents($path, $decoded);
            $json_image = '{"image":"/img/uploads/product/'.$filename.'"}';
            // $json_image = "{'image':'/img/uploads/product/".$filename."'}";
            array_push($images, $json_image);
        }
        $images_string ="[".implode(",", $images)."]";
        
        // Деректер қорына ақпараттарды сақтау
        $product = new Product;

        $product->name = $request->name;
        $product->catalog_id = $request->catalog_id;
        $product->price = $request->price;
        $product->colors = $colors_string;
        $product->description = $request->description;
        $product->width = $request->width;
        $product->height = $request->height;
        $product->length = $request->length;
        $product->material = $request->material;
        $product->complect = $request->complect;
        $product->karkas = $request->karkas;
        $product->images = $images_string;
        $product->compound = $request->compound;
        $product->recommendation = $request->recommendation;
        $product->hidden = $request->hidden;
        $product->available = $request->available;

        $product->save();
    }

    public function show($product)
    {
        $json=null;
        $json = Product::with('catalog')->where('id', $product)->get();
        if(count($json)!=0) return response()->json($json, 200);
        else return response()->json("Страница не найдена!", 404);
    }

    public function update(Request $request, Product $p)
    {
        $product = Product::find($request->id);

        $js_img = json_decode($product->images);
        foreach($js_img as $image){
            unlink(public_path($image->image));
        }

        // Массивтерді хабарлау
        $colors = array();
        $images = array();
        
        // Міндетті түрде қажетті ақпараттардың барын тексеру
        $this->validate($request, [
            'name' => 'required',
            'price' => 'required',
            'catalog_id' => 'required',
            'description' => 'required'
        ]);

        // Тауарлардың түстерін деректер қорына json форматта жолдық тип ретінде сақтайды
        foreach($request->colors as $color){
            $json_color  = '{"color":"'.$color.'"}';
            array_push($colors, $json_color);         
        }
        $colors_string =  "[".implode(",", $colors)."]";

        // Суреттерді base_url/img/uploads/product папкасында сақтау және 
        // деректер қорына файл  аттарын json форматта жолдық тип ретінде сақтайды
        foreach($request->images as $file){
            $exploded = explode(',' , $file['path']);
            $decoded = base64_decode($exploded[1]);
            if(str_contains($exploded[0], 'jpeg')){
                $extencion = 'jpg';
            }else{
                $extencion = 'png';
            }
            $filename = str_random(45).'.'.$extencion;
            $path = public_path().'/img/uploads/product/'.$filename;
            file_put_contents($path, $decoded);
            $json_image = '{"image":"/img/uploads/product/'.$filename.'"}';
            // $json_image = "{'image':'/img/uploads/product/".$filename."'}";
            array_push($images, $json_image);
        }
        $images_string ="[".implode(",", $images)."]";
        
        // Деректер қорына ақпараттарды сақтау
      

        $product->name = $request->name;
        $product->catalog_id = $request->catalog_id;
        $product->price = $request->price;
        $product->colors = $colors_string;
        $product->description = $request->description;
        $product->width = $request->width;
        $product->height = $request->height;
        $product->length = $request->length;
        $product->material = $request->material;
        $product->complect = $request->complect;
        $product->karkas = $request->karkas;
        $product->images = $images_string;
        $product->compound = $request->compound;
        $product->recommendation = $request->recommendation;
        $product->hidden = $request->hidden;
        $product->available = $request->available;

        $product->save();
        return $request;
    
    }


    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json("OK",200);
        
    }

    
    public function products_of_catalog(Request $request){
        if($request->catalog_id==null) $catalog_id=0; else  $catalog_id=$request->catalog_id;
        if($request->column==null) $column='id'; else $column=$request->column;
        if($request->order==null) $order='asc'; else $order=$request->order;
        if($request->per==null) $per=12; else $per=$request->per; 
        return response()->json(Product::where('catalog_id', $catalog_id)->orderBy($column, $order)->paginate($per),200);        
    } 


    public function product_for_admin_table(Request $request){
        // sortBy,  descending,     page,   rowsPerPage
        $this->validate($request, [
            'page' => 'numeric',
            'descending' => 'string',
            'sortBy' => "string",
            'rowsPerPage' => 'numeric',
            ]);
        $rowsPerPage = $request->rowsPerPage;
        $column = $request->sortBy;
        if($request->descending=="null") $order="asc";
        if($column=="null") $column="name";
        if($request->descending=="true")  $order="asc";
        else $order="desc";
        return response()->json(Product::orderBy($column, $order)->with('catalog')->paginate($rowsPerPage), 200);
    }
}
