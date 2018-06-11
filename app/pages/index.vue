<template>
  <v-layout row wrap justify-center align-center>
   <StatsCard title='All Time Completed' :number='$store.getters.allTimeCompleted' :isLoading='$store.getters.loadingState' />
   <StatsCard title='All Time Rejected' :number='$store.getters.allTimeRejected' :isLoading='$store.getters.loadingState' />
   <StatsCard title='All Time Average Per Week' :number='$store.getters.allTimeAverageWeek' :isLoading='$store.getters.loadingState' />
   <StatsCard title='Current Week Completed' :number='$store.getters.currentWeekCompleted' :isLoading='$store.getters.loadingState' />
   <StatsCard title='Current Week Rejected' :number='$store.getters.currentWeekRejected' :isLoading='$store.getters.loadingState' />
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
