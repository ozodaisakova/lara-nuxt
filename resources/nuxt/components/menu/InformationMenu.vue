<template>
    <v-list-tile
        router
        :to="{path: '/catalog/'+item.id }"
        exact
        ripple>
        <v-list-tile-action>
          <v-icon v-html="item.icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-content v-text="item.name">
          </v-list-tile-content>
        </v-list-tile-content>
        </v-list-tile>
</template>
<script>
  export default{
    props:['item']
  }
</script>
