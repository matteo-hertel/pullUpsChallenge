<template>
  <v-layout row wrap justify-center align-center>
   <StatsCard title='All Time Completed' :number=200 />
   <StatsCard title='All Time Average Per Week' :number=20 />
   <StatsCard title='All Time Rejected' :number=0 />
   <StatsCard title='Current Week' :number=28 />
  </v-layout>
</template>
<script>
import StatsCard from '~/components/StatsCard.vue'

export default {
  components: {
    StatsCard
  }
}
</script>
