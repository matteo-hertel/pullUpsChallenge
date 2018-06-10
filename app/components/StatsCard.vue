<template>
    <v-flex xs12 sm8 md6 lg3 pa-1>
      <div class="text-xs-center display-1 ma-3" v-text='title'></div>
      <v-card>
        <v-card-title class="display-3 justify-center pt-3" v-text='number'></v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat nuxt to="/inspire">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
</template>


<script>
export default {
  props: {
    title: {
      type: String,
      value: ''
    },
    number: {
      type: Number,
      value: 0
    }
  }
}
</script>
