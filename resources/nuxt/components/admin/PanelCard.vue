<template>
    <v-flex xs12 sm6 md3 class="pa-1">
        <v-card color="primary" class="white--text">
            <v-card-actions >
                <div class="subheading"> {{title}}</div>
              </v-card-actions>
              <v-divider light></v-divider>
              <v-layout row>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="display-2 font-weight-thin text-xs-center">{{count}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs5 d-flex align-center>
                  <v-icon size="70px" class="white--text">{{icon}}</v-icon>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions >
                <nuxt-link class="white--text" :to='src'>Подробнее...</nuxt-link>
              </v-card-actions>
            </v-card>
    </v-flex>
</template>
<script>
export default {
    props:['title', 'count', 'icon', 'src'],
}
</script>

