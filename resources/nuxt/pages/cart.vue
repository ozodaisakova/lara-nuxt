<template>
    <v-card class="py-4 px-3">
        <h1 class="display-1 font-weight-bold text-xs-center ">Корзина</h1>
      <v-layout 
            row 
            wrap
            v-if="products.length>0">
         <v-flex 
            xs12
            md6
            sm4
            class="mt-4"
            v-for="(item, i) in products"
            :key="i">
            <v-layout>
                <v-flex xs4>
                    <v-img
                        :src="goImage(item[0].images)"
                        lazy-src="/image-placeholder.svg"
                        aspect-ratio="1">
                    </v-img>
                </v-flex>
                <v-flex class="ml-3">
                    <h1 class="title font-weight-bold mb-3 ml-2"> {{item[0].name}}</h1>
                    <h1 class="title font-weight-slim ml-2"> {{item[0].price}} тг</h1>
                    <div class="mb-3"></div>
                    <v-flex xs12 md4 sm6>
                        <v-btn
                            outline
                            small
                            block
                            @click="deleteFromCart(item[0].id)"
                            color="error">
                            удалить 
                            <v-icon small>mdi-delete</v-icon>
                        </v-btn>
                        <v-btn
                            block
                            small
                            :to="`/buy/`+item[0].id"
                            color="error">
                            купить
                        </v-btn>            
                    </v-flex>
                </v-flex>
            </v-layout>
        </v-flex>  
      </v-layout>
      <v-layout v-else>
          <v-alert
            type="error"
            :value="true">
            У вас в корзине нет товаров
          </v-alert>
      </v-layout>
    </v-card>
</template>
<script>
export default {
    head: {
    title: 'Корзина - Tak-Mebel',
    meta: [
        { name: "description", content: "Купить столы, стулья, диваны, кроваты, шкафы и другие мебели от производителя ИП Кудайбергенов."},
        { name: "keywords", content: "Мебельная фабрика ИП Кудайбергенов, Мебель, Купить меебель, Мебельный магазин, Мебель для дома, Шкаф, Кровать, Туркестан, Мебель на заказ"  }
        ]
    },
    data(){
        return{
            products: [],
            images: []
        }
    },
    mounted() {
        this.getProdutcs()
       
    },
    methods:{
        getProdutcs(){
            var arr = JSON.parse(localStorage.getItem('cart_product_list'));
            var i=0,  a ="";
            var l=[];
            for( i in arr){
                a=JSON.parse(arr[i]).product_id;
                Promise.all([this.getProduct(a)])
                                .then(values=>{
                                    l.push(values[0]);

                                })
                    }
            this.products = l;

        },
        async getProduct(id){
            let response= await this.$axios.$get(this.$store.getters.base_url+"product/"+id);
            return response;
        },
        goImage(images){
            var json = JSON.parse(images);
            return json[0].image;
        },
        deleteFromCart(id){
            if(process.browser){
                var str = localStorage.getItem('cart_product_list');
                var json = [];
                json = JSON.parse(str);
                for (var i=0; i<json.length; i++){
                    var j = JSON.parse(json[i]);                
                    if(j.product_id== id.toString()) {
                        json.splice(i,1);
                    }
                }
                localStorage.removeItem('cart_product_list');
                str = JSON.stringify(json);
                localStorage.setItem('cart_product_list', str);
                localStorage.setItem('cart_product_count', json.length.toString());
                this.$store.dispatch('decrement_cart', json.length);
                this.getProdutcs();
            }
        }

    }
}
</script>

