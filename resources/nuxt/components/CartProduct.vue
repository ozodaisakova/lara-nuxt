<template>
  <v-card >
    <v-layout row wrap align-center justify-center class="my-2">
    <v-flex xs6  md2 >
        <v-img
        border
        :src="images[0].image"  
        height="100"                 
        contain
        ></v-img>
    </v-flex>
    <v-flex xs6 md2 >
        <v-card-title primary-title >
        <div>
            <nuxt-link class="subheading text-capitalize" :to="`product/`+product.id">{{product.name}} <br> {{price}} тг</nuxt-link> 
            <br>  
            <span ></span>                   
        </div>
        </v-card-title>
    </v-flex>
    <v-flex 
        xs6 
        md3 
        row 
        wrap 
        justify-center 
        align-center
        class="text-xs-center py-3">    
        <v-btn 
            flat
            icon
            small
            @click="minusItem(item)"
            color="secondary">
            <v-icon>remove</v-icon>
        </v-btn>                        
        <v-btn
            flat
            icon
            small
            color="secondary"
            outline>
            <span> {{item}} </span> 
        </v-btn>    
        <v-btn
            flat
            icon
            small
            color="secondary"
            @click="plusItem(item)">
            <v-icon>add</v-icon>
        </v-btn>                       
    </v-flex>
    <v-flex xs5 md2 class="text-xs-center">
         <v-tooltip bottom>
            <v-btn 
                slot="activator"
                flat 
                icon 
                class="delete"
                color="secondary"
                @click="delItem">
                <v-icon>delete</v-icon>
            </v-btn>
            <span>Удалить</span>
        </v-tooltip>
    </v-flex>
    <v-flex
        xs12 
        md3
        class="pl-4">
        <vue-select 
            label="Выберите цвет"
            v-model="color" 
            :options="options"></vue-select>
    </v-flex>
    </v-layout>              
</v-card>
</template>
<script>
export default {
    props: ['product'],
    data(){
        return{
            count: 0,
            images: [],
            colors: [],
            color: '',
            id: 0,
            color: 'Не выбрано',
            colors: [],
            options:[],
            item: 1,
        }
    },
    created(){
        this.$store.dispatch('increment_price', this.product.price);
        this.images=JSON.parse(this.product.images);
        var colors =JSON.parse(this.product.colors);
        colors.forEach(element => {
            this.options.push(element.color);            
        });
    },
    computed:{
        price: function(){
            var str = this.product.price.toString();
            return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        }
    },    
    methods:{
        vals() {
            this.$emit('vals', {
                color: this.color,
                count: this.item
            })
        },
        delItem(){            
            this.$emit('delItem',{
                id: this.product.id,
                price: this.product.price,
                count: this.item
            });
           
        },
        plusItem(item){
            if(item<20){
                this.item=item+1;
                var price = this.product.price;
                this.$store.dispatch('increment_price', price);
            }
        },
        minusItem(item){
            if(item>1){
                this.item=item-1;
                var price = this.product.price;
                this.$store.dispatch('decrement_price', price);
            }
        },
    }
}
</script>
<style scoped>

</style>


