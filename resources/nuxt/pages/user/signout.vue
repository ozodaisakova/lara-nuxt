<template>
    <v-card>

    </v-card>
</template>
<script>
export default {
    created(){
        this.$store.dispatch('getSignOut').then(()=>{
            this.$router.push({path:'/auth/signin'});
        });
    }
}
</script>

