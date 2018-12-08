<template>
    <v-list-tile
        router
        :to="{path: tuda}"
        exact
        ripple>
        <v-list-tile-action>
          <v-icon v-html="icon"></v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-content v-text="name">
          </v-list-tile-content>
        </v-list-tile-content>
        </v-list-tile>
</template>
<script>
  export default{
    props:['name', 'icon', 'tuda']
  }
</script>
