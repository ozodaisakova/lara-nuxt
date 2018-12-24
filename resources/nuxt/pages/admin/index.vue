<template>
<v-card class="pa-4">
<v-breadcrumbs :items="items" divider="/"></v-breadcrumbs>
<v-layout row wrap>    
    <panel-card 
        v-for="(item, i) in panels"
        :key="i"
        v-bind:title="item.title" 
        v-bind:icon="item.icon" 
        v-bind:count="item.count" 
        v-bind:src="item.src">
    </panel-card>    
</v-layout>  
<h2 class="title my-4">Статистика продаж</h2>
  <v-card class="pa-1">
    <header>
      <chartjs-line 
        v-bind:beginzero="beginZero"
        v-bind:labels="labels[radio]"
        v-bind:datalabel="dataLabel"
        v-bind:data="data[radio]"
        v-bind:backgroundcolor="bgColor"
        v-bind:bordercolor="borderColor"
        v-bind:bind="true"/>
    </header>
  </v-card>
</v-card>
</template>
<script>
import PanelCard from '~/components/admin/PanelCard.vue'
export default {
    layout: 'admin',
    data(){
        return{
            panels: [
                {title: 'Всего продаж', icon: 'shopping_cart', count: '122', src: '/admin/catalog/product'},
                {title: 'Всего товаров', icon: 'book', count: '78', src: '/admin/catalog/sdvhdjsk'},
                {title: 'Всего покупателей', icon: 'people', count: '196', src: '/admin/catalog/product'},
                {title: 'Всего отзывов', icon: 'message', count: '21', src: '/admin/catalog/product'},
            ],
            items: [
                    {
                    text: 'Главная',
                    href: '/admin/panel'
                    },
                    {
                    text: 'Панель состояния',
                    href: '/admin/panel' ,
                    disabled: true                  
                    }
            ],
            beginZero: true,
            labels: {
                week: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
            },
            dataLabel: "Проданные товары",
            radio: "week",
            data: {
                week: [4, 2, 11, 1, 5, 3, 7]
            },
            bgColor: "#ff8a80",
            borderColor: "#f44336"
        }
    },
    components:{
        PanelCard
    }

}
</script>

