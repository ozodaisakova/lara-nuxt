<template>
<v-layout>
    <v-layout v-if="preloader==true"  align-center   style="height:80vh;">
        <v-flex d-flex>
            <div class="text-xs-center">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="primary"
                    indeterminate></v-progress-circular>
            </div>
        </v-flex>
    </v-layout>
    <v-layout  v-else>
            <any-error v-if="error==true" v-bind:error_code="error_code" v-bind:error_name="error_name"></any-error>
        <v-layout row wrap v-else>
             <v-flex d-flex xs12 sm12 md8>
                    <v-breadcrumbs
                        class="hidden-sm-and-down"
                        v-bind:items="for_breadcrumd">                        
                    </v-breadcrumbs>                    
            </v-flex>
            <v-flex xs12 sm6 md7 d-flex  align-center class=" v-card theme--light mt-3"   color="primary">
            <v-flex>
                <v-carousel  
                    class="product-carousel" 
                    light
                    >
                    <v-carousel-item  
                        v-for="(item, i) in images"
                        :key="i"
                        :src="item.image">
                    </v-carousel-item>
                    
                </v-carousel>
            </v-flex>                
        </v-flex>
        <v-flex xs12 sm6 md5 d-flex class="mt-3">
            <v-flex class="pa-3 v-card theme--light mx-2">
                <h1 class="headline font-weight-bold  mb-2">{{product.name}}</h1>
                <h1 class="headline font-weight-bold grey--text darken-2 mb-3">{{product.price}} тг</h1>
                <v-divider class="mb-4 "></v-divider>  
                <v-layout row wrap>
                    <v-flex class="text-xs-justify">
                        {{short_description}}
                        <v-divider class="mt-4"></v-divider> 
                    </v-flex>
                    <v-divider class="mt-4"></v-divider>  
                    <v-flex xs12 sm6 md6 class="px-2 mt-4">
                        <v-btn
                            color="warning"
                            block
                            outline
                            @click="toCart()">
                            В корзину
                        <v-icon  right>add_shopping_cart</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex xs12 sm6 md6 class=" px-2 mt-4">
                        <v-btn
                            block
                            color="error"
                            :to="`/buy/`+product.id">
                            Купить сейчас
                        </v-btn>
                    </v-flex>
                </v-layout>
                <div class="mt-3"></div>
            </v-flex>
        </v-flex> 
        <v-flex xs12 sm12 md12 class="mt-4">
         <v-card>             
            <v-tabs
                slider-color="primary"
                style="background-color: #7F7F7F !important;"
                color="tabscolor"
                fixed-tabs
                dark>
            <v-tab ripple>Описание</v-tab>
            <v-tab ripple>Характеристики</v-tab>            
            <v-tab ripple>Отзывы</v-tab>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                  <p class="text-xs-justify" v-if="product.description!=null" v-text="product.description"></p>
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                    <v-card-text>
                        <p v-if="colors!=null"> 
                            <b>Цвета:</b> 
                            <span 
                                :key="i"
                                v-for="(color, i) in colors">
                                {{color.color}},
                            </span> 
                        </p>
                        <p v-if="product.height!=null"> <b>Высота:</b> <span>{{product.height}} мм</span> </p>
                        <p v-if="product.width!=null"> <b>Ширина:</b> <span>{{product.width}} мм</span> </p>
                        <p v-if="product.length!=null"> <b>Длина:</b> <span>{{product.length}} мм</span> </p>
                        <p v-if="product.material!=null"> <b>Материалы:</b> <span>{{product.material}} </span> </p>
                        <p v-if="product.complect!=null"> <b>Комплектация:</b> <span>{{product.complect}} </span> </p>
                        <p v-if="product.karkas!=null"> <b>Каркас:</b> <span>{{product.karkas}} </span> </p>
                        <p v-if="product.compound!=null"> <b>Соединение:</b> <span>{{product.compound}} </span> </p>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>   
                    {{product}}
                </v-card-text>
                </v-card>
            </v-tab-item>
            </v-tabs>
        </v-card>
        </v-flex>
    </v-layout> 
    </v-layout>  
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
</v-layout>    
</template>
<script>
import StoreBreadCrumbs from '~/components/StoreBreadCrumbs.vue'
import AnyError from '~/components/errors/AnyError.vue'
export default{
    data(){
        return{
            snackbar: false,
            item: 1,
            product:[],
            images:[],
            colors:[{"color":"Нет вариантов"}],
            recommendation:[], 
            preloader: false,
            error: false,
            error_code: "---",
            error_name: 'НЕИВЕСТНАЯ ОШИБКА',
            for_breadcrumd: [{href: "/", text:"Главная"}],
            short_description: ''
        }    
    },
    components:{
        StoreBreadCrumbs,
        AnyError
    },
    mounted() {
        this.preloader=true;
        var id=this.$route.params.id;
        Promise.all([this.getProduct(id)])
                    .then(values=>{
                        this.product=values[0][0];
                        this.images=JSON.parse(values[0][0].images);
                        this.for_breadcrumd.push({"href":"/catalog/"+values[0][0].catalog.id, "text": values[0][0].catalog.name});
                        this.for_breadcrumd.push({"href":"/product/"+values[0][0].id, "text": values[0][0].name, disabled: true});
                        if(values[0][0].colors!=null) this.colors=JSON.parse(values[0][0].colors);
                        if(values[0][0].description&&values[0][0].description.length>250)
                            this.short_description=values[0][0].description.substr(0, 250)+'...';
                        else if(values[0][0].description)
                                this.short_description=values[0][0].description+"Вся мебель фабрики «ИП Кудайбергенов» имеет сертификат соответствия"+
                                " установленным ГОСТам республики Казахстан и является синонимом по настоящему качественной мебели.";
                            else
                                this.short_description="Вся мебель фабрики «ИП Кудайбергенов» "+
                                "имеет сертификат соответствия установленным ГОСТам республики Казахстан и" +
                                "является синонимом по настоящему качественной мебели. А также  фабрика существует на рынке мебели более 10 лет "+
                                "и является одним из лидеров среди производителей стульев, столов шпоновых, столов разного вида и корпусной мебели в Казахстане. ";
                        this.preloader=false;
                    })
                    .catch(error=>{
                        console.log(error);
                        if(error.response.status==404){
                            this.error_code = "404";
                            this.error_name = "СТРАНИЦА НЕ НАЙДЕНА!";
                        }                      
                        this.error=true;
                        this.preloader=false;
                    });
    },
    methods:{
        plusItem(item){
            if(item<20)
            this.item=item+1
        },
        minusItem(item){
            if(item>1){
                this.item=item-1;
            }
        },
        async getProduct(id){
            const response=await this.$axios.$get(this.$store.getters.base_url+"product/"+id);
            return response;
        },
        async getCatalog(id){
            const response = await this.$axios.$get(this.$store.getters.base_url+"catalog/"+id);
            return response;
        },
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
@media screen and (max-width: 1600px){
    .product-carousel{
        height: 400px;
    }    
}
@media screen and (max-width:1024px){
    .product-carousel{
        height: 400px;
    }
}
@media screen and (max-width:768px){
    .product-carousel{
        height: 420px;
    }
}
@media screen and (max-width:520px){
    .product-carousel{
        height: 350px;
    }
}
.product-carousel{
    box-shadow: none;
    border: none;
}
</style>
