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
