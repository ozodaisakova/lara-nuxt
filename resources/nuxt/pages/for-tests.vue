<template>
  <div>
      <img src="/ramazan/ramazan.png" alt="">
      <input type="file" @change="onFileSelected">
      <button @click="onUpload">Upload</button>
  </div>
</template>
<script>
export default {
    data(){
        return{
            selectedFile: null,
        }
    },
    methods:{
        onFileSelected(event){
            this.selectedFile = event.target.files[0];
        },
        onUpload(){
            const fd = new FormData();
            fd.append('myfiles', this.selectedFile, this.selectedFile.name);
            this.$axios.$post(this.$store.state.base_url+"product",fd)
            .then(response=>{
                console.log("RESPONSE: ", response);
            })  
            .catch(error=>{
                console.log("ERROR:", error);
            })          
        }
    }
}
</script>

