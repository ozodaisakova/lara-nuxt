<template>
<v-flex d-flex xs12 sm4 md3>
    <v-card class="product-card my-1 mx-1"  ripple>      
        <v-img
            :src="image"
            lazy-src='/image-placeholder.svg'
            aspect-ratio="1.3"
            class="grey lighten-2 "
            mb-2>
            <span 
                v-if="new_product==true" 
                class="text-xs-center red white--text px-2 new-product"            >
                НОВИНКА
            </span>
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
        <div class="title mt-3 mx-2   text-lowercase" >
            <center>
                 <nuxt-link class="cart_name text-capitalize" :to="to_product"> {{product.name}}</nuxt-link>  
            </center>    
        </div>
        <div class="to-bottom-fix">
            <v-card-text>
                <center class="display-1 font-weight-medium">{{price}} тг</center>   
                <center v-if="product.available==1" class="caption " >Есть в наличии</center>
                <center v-else class="caption">Нет в наличии</center>
            </v-card-text>
            <v-card-actions >
                <v-spacer></v-spacer>        
                <v-btn                      
                    outline  
                    color="warning" 
                    v-if="disabled==false"                                 
                    @click="toCart(product.id)">
                     <v-icon  left>add_shopping_cart</v-icon>
                    В корзину
                </v-btn>                   
                <v-badge
                    color="primary"
                    right
                    v-else
                    overlap
                    >
                    <v-icon
                        slot="badge"
                        dark
                        small
                    >done</v-icon>
                    <v-btn                      
                        outline  
                        color="primary" 
                        to="/cart"
                        >
                        В корзину
                    </v-btn>
                    </v-badge>            
                <v-spacer></v-spacer>        
            </v-card-actions>
        </div>    
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
    props: ["product", 'new_product'],
    data(){
        return{           
            to_product: "",
            image: '',
            snackbar: false,
            products:[],
            new_product_cart: null,
            disabled: false,        
        }
    },
    computed:{
        price: function(){
            var str = this.product.price.toString();
            return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }
    },
    created() {
        this.image=JSON.parse(this.product.images)
        this.image=this.image[0].image
        this.to_product="/product/"+this.product.id;
        var arr = [];
        var i=0;
        arr = JSON.parse(localStorage.getItem('cart_product_list'));
        if(arr!=null){
            for(var element in arr){
                if(parseInt(arr[element])==parseInt(this.product.id)) {
                    i=1;
                }
            }
        } 
        if(i==0){
            this.disabled=false;
        }else {
            this.disabled=true;
        } 
    },
    methods:{
        toCart(id){
            this.$store.dispatch('to_cart', id);  
            this.disabled=true;       
        },
    }
}
</script>
<style scoped>
.product-card:hover{
    transform: translateY(-10px);
    box-shadow: 0px 10px 20px -2px gray ;    
}
.product-card{
    padding-bottom: 150px;
}
.cart_name{
    text-decoration: none;
    color: #333333;
}
.cart_name:hover{
    cursor:pointer;
    text-decoration: underline;
    transition: 1.2s ease !important;
}
.to-bottom-fix{
    position: absolute;
    bottom: 0;
    margin-left: auto; 
    margin-right: auto; 
    width: 100%;
}
</style>
