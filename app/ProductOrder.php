<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductOrder extends Model
{
    protected $fillable=[
        'user_id', 
        'user_name', 
        'user_surname',
        'user_phone',
        'user_email',
        'user_adress'
    ];

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function productorder(){
        return $this->belongsTo('App\Product');
    }

    public function productorderlist(){
        return $this->hasMany('App\ProductOrderList');
    }
}
