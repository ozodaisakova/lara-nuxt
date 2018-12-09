<template>
<div>
    <v-breadcrumbs :items="for_breadcrumd" divider="/"></v-breadcrumbs>
    <v-card class="pa-2">
        <p class="text-xs-left title">Товары</p>   
         <v-data-table
            :headers="headers"
            :items="products"
            :pagination.sync="pagination"
            :rows-per-page-items="pagination.rowsPerPageItems"
            :total-items="pagination.totalItems"
            :loading="getSuccess"
            class="elevation-1 "
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
                <td >{{ props.item.name }}</td>               
                <td class="text-xs-center">{{ props.item.catalog.name }}</td>
                <td class="text-xs-center">{{ props.item.price }} тг</td>  
                <td class="text-xs-center">
                     <v-tooltip bottom>
                        <v-icon
                            slot="activator"
                            class="vision_hover"
                            @click="editItem(props.item)">
                            visibility
                        </v-icon>
                        <span>Посмотреть</span>
                    </v-tooltip>
                    <span>&#160;&#160;</span>
                    <v-tooltip bottom>
                        <v-icon
                            slot="activator"
                            class="edit_hover"
                            @click="editItem(props.item)">
                            edit
                        </v-icon>
                        <span>Редактировать</span>
                    </v-tooltip>
                    <span>&#160;&#160;</span>
                    <v-tooltip bottom>
                        <v-icon
                           slot="activator"                            
                            class="delete_hover"
                            @click="deleteItem(props.item)">
                            delete
                        </v-icon>
                        <span>Удалить</span>
                    </v-tooltip>
                </td>             
            </template>
         </v-data-table>
    </v-card>
</div>
</template>
<script>
export default{
    layout: 'admin',
    data(){
        return{
            for_breadcrumd: [
                {href: "/admin/panel", text:"Главная"},
                {href: "/admin/catalog/product", text: "Товары", disabled: true}
            ], 
            headers:[               
                {
                    text: "Наименование",
                    align: "left",
                    value: "name"
                },
                {
                    text: "Категория",
                    value: "catalog_id",
                    align: "center"
                },
                {
                    text: "Цена",
                    value: "price",
                    align: "center"
                },
                {
                    text: "Действие",
                    value: "action",
                    sortable: false,
                    align: "center"
                },              
            ],
            getSuccess: true,
            products:[],   
            pagination: {
                descending: true,
                page: 1,
                rowsPerPage: 4,
                sortBy: "name",
                totalItems: 0,
                rowsPerPageItems: [4,8,12,16]
            }
        }
    },
    watch:{
        pagination: {
            handler(){
                this.getProducts(this.pagination.rowsPerPage, this.pagination.page, this.pagination.sortBy, this.pagination.descending);
            }
        }

    },
    computed:{
        computedPagination:{
            get(){
                return this.pagination
            },
            set(value){
                this.$emit('update:pagination', value)
            }
        }

    },
    mounted(){
        this.getProducts(this.pagination.rowsPerPage, this.pagination.page, this.pagination.sortBy, this.pagination.descending);
    },
    methods:{
        getProducts(rowsPerPage, page, sortBy, descending){
            this.$axios.$get(this.$store.state.base_url+"product_for_admin_table"+"?rowsPerPage="+rowsPerPage+
                            "&page="+page+"&descending="+descending+"&sortBy="+sortBy)
            .then(response=>{
                this.products = response.data;                
                this.pagination.totalItems = response.total; 
                this.getSuccess = false;               
            })
            .catch(error=>{
                console.log(error);
                this.getSuccess = false;
            }); 
                
        }
    }
}
</script>
<style scoped>
.edit_hover:hover{
    color: blue;
}
.delete_hover:hover{
    color: red;
}
.vision_hover:hover{
    color: green;
}
.white-dialog{
    background-color: white;
}
</style>
