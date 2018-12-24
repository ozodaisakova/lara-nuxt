<template>
    <v-card class="pa-2">
       <v-breadcrumbs
                        class="hidden-sm-and-down"
                        v-bind:items="for_breadcrumd">                        
                    </v-breadcrumbs>   
        <v-data-table
            :headers="headers"
            :items="orders"
            class="elevation-1 "
            expand
            no-results-text="К сожалению нет данных :("
            no-data-text="К сожалению нет данных :("
            rows-per-page-text="Количество записей">
            <v-progress-linear 
                slot="progress" 
                color="blue" 
                indeterminate>
            </v-progress-linear>
            <template  
                slot="items" 
                slot-scope="props">  
                <td >{{ props.item.id }}</td>               
                <td>{{ props.item.user_name }}</td>
                <td >{{ props.item.user_phone }} </td>  
                <td >{{ props.item.created_at }} </td>  
                <td >{{ props.item.total_price }} тг </td>  
                <td v-if="props.item.status==1"><span class="blue--text">Новый</span></td>
                <td v-else-if="props.item.status==2"><span class="orange--text">Обрабатывается</span></td>
                <td v-else-if="props.item.status==3"><span class="green--text">Доставлен</span></td>
                <!-- <td>
                     <v-tooltip bottom>
                        <v-btn
                            slot="activator"
                            icon
                            class="vision_hover"
                            :to="`/admin/order_show/`+props.item.id">
                            <v-icon>visibility</v-icon> 
                        </v-btn>
                        <span>Посмотреть</span>
                    </v-tooltip>
                    <span>&#160;&#160;</span>
                    <v-tooltip bottom>
                        <v-btn
                            slot="activator"
                            icon
                            class="vision_hover"
                            :to="`/admin/order_edit/`+props.item.id">
                            <v-icon>edit</v-icon> 
                        </v-btn>
                        <span>Редактировать</span>
                    </v-tooltip>
                    <span>&#160;&#160;</span>
                    <v-tooltip bottom>
                        <v-btn
                            slot="activator"
                            icon
                            class="vision_hover"
                            :to="`/admin/order_delete/`+props.item.id">
                            <v-icon>delete</v-icon> 
                        </v-btn>
                        <span>Удалить</span>
                    </v-tooltip>
                </td>              -->
            </template>
         </v-data-table>
    </v-card>
</template>
<script>
export default {
    layout: 'admin',
    data(){
        return{
              for_breadcrumd: [
                {href: "/admin/", text:"Главная"},
                {href: "/admin/orders", text: "Заказы", disabled: true}
            ], 
             headers:[               
                {
                    text: "ID",
                    value: "name"
                },
                {
                    text: "Покупатель",
                    value: "catalog_id",
                },
                {
                    text: "Телефон",
                    value: "price",
                },
                {
                    text: "Время заказа",
                    value: "action",
                    sortable: false,
                },  
                {
                    text: "Сумма заказа",
                    value: "action",
                    sortable: false,
                },            
                {
                    text: "Статус заказа",
                    value: "action",
                    sortable: false,
                },            
                // {
                //     text: "Действие",
                //     align: 'center',    
                //     value: "action",
                //     sortable: false,
                // },            
            ],
           orders:[]
        }
    },
    mounted(){
        Promise.resolve(this.getOrders())
            .then(res=>{
                this.orders=res;
                console.log("RESPONSE", res);
            })
            .catch(e=>{
                 console.log("Error", e);
            })
    },
    methods:{
        async getOrders(){
            const orders =  this.$axios.$get(this.$store.getters.base_url+'productorders');
            return orders;
        }
    }
}
</script>

