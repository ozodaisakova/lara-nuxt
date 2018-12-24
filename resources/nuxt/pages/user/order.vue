<template>
<div>
<v-breadcrumbs :items="for_breadcrumd" divider="/"></v-breadcrumbs>
<v-card class="pa-4">
        <v-alert
            v-if="items==''"
              type="error"
              :value="`true`">
              Вы не совершали никаких покупок!
            </v-alert>
          <v-list-tile
            v-else
            v-for="item in items"
            :key="item.id"
            avatar
            class="my-3">
            <v-list-tile-avatar>
              <v-icon class="blue white--text">assignment</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>Товары на сумму <b> {{ item.total_price }} </b> тг</v-list-tile-title>
              <v-list-tile-sub-title>{{ item.created_at}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>    
</v-card>
</div>
</template>
<script>
export default {
    
     head:{
        title:'Заказы пользователя'
    },
    data(){
        return{
            for_breadcrumd: [
            {href: "/", text:"Главная"},
            {href: "/user/profiel", text: "Профиль пользователя", disabled: true}
            ],
            user:[],
           items:[]
        }
    },
    mounted(){
        if(localStorage.user){
            this.user=JSON.parse(localStorage.getItem('user'))
        }else{
            this.$router.push('/');
        }
        Promise.resolve(this.getOrders(this.user.id))
            .then(res=>{
                this.items=res;
                console.log("RESPONSE", res);
            })
            .catch(e=>{
                console.log("ERROR", e);
            })
    },
    methods:{
        async getOrders(id){
           const order =  await this.$axios.$get(this.$store.getters.base_url+'productorder?id='+id);
            return order;
        },
    }
}
</script>
