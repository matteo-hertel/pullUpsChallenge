<template>
    <v-flex xs12 sm8 md4 lg4 pa-1>
      <div class="text-xs-center display-1 ma-3" v-text='title'></div>
      <v-card>
        <v-layout row wrap align-center v-if='isLoading'>
          <v-flex class="text-xs-center">
            <v-progress-circular indeterminate class='d-inline-flex ma-4' />
          </v-flex>
        </v-layout>
        <v-card-title class="display-3 justify-center pt-3" v-if='!isLoading'  v-text='number'></v-card-title>
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
    isLoading: {
      type: Boolean,
      value: true
    },
    number: {
      type: Number,
      value: 0
    }
  }
}
</script>
