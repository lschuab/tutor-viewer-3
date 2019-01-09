<template>
  <v-layout column align-center>
    <v-flex>
      <h1 mx-auto>This is the Schedule for {{courseData.courseCode}}</h1>
    </v-flex>
    <v-flex>
      <v-layout
      align-space-between
      justify-start
      row
      fill-height
      id="schedule"
      v-bind:class="!studentView ? 'dash-view' : ''">
        <Times />
        <v-flex
        grow
        id="days-container">
          <v-layout id="days" align-space-between justify-start row fill-height>
            <Day 
            v-for="day in days"
            v-bind:day="day" 
            v-bind:key="day"
            v-bind:dayColumns="shifts[day]"
            />
          </v-layout>
        </v-flex>
        <Times v-if="studentView" />
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import Times from './Times.vue'
import Day from './Day.vue'
import { mapTimesToIndex, emptySlots, colors } from '../utilities'
export default {
  props: ['courseID'],
  data: () => ({
    apiURL: "http://localhost:8000",
    courseData: {},
    days: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    shifts: {
    },
    studentView: true
  }),
  components: {
    Times,
    Day
  },
  created () {
    this.studentView = this.$route.path !== "/student_view";
    this.$http.get(`${this.apiURL}/courses/${this.courseID}`)
    .then(data => {
      this.courseData = data.body;
      this.showSchedule();
    })
  },
  updated () {
  },
  methods: {
    showSchedule() {
      for (let day of this.days) {
      this.shifts[day] = [JSON.parse(JSON.stringify(emptySlots))];
    }

    let colorIndex = 0;
    for (let tutor of this.courseData.tutors) {
      let displayName = tutor.firstName + " " + tutor.lastName[0] + ".";
      let color = colors[colorIndex++ % colors.length];
      for (let shift of tutor.shifts) {
        if (shift.center === "LSC") {
          const day = shift.day;
          const startIndex = mapTimesToIndex[shift.startTime];
          const endIndex = mapTimesToIndex[shift.endTime];
          let added = false;
          let dayColumnIndex = 0;
          while (!added) {
            if (dayColumnIndex >= this.shifts[day].length) {
              this.shifts[day].push(JSON.parse(JSON.stringify(emptySlots)));
            }
            let currentColumnWorks = true;
            for (let i = startIndex; i < endIndex; i++) {
              if (this.shifts[day][dayColumnIndex][i].displayName) {
                currentColumnWorks = false;
                break;
              }
            }
            if (!currentColumnWorks) {
              dayColumnIndex++;
            } else {
              for (let i = startIndex; i < endIndex; i++) {
                this.shifts[day][dayColumnIndex][i].displayName = displayName;
                this.shifts[day][dayColumnIndex][i].color = color;
              }
              added = true;
              break;
            }
          }
        }
      }
      
    }
    }
  },
  watch: {
    courseID (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$http.get(`${this.apiURL}/courses/${newVal}`)
        .then(data => {
          this.courseData = data.body;
          this.showSchedule();
        });
      }
    }
  }
  
}
</script>

<style>
#schedule {
  width: 90vw;
}
.dash-view {
  width: 82vw !important;
}
</style>
