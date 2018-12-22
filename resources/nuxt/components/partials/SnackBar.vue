<template>
	<v-snackbar
	  v-model="snackbar"
	  :timeout="timeout"
	>
	  {{ getAlert.msg }}
	  <v-btn
	    color="pink"
	    flat
	    @click="snackbar = false"
	  >
	    Close
	  </v-btn>
	</v-snackbar>
</template>
<script>
export default{
  data(){
	    return {
	        snackbar: false,
	        y: 'top',
	        color:'primary',
	        timeout: 3000,
	        text: ''
	    }
	},
	computed:{
		getAlert(){
			if(this.$store.getters.getMessage.msg){
				this.snackbar = true;
			}
			else
			{
				this.snackbar = false;
			}
			return this.$store.getters.getMessage;
		}
	}
}
</script>