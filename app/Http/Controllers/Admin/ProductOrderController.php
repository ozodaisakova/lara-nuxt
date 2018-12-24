<?php

namespace App\Http\Controllers\Admin;

use App\ProductOrder;
use App\ProductOrderList;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class ProductOrderController extends Controller
{
    public function all(){
        return response()->json(ProductOrder::with('productorderlist')->get(), 200);
    }

   

    public function show(Request $r){
        $id = $r->id;
        $order = ProductOrder::where('user_id', $id)->with('productorderlist')->get();
        return $order;
    }

    
    public function store(Request $r){
        // return $r->cart_products;
        $order = new ProductOrder();
        $order->user_id = $r->user_id;
        $order->user_name = $r->user_name;
        $order->user_email = $r->user_email;
        $order->user_adress = $r->user_adress;
        $order->user_phone = $r->user_phone;
        $order->total_price = $r->total_price;
        $order->status = 1;
        $order->save();

        foreach ($r->cart_products as $product){
            $orderitem = new ProductOrderList();
            $orderitem->product_order_id = $order->id;
            $orderitem->product_id = $product['id'];
            $orderitem->product_color = $product['color'];
            $orderitem->product_count = $product['count'];
            $order->productorderlist()->save($orderitem);
        }
        return $r;
        if(!$r['product_id'] || !$r['product_count'] || !$r['product_color'] || !$r['user_id'] ||!$r['user_name'] || !$r['user_surname'] || !$r['user_email'] ||!$r['user_adress'] ) 
            return response()->json("Некоторые поля не заполнены. Пожайлуйста, проверьте данные еще раз",400);
        else{
            ProductOrder::create($r->all());
            return response()->json('Данные успешно сохранены',200);
        }

    }
}
