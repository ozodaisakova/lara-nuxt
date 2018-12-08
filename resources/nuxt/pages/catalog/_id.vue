<template>
<div>
    <div v-if="productloader==true">
        <product-card-loader></product-card-loader>
    </div>
    <div v-else>
        <div v-if="error==true">
            <any-error v-bind:error_code="error_code" v-bind:error_name="error_name"></any-error>
        </div>
        <v-container fluid grid-list-md class="container_products" v-else>
            <div  v-if="products.data!=''">            
            <v-layout row wrap >
                <v-flex d-flex xs12 sm12 md8>
                    <v-breadcrumbs
                        class="hidden-sm-and-down"
                        v-bind:items="for_breadcrumd">                        
                    </v-breadcrumbs>                    
                </v-flex>
                <v-flex d-flex xs12 sm4 md4>
                    <v-select
                        v-model="select"
                        :items="order_items"
                        item-text="report"
                        item-value="order"
                        return-object
                        persistent-hint
                        v-on:change="doSorting(`${select.order.sort}`, `${select.order.column}`)"
                        label="Сортировка">
                    </v-select>
                </v-flex>                
            </v-layout>
                <v-layout 
                    row
                    wrap>
                    <ProductCard 
                    v-bind:product="i"
                    v-for="i in products.data"
                    :key="i.id">
                    </ProductCard>     
                </v-layout>
                <div class="text-xs-center mt-5">
                    <v-pagination
                    v-model="current_page"
                    :value="current_page"
                    :length="total_page"
                    @input="goPage"
                    ></v-pagination>
                </div>
            </div>        
            <div v-else>
                <span class="title">Извините, но в данном разделе временно отсутсвует товары</span>
            </div>
        </v-container>
    </div>    
</div>
</template>
<script>
import ProductCard from '~/components/ProductCard.vue'
import ProductCardLoader from '~/components/loaders/ProductCardLoader.vue'
import StoreBreadCrumbs from '~/components/StoreBreadCrumbs.vue'
import AnyError from '~/components/errors/AnyError.vue'
export default {
    data(){
        return{
            slug: '',
            error: false,
            productloader: false,
            catalog_id:0,
            catalog:[],
            products:[],
            for_breadcrumd:[
                { href: "/", text: "Главная" }
            ],
            scrollToTop: true,
            page: 1,
            select: {"report":"Наименование А -> Я", "order":{"column":"name", "sort":"asc"}},
            order_items:[
                {"report":"По новизне", "order":{"column":"updated_at", "sort":"desc"}},
                {"report":"Наименование А -> Я", "order":{"column":"name", "sort":"asc"}}, 
                {"report":"Наименование Я -> А", "order":{"column":"name", "sort":"desc"}},
                {"report":"Сначала дешевые", "order":{"column":"price", "sort":"asc"}},
                {"report":"Сначала дорогие", "order":{"column":"price", "sort":"desc"}},
                ],
            total_page: 1,
            current_page: 1,
            error_code: '',
            error_name: ''
        }
    },
    components:{
        ProductCard,
        ProductCardLoader,
        StoreBreadCrumbs,
        AnyError
    },
    mounted() {
        this.productloader=true;
        this.catalog_id=this.$route.params.id;
        Promise.all([this.getcatalog(this.catalog_id), this.getProducts(this.catalog_id)])
                    .then(values=>{
                        this.catalog=values[0];
                        this.products=values[1];
                        this.total_page=values[1].last_page;
                        this.current_page=values[1].current_page;
                        this.productloader=false;
                        this.for_breadcrumd.push({"href":"/catalog/"+values[0].id, "text": values[0].name, disabled: true});
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
                        }) ;    
    },
    methods:{
        async getcatalog(id){
            const response = await this.$axios.$get(this.$store.getters.base_url+"catalog/"+id);
            return response;
        },
        async getProducts(id, page, column, order){
            if(!page) page=1; 
            if(!column) column="id";
            if(!order) order="asc";
            const response = await this.$axios.$get(this.$store.getters.base_url+"products-of-catalog?catalog_id="+
                                                    id+"&page="+page+"&column="+column+"&order="+order);
            return response
        },
        goPage(page){
            window.scroll(0,0,'smooth');
            this.productloader=true;
            Promise.all([this.getProducts(this.catalog_id, page, this.select.order.column, this.select.order.sort)])
                        .then(values=>{
                            this.products=values[0];
                            this.current_page=values[0].current_page;
                            this.productloader=false;   
                        })
                        .catch(error=>{
                            this.productloader=false;
                            this.error=true;
                        }) ;
        },
        doSorting(sort, column){
            window.scroll(0,0,'smooth')
            this.productloader=true
            Promise.all([this.getProducts(this.catalog_id, this.current_page, column, sort)])
                        .then(values=>{
                            this.products=values[0]
                            this.current_page=values[0].current_page
                            this.productloader=false                            
                        })
                        .catch(error=>{
                            this.productloader=false;
                            this.error=true;
                        }) 
            
        }
    }
}
</script>
<style scoped>
.image-test{
    width: 200px;
    height: 200px;
}
.pagination-div{
    widows: 100%;
    text-align: center;
}
.container_products {
  scroll-behavior: smooth;
}


</style>