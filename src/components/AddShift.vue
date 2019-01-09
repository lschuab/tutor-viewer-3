<template>
  <v-layout
  row
  class="individual"
  id="add-shift">
    <v-container>
      <v-flex mt-3>
        <h1>Add a shift for {{ tutorName }}</h1>
        <form>
          <br>
          <v-container>

            <v-layout 
              row
              align-content-center
            >
              <v-flex>
                <v-autocomplete
                  ml-5
                  class="shift-input"
                  required
                  v-model="day"
                  :items="days"
                  :label="'Day of the week'"
                ></v-autocomplete>
                <v-autocomplete
                  ml-5
                  class="shift-input"
                  required
                  v-model="startTime"
                  :items="times"
                  :label="'Start time'"
                ></v-autocomplete>
                <v-autocomplete
                  ml-5
                  class="shift-input"
                  required
                  v-model="endTime"
                  :items="times"
                  :label="'End Time'"
                ></v-autocomplete>
                <v-autocomplete
                  ml-5
                  class="shift-input"
                  required
                  v-model="center"
                  :items="centers"
                  item-text="text"
                  item-value="code"
                  :label="'Center'"
                ></v-autocomplete>
              </v-flex>
            </v-layout>
            <v-btn @click="submit()">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-container>

        </form>
        <h1 v-bind:class="'successful' + (!shiftAdded ? ' invisible' : '')">New shift was added.</h1>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
import { times, timesFormatted, shiftAdded } from '../utilities';
import EventBus from '../event-bus';
export default {
  props: ['tutorID', 'tutorName'],
  data: () => ({
    apiURL: "http://localhost:8000",
    days: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    centers: [
      {
        text: "Learning Support Center",
        code: "LSC"
      },
      {
        text: "Math Lab",
        code: "ML"
      },
      {
        text: "Q Building",
        code: "Q"
      },
      {
        text: "Black Mountain",
        code: "BM"
      },
    ],
    day: '',
    startTime: '',
    endTime: '',
    center: '',
    times: times,
    timesFormatted: timesFormatted,
  }),

  methods: {
    clear () {
      this.day = ''
      this.startTime = ''
      this.endTime = ''
      this.center = ''
    },
    submit() {
      const startTimeFormatted = timesFormatted[times.indexOf(this.startTime)];
      const endTimeFormatted = timesFormatted[times.indexOf(this.endTime)];
      if (this.day && this.startTime && this.endTime && this.center) {
        this.$http.post(`${this.apiURL}/shifts`, {
          tutorId: this.tutorID,
          day: this.day,
          startTime: startTimeFormatted,
          endTime: endTimeFormatted,
          center: this.center
        })
        .then(() => {
          this.shiftAdded = true;
          this.emitMethod();
          this.clear();
        })
      }
    },
    emitMethod() {
      EventBus.$emit('ADDED_SHIFT', true);
    }
  }

}
</script>

<style>
.individual {
  width: 70vw !important;
}
.shift-input {
  width: 20rem;
}
.invisible {
    visibility: hidden;
  }
</style>

