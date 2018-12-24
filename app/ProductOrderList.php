<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ProductOrderList extends Model
{
    public function productorder()
    {
        return $this->belongsTo('App\ProductOrder');
    }
}
