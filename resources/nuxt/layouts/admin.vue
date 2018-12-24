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
      <v-list>
      <v-toolbar flat class="hidden-sm-and-up ">
      <v-list >
        <v-list-tile>
          <v-list-tile-title class="title">
            TAK MEBEL
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>
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
      <v-subheader>Управление</v-subheader>
        <v-divider></v-divider>
        <v-list-tile 
        router
        :to="item.to"
        exact  
        v-for="(item, i) in menu_items"    
        :key="i"
        ripple>
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{item.name}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list>
          <v-list-group
            v-for="item in items"
            v-model="item.active"
            :key="item.title"
            :prepend-icon="item.action"
            no-action>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              ripple
              v-for="subItem in item.items"
              :key="subItem.title"
              :to="subItem.to">
              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon>{{ subItem.action }}</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped" color="primary" dark class="toolbar-back">
        <v-btn @click="drawer = !drawer" icon>
          <v-icon>menu</v-icon>
          </v-btn>      
      <v-toolbar-title v-text="title" class="hidden-sm-and-down"></v-toolbar-title> 
      <v-spacer></v-spacer>
      <v-tooltip bottom>
      <v-btn
        slot="activator"
        icon>
      <v-icon>keyboard_backspace</v-icon>
      </v-btn>
      <span>Покинуть панель администратора</span>
    </v-tooltip>
      <v-tooltip bottom>
      <v-btn
        slot="activator"
        icon>
      <v-icon>exit_to_app</v-icon>
      </v-btn>
      <span>Выход</span>
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
import Preloader from '~/components/loaders/Preloader.vue'
  export default {
    middleware: 'admin',
    data () {
      return {
        base_category_link: '',
        clipped: true,
        drawer: true,
        fixed: false,
         items: [],
        menu_items: [
            { name: 'Статистика', icon: 'insert_chart', to: '/admin' },
            { name: 'Заказы', icon: 'credit_card', to: '/admin/orders' },
            { name: 'Пользователи', icon: 'people', to: '/admin/clients' },
            { name: 'Каталог', icon: 'style', to: '/admin/catalog/category' },
            { name: 'Продукты', icon: 'view_list', to: '/admin/catalog/product' },
            { name: 'Добавить страницу', icon: 'add_to_photos', to: '/admin/information/add' },
            { name: 'Редактировать страницу', icon: 'edit', to: '/admin/information/edit' },
            { name: 'Удалить страницу', icon: 'delete', to: '/admin/information/delete' },
            { name: 'Вернуться на сайт', icon: 'reply', to: '/' },            
        ],
        information_items:[],
        preloader:true,
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'АДМИНИСТРАТОР',
        error_catalog:'',
        error_information: '',
        cart_count: 0
      }
    },
    components:{
      Preloader
    },
    mounted(){    
      // this.preloader=true
      Promise.all([this.getCatalog()])
                  .then(values=>{
                    this.preloader = false;
                  })
                  .catch(error=>{
                    console.log("My error:"+error);
                    if(typeof error.response==='undefined'){
                      this.error_catalog = error;
                    }                    
                    this.preloader = false;
                  });
         
    },
    methods:{
      async getCatalog(){
        const response = await this.$axios.$get(this.$store.state.base_url + "catalog");
        return response;
      },
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
}</style>

