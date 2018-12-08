<template>
<div>
<any-error v-bind:error_code="error.statusCode" v-bind:error_name="error.message"></any-error>
</div>
</template>
<script>
import AnyError from '~/components/errors/AnyError.vue'
export default {
    props: ['error'],
    components:{
        AnyError
    }    
}
</script>
