<template>
<div>
    <v-breadcrumbs :items="for_breadcrumd" divider="/"></v-breadcrumbs>
    <v-card class="pa-2">
        <p class="text-xs-left title">Товары</p>   
         <v-data-table
            :headers="headers"
            :items="products"
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
                <td>{{ props.item.name }}</td>               
                <td><v-icon> {{ props.item.category }}</v-icon></td>
                <td>{{ props.item.price }}</td>  
                <td>
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
                    sortable: true,
                    value: "name"
                },
                {
                    text: "Категория",
                    value: "category"
                },
                {
                    text: "Цена",
                    value: "price",
                    sortable: true
                },
                {
                    text: "Действие",
                    value: "action"
                },
                // {
                //     text: "Цвета",
                //     value: "colors"
                // },
                // {
                //     text: "Описание",
                //     value: "description"
                // },
                // {
                //     text: "Ширина",
                //     value: "width"
                // },
                // {
                //     text: "Высота",
                //     value: "height",
                // },
                // {
                //     text: "Длина",
                //     value: "length"
                // },
                // {
                //     text: "Материал",
                //     value: "material"
                // },
                // {
                //     text: "Комплектация",
                //     value: "complect"
                // },
                // {
                //     text: "Каркас",
                //     value: "karkas"
                // },
                // {
                //     text: "Изображения",
                //     value: "images"
                // },
                // {
                //     text: "Рекомендации",
                //     value: "recommendation"
                // },
                // {
                //     text: "Видимость",
                //     value: "hidden"
                // },
                // {
                //     text: "Наличие",
                //     value: "available"
                // }
            ],
            products:[],   
        }
    },
    methods:{
        getproducts(){

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
.white-dialog{
    background-color: white;
}
</style>
