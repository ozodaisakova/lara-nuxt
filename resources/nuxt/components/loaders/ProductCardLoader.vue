<template>
<div>
    <v-layout row wrap> 
        <v-flex d-flex xs12 sm8 md8>
            <div class="product-breadcrumb animated-background">
            </div>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex d-flex xs12 sm4 md3 v-for="item in 12" :key="item">
            <v-card class="mx-1 my-1">
                <div class="timeline-wrapper">
                    <div class="timeline-item">                            
                        <div class="product-image animated-background">
                        </div>
                        <div class="product-title animated-background">
                        </div>
                         <div class="product-info-2 animated-background">
                        </div>                                               
                        <div class="product-info-1 animated-background">
                        </div>
                        <div class="product-info-3 animated-background">
                        </div>
                        <div class="product-info-2 animated-background">
                        </div>                        
                    </div>
                </div>                
            </v-card>
        </v-flex>
    </v-layout>
</div>
</template>
<style scoped>
@keyframes placeHolderShimmer {
    0%{
        background-position: 130% 0;
    }    
    100%{
        background-position: -130% 0;
    }
}
.timeline-wrapper{
    padding: 10%;
}
.animated-background {
    animation-duration: 2.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #565b61;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 1000px 300px;
    height: 100%;
    position: relative;
}
.product-image{
    height: 200px;
}
.product-title{
    margin-top: 20px;
    height: 20px; 
    margin:5% 5% 5% 0%;  
    border-radius: 10px; 
}
.product-info-1{
    margin-top: 10px;
    height: 10px; 
    margin:5% 5% 5% 0%;    
    border-radius: 10px; 
}
.product-info-2{
    margin-top: 10px;
    height: 10px; 
    margin: 5% 20% 5% 0%;  
    border-radius: 10px; 
}
.product-info-3{
    margin-top: 10px;
    height: 10px; 
    margin: 5% 10% 5% 0%;  
    border-radius: 10px; 
}
.product-breadcrumb{
    margin: 10px;
    height: 20px;
    margin: 7% 10% 5% 0%;
    border-radius: 10px;
}

</style>
