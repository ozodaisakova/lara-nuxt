<template>
<div>
<v-layout v-if="preloader==true"  align-center   style="height:80vh;">
    <v-flex d-flex>
        <div class="text-xs-center">
            <v-progress-circular
                :size="70"
                :width="7"
                color="primary"
                indeterminate></v-progress-circular>
        </div>
    </v-flex>
</v-layout>
<v-card  v-else class="pa-4" style="overflow:hidden !important;">
   <span  v-html="info.content"></span>
</v-card>
</div>
</template>
<script>
export default {
    data(){
        return{
            id: this.$route.params.id,
            info: [],
            preloader: true,
        }
    },
    mounted(){
        Promise.resolve(this.getInformation(this.id))
                .then(response=>{
                    this.info = response;
                    console.log("RESPONSE",this.info);
                    this.preloader=false;
                })
                .catch(error=>{
                    alert("Error");
                    console.log(error);
                    this.preloader=false;
                })

    },
    methods:{
        async getInformation(id){
            const information = await  this.$axios.$get(this.$store.state.base_url+"information/"+id);
            return information;
        }
    }
    
}
</script>
