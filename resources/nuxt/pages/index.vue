<template>
<div>
 <v-parallax
    dark
    height="300"
    class="ma-4"
    src="/img/homepage.jpg"  >
    <v-layout
      align-center
      column
      justify-center
    >
      <h1 class="display-2 font-weight-thin mb-3 text-xs-center">Мебельная фабрика ИП "Кудайбергенов"</h1>
      <h4 class="title font-weight-thin text-xs-center">Мебели по лучшей цене!</h4>
    </v-layout>
  </v-parallax>
  <div>
    <div v-if="productloader==true">
        <product-card-loader></product-card-loader>
    </div>   
    <div v-else>
      <div v-if="error==true">
            <any-error v-bind:error_code="error_code" v-bind:error_name="error_name"></any-error>
        </div>
        <v-container 
          fluid 
          grid-list-md 
          v-else>
          <div  v-if="products!=''">            
                <v-layout row wrap >
                    <v-flex d-flex xs12 sm12 md8>
                        <h1 class="title mb-4">Новинки</h1>                         
                    </v-flex>            
                </v-layout>               
                <v-layout 
                    row
                    wrap>
                    <ProductCard 
                    v-bind:product="i"
                    v-bind:new_product="true"
                    v-for="i in products"
                    :key="i.id">
                    </ProductCard>     
                </v-layout>
            </div>        
            <div v-else>
                <span class="title">Извините, но в данном разделе временно отсутсвует товары</span>
            </div>
        </v-container>
         <v-container  v-if="recomProducts!=''">            
                <v-layout row wrap >
                    <v-flex d-flex xs12 sm12 md8 >
                        <h1 class="title mb-4">Рекомендованные товары</h1>     
                    </v-flex>            
                </v-layout>
                <v-layout 
                    row
                    wrap>
                    <ProductCard 
                    v-bind:product="i"
                    v-bind:new_product="false"
                    v-for="i in recomProducts"
                    :key="i.id">
                    </ProductCard>     
                </v-layout>
            </v-container>        
            <div v-else>
                <span class="title">Извините, но в данном разделе временно отсутсвует товары</span>
            </div>
    </div>    
  </div>
</div>
</template>
<script>
import ProductCard from '~/components/ProductCard.vue'
import ProductCardLoader from '~/components/loaders/ProductCardLoader.vue'
import AnyError from '~/components/errors/AnyError.vue'
export default {
   head: {
    title: 'Домашнаяя страница - Tak-Mebel',
    meta: [
      { name: "description", content: "Купить столы, стулья, диваны, кроваты, шкафы и другие мебели от производителя ИП Кудайбергенов."},
      { name: "keywords", content: "Мебельная фабрика ИП Кудайбергенов, Мебель, Купить меебель, Мебельный магазин, Мебель для дома, Шкаф, Кровать, Туркестан, Мебель на заказ"  }
    ]
  },
  data(){
    return{
      posts: [],
      status:0,
      products: [],   
      productloader: true,  
      error: false,
      error_code: '',
      error_name: '',
      recomProducts:[]
    }
  }, 
  components:{
    ProductCardLoader,
    ProductCard,
    AnyError
  },
  mounted() {
    Promise.resolve(this.getNewProduct())
      .then(response=>{
        this.products=response.new_products;
        this.productloader=false;
      })
      .catch(e=>{
        if(e.message=='Network Error'){
          this.error_code='Error';
          this.error_name="Нет соединения с Интернетом!";
        }else if(e.response.status==400){
          this.error_code='400';
          this.error_name="ОШИБКА ЗАПРОСА!";
        }else if(e.response.status==404){
          this.error_code="404";
          this.error_name="СТРАНИЦА НЕ НАЙДЕНО!";
        }else{
          this.error_code="---";
          this.error_name="НЕИВЕСТНАЯ ОШИБКА!";
        }
          this.productloader=false;
          this.error=true;
      });     
    
  },
  created(){
     Promise.resolve(this.getRecomProducts())
      .then(response=>{
        this.recomProducts = response.recom_products;
      })
      .catch(e=>{
          console.log("ERROR", e);
          this.error=true;
      });
  },
  methods:{
    async getNewProduct(){
      const products = await this.$axios.$get(this.$store.getters.base_url+'new-products');
      return products;
    },
    async getRecomProducts(){
      const products = await this.$axios.$get(this.$store.getters.base_url+'recommend-products');
      return products;
    }

  }
}
</script>
