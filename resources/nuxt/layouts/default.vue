<template>
<div>
  <div v-if="preloader == true" class="preloader">
    <center>
      <div>
        <Preloader></Preloader>
      </div>
    </center>
  </div>
 <v-app   v-else>
    <v-navigation-drawer     
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app>
      <v-img 
          :aspect-ratio="16/9" 
          src="img/navigation-drawer.jpg"
          v-if="drawerPicture==true">
        <v-layout pa-2 column fill-height class="lightbox white--text">
          <v-spacer></v-spacer>
          <v-flex shrink>
            <div class="title">Tak Mebel</div>
            <div class="body-1">Мебельная фабрика</div>
          </v-flex>
        </v-layout>
      </v-img>
      <v-list>      
      <v-subheader>Навигация сайта</v-subheader>
        <v-divider></v-divider>
        <v-list-tile 
        router
        to="/"
        exact        
        ripple>
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Главная</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <!-- ///////////////////////////////////////// -->
        <v-subheader>Каталог</v-subheader>
        <v-divider></v-divider>        
          <menu-item
            v-for="(catalog, i) in menu_items.catalogs"
            v-if="catalog.hidden==0"
            :key="`catalog-`+i"
            v-bind:name="catalog.name" 
            v-bind:icon="catalog.icon" 
            v-bind:tuda="`/catalog/`+catalog.id">
          </menu-item>
          <span v-if="error_catalog!=''" class="red--text lighten-3">
            Қатенің атауы: {{error_catalog.message}}<br>
            <h3>Бұл қате осы сайтқа арналған backend-пен байланыс жоғалғандығын білдіреді</h3>
            Бұл қатені туралау үшін 
            <b>development_backend </b> папкасына барып <b>php artisan serv</b> командасын орындау қажет.
            <br>
            Егер бұл команда көмектеспесе  Google Chrome браузерінде 
            <a href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related?utm_source=chrome-ntp-icon">
            ссылкасы </a>бойынша расширениянені орнату қажет
            </span>
        <!-- ///////////////////////////////// -->
        <v-subheader>Информация</v-subheader>
        <v-divider></v-divider>
        <span v-if="error_information!=''" class="red--text lighten-3"> Қатенің атауы: {{error_information.message}}</span>
        <div 
          v-for="(item, i) in information_items.informations" 
          :key="`information-`+i">
          <menu-item v-if="item.hidden==0" v-bind:name="item.name" v-bind:icon="item.icon" v-bind:tuda="`/information/`+item.id"></menu-item>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar 
      fixed 
      app 
      :clipped-left="clipped" 
      color="primary" 
      dark 
      class="toolbar-back">
        <v-btn @click="drawer = !drawer" icon>
          <v-icon>menu</v-icon>
          </v-btn>      
      <v-btn
        class="hidden-sm-and-down"
        icon
        @click.stop="miniVariant = !miniVariant">
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'">
          </v-icon>        
      </v-btn>
      <v-toolbar-title v-text="title" class="hidden-sm-and-down"></v-toolbar-title> 
      <v-layout row wrap align-center>
        <v-flex class="text-xs-center hidden-sm-and-down py-4 " >
          <v-text-field 
            solo
            label="Поиск"
            append-icon="search"
            light
            style="width:50%; display:inline-block">
          </v-text-field>
        </v-flex>
      </v-layout>           
      <v-tooltip bottom>
      <v-btn
        slot="activator"
        icon
        :to="`/cart`">
        <v-badge color="error" v-if="cart!=0">
          <span slot="badge" >{{cart}}</span>
          <v-icon>shopping_cart</v-icon>
        </v-badge>
        <v-icon v-else>shopping_cart</v-icon>
      </v-btn>
      <span>Корзина</span>
    </v-tooltip>
      <v-tooltip bottom>
      <v-btn
        slot="activator"
        icon>
      <v-icon>account_box</v-icon>
      </v-btn>
      <span>Личный кабинет</span>
    </v-tooltip>      
    </v-toolbar>
    <v-content>
      <v-container class="main-back">
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</div> 
</template>
<script>
import MenuItem from '~/components/menu/MenuItem.vue'
import Preloader from '~/components/loaders/Preloader.vue'
import {mapState, mapGetters} from "vuex"


  export default {
    data() {
      return {
        base_category_link: '',
        clipped: true,
        drawer: true,
        fixed: false,
        menu_items: [],
        information_items:[],
        preloader:true,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'TAK - MEBEL',
        error_catalog:'',
        error_information: '',
        cart_count: 0,
        windowSize:{
          x: 0,
          y: 0
        },
        drawerPicture: false
      }
    },
    components:{
      MenuItem,
      Preloader
    },
    mounted(){
      if(process.browser){
        if(!localStorage.cart_product_count) localStorage.setItem('cart_product_count', '0');
        this.$store.dispatch('increment_cart', parseInt(localStorage.getItem('cart_product_count')));
        this.onResize();
        if(this.windowSize.x < 1260) {
          this.drawer=false;
          this.drawerPicture=true;
        }
      }     
      // this.preloader=true
      Promise.all([this.getCatalog(),  this.getInformation()])
                  .then(values=>{
                    this.menu_items = values[0];
                    this.information_items = values[1];
                    this.preloader = false;
                  })
                  .catch(error=>{
                    console.log("My error:"+error);
                    if(typeof error.response==='undefined'){
                      this.error_catalog = error;
                      this.error_information = error;                      
                    }                    
                    this.preloader = false;
                  });
    },
    computed:{
      cart(){
        if(process.browser){          
          return this.$store.getters.cart_count;
        }
      }
    },
    methods:{
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      },
      async getCatalog(){
        const response = await this.$axios.$get(this.$store.getters.base_url+"catalog");
        return response;
      },
      async getInformation(){
        const response = await this.$axios.$get(this.$store.getters.base_url+"information");
        return response;
      }
    }  
   
  }
</script>
<style scoped>
::-webkit-scrollbar{
    background-color: rgb(219, 217, 217);    
    width:6px;
}

::-webkit-scrollbar-thumb{
    border-width:1px 1px 1px 2px;
    border-radius: 4px;
    border-color: rgb(119, 118, 118);
    background-color: rgb(170, 169, 169);
}
::-webkit-scrollbar-thumb:hover{
    border-width: 1px 1px 1px 2px;
    border-color: #555;
    background-color: #777;
}
::-webkit-scrollbar-track{
    border-width:0;
}
::-webkit-scrollbar-track:hover{
    border-left: solid 1px #aaa;
    background-color: rgb(173, 172, 172);
}
@-moz-document url-prefix(http://),url-prefix(https://) {
    scrollbar {
       -moz-appearance: none !important;
       background: rgb(0,255,0) !important;
    }
    thumb,scrollbarbutton {
       -moz-appearance: none !important;
       background-color: rgb(0,0,255) !important;
    }

    thumb:hover,scrollbarbutton:hover {
       -moz-appearance: none !important;
       background-color: rgb(255,0,0) !important;
    }
    scrollbarbutton {
       display: none !important;
    }
    scrollbar[orient="vertical"] {
      min-width: 15px !important;
    }
}
.preloader{
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 99999;
  text-align: center;
  display: table-cell;
}
.preloader>center{
  vertical-align: middle;
  height: 100vh;
}
.preloader>center>div{
  width: 200px;
  top: 50%;
  position: relative;
  background-color: black;
  color: aliceblue;
}


</style>

