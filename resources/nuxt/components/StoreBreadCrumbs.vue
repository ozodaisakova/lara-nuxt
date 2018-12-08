<template>
    <v-breadcrumbs divider="/" large>
      <v-breadcrumbs-item 
          :key="item.src" 
          v-for="item in items" 
          :to="item.src">
          {{ item.name}}
      </v-breadcrumbs-item>
    </v-breadcrumbs>
</template>
<script>
export default {
  props:['items']
}
</script>

