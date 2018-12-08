<template>
<v-flex d-flex xs12 sm4 md3>
    <v-card class="product-card my-1 mx-1"  >      
        <v-img
            :src="image"
            lazy-src='/image-placeholder.svg'
            aspect-ratio="1.3"
            class="grey lighten-2 "
            mb-2>
            <v-layout
                slot="placeholder"
                fill-height
                align-center
                justify-center
                ma-0>
                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
        </v-img>
        <v-divider></v-divider>
        <div class="title mt-3 text-capitalize " >
            <center > <nuxt-link class="cart_name" :to="to_product"> {{product.name}}</nuxt-link>  </center>    
        </div>
        <v-card-text>
            <center class="display-1 font-weight-medium">{{product.price}} тг</center>   
            <center v-if="product.available==1" class="caption " >Есть в наличии</center>
            <center v-else class="caption">Нет в наличии</center>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>        
            <v-btn small outline  color="warning" @click="toCart()">В корзину</v-btn>
            <v-btn  small color="error" router :to="`/buy/`+product.id">&#160;&#160;Купить&#160;&#160;</v-btn>
            <v-spacer></v-spacer>        
        </v-card-actions>    
</v-card>
<v-snackbar
    top
    v-model="snackbar"
    class="text-xs-center">
        Товар успешно добавлен в корзину!
        <v-btn
        color="pink"
        flat
        small
        @click="snackbar = false">Закрыть</v-btn>
</v-snackbar>
</v-flex>
</template>
<script>
export default {
    props: ["product"],
    data(){
        return{           
            to_product: "",
            image: '',
            snackbar: false,
            products:[],
            new_product_cart: null            
        }
    },
    created() {
        this.image=JSON.parse(this.product.images)
        this.image=this.image[0].image
        this.to_product="/product/"+this.product.id
    },
    methods:{
        toCart(){
            if(process.browser){
                //сохранение количество товаров
                if(!localStorage.cart_product_count) localStorage.cart_product_count=0;   
                var count=  parseInt(localStorage.cart_product_count)  +1;   
                localStorage.cart_product_count=count.toString();
                this.snackbar=true;
                this.$store.dispatch('increment_cart', 1);
                // сохранение самого продукта в localstorage и в корзину
                if(!localStorage.cart_product_list) 
                    localStorage.setItem('cart_product_list', '[]');
                var pr=localStorage.getItem('cart_product_list');               
                this.products=JSON.parse(pr);    
                this.new_product_json='{ "user_id":"Not registered", "product_id":"'+this.product.id+'"}';
                this.products.push(this.new_product_json);
                localStorage.removeItem('cart_product_list')
                localStorage.setItem('cart_product_list', JSON.stringify(this.products));
            }
        },
    }
}
</script>
<style scoped>
.product-card:hover{
    transform: translateY(-10px);
    box-shadow: 0px 10px 20px -2px gray ;    
}
.cart_name{
    text-decoration: none;
    color: black;
}
.cart_name:hover{
    cursor:pointer;
    text-decoration: underline;
    transition: 1.2s ease !important;
}
</style>
