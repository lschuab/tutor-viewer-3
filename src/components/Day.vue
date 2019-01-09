<template>
  <v-flex grow class="day" v-bind:id="day" xs2>
    <v-layout column justify-space-between>
      <v-flex pt-1 class="day-header">
        {{day.toUpperCase()}}
      </v-flex>
      <v-flex>
        <v-layout row>
          <DayCol 
            v-for="(dayColumn, index) in dayColumns.slice(0,3)"
            v-bind:key="index"
            v-bind:dayCol="dayColumn"
          />
        </v-layout>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
import DayCol from './DayCol.vue';
export default {
  props: ['day', 'dayColumns'],
  components: {
    DayCol
  },
  data: () => ({
  }),
  created() {
  },
}
</script>

<style>
.day {
  border: solid;
  flex-basis: 20rem;
  flex-grow: 1;
}
.day-header {
  background-color: #458cbb;
  text-align: center;
  font-weight: bold;
  font-size: 1.8rem;
  white-space: nowrap;
}
</style>

