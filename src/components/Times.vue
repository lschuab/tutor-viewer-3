<template>
  <v-flex id="times" xs1>
    <v-layout column justify-space-between fill-height id="test">
      <v-flex pt-1 class="day-header">
        PH
      </v-flex>
      <v-flex 
        v-for="(time, index) in times" 
        v-bind:class="`time ${(index + 1) % 2 === 0 ? 'even' : 'odd'}`" 
        v-bind:key="index"
        pt-1
      >
        {{time}}
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  data: () => ({
    times: [
      "8:00AM",
      "8:30AM",
      "9:00AM",
      "9:30AM",
      "10:00AM",
      "10:30AM",
      "11:00AM",
      "11:30AM",
      "12:00PM",
      "12:30PM",
      "1:00PM",
      "1:30PM",
      "2:00PM",
      "2:30PM",
      "3:00PM",
      "3:30PM",
      "4:00PM",
      "4:30PM",
      "5:00PM",
      "5:30PM",
      "6:00PM",
      "6:30PM",
    ],
  })
  
}
</script>

<style scoped>
#times {
  border: solid;
  margin: 0;
  flex-basis: 5rem;
}
.time {
text-align: center;
font-size: 1.2rem;
flex-basis: 2.5rem;
font-weight: bold;
}
.odd {
  background-color: rgba(179, 174, 174, 0.712);
}
.even{
  background-color: rgba(143, 140, 140, 0.842);
}
.day-header {
  color: #458cbb;
}
</style>

