<template>
  <v-layout align-space-between justify-start row fill-height class="individual" id="schedule">
    <Times/>
    <v-flex grow id="days-container">
      <v-layout id="days" align-space-between justify-start row fill-height>
        <Day v-for="day in days" v-bind:day="day" v-bind:key="day" v-bind:dayColumns="shifts[day]"/>
      </v-layout>
    </v-flex>
    <Times/>
  </v-layout>
</template>

<script>
import Times from "./Times.vue";
import Day from "./Day.vue";
import { mapTimesToIndex, emptySlots, colors } from "../utilities";
import EventBus from "../event-bus";

export default {
  props: ["tutorID", "trigger"],
  data: () => ({
    apiURL: "http://localhost:8000",
    tutor: {},
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shifts: {}
  }),
  components: {
    Times,
    Day
  },
  created() {
    for (let day of this.days) {
      this.shifts[day] = [JSON.parse(JSON.stringify(emptySlots))];
    }
    if (this.tutorID) {
      this.$http.get(`${this.apiURL}/tutors/${this.tutorID}`).then(data => {
        this.tutor = data.body;
        this.showSchedule();
      });
    }
  },
  updated() {},
  methods: {
    showSchedule() {
      for (let day of this.days) {
        this.shifts[day] = [JSON.parse(JSON.stringify(emptySlots))];
      }
      let color = colors[0];
      for (let shift of this.tutor.shifts) {
        const day = shift.day;
        const startIndex = mapTimesToIndex[shift.startTime];
        const endIndex = mapTimesToIndex[shift.endTime];
        for (let i = startIndex; i < endIndex; i++) {
          this.shifts[day][0][i].displayName = shift.center;
          this.shifts[day][0][i].color = color;
        }
      }

      this.shifts = JSON.parse(JSON.stringify(this.shifts));

    }
  },
  watch: {
    tutorID(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$http.get(`${this.apiURL}/tutors/${newVal}`).then(data => {
          this.tutor = data.body;
          this.showSchedule();
        });
      }
    }
  },
  mounted() {
    EventBus.$on("ADDED_SHIFT", () => {
      this.$http.get(`${this.apiURL}/tutors/${this.tutorID}`).then(data => {
          this.tutor = data.body;
          this.showSchedule();
        });
    });
  }
};
</script>

<style>
.individual {
  width: 70vw !important;
}
</style>
