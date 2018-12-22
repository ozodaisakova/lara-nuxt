<template>
<div>
  
  <p>    
    Main page
  </p>
</div>
</template>
<script>
import Preloader from '~/components/loaders/Preloader.vue'
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
     
    }
  }, 
  components:{
    Preloader
  },
  mounted() {
   
  },
}
</script>
