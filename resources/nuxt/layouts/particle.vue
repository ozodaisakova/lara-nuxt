<template>
<v-app class="back-image">
    <div class="back-image">
    </div>
    <vue-particles
        color="#ffffff"
        :particleOpacity="1"
        linesColor="#ffffff"
        :particlesNumber="120"
        shapeType="circle"
        :particleSize="5"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.9"
        :linesDistance="150"
        :moveSpeed="4"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
        class="back">
    </vue-particles>
    <v-content>
      <v-container class="main-back">
        <nuxt />
      </v-container>
    </v-content>
</v-app> 
</template>
<style scoped>
.back{
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
}
.back-image{
    z-index: -2;
    background: #2DC6C1;    
    background: linear-gradient(145deg,#19E9A6, #95FD48);
    position: absolute;
    width: 100%;
    height: 100%;
}
.main-content{
    color: #19E9A6;
}
</style>
