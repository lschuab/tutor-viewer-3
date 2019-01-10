<template>
  <v-layout
  row
  class="individual"
  id="add-shift">
    <v-container>
      <v-layout row>
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
                  :items="[...times, '7:00PM']"
                  :label="'Start time'"
                ></v-autocomplete>
                <v-autocomplete
                  ml-5
                  class="shift-input"
                  required
                  v-model="endTime"
                  :items="[...times, '7:00PM']"
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
      <v-flex mt-3 mr-5>
        <h1 mb-5 >Current Shifts</h1>
        <v-card class="shift-list">
          <v-list mt-5 two-line>
            <template 
              v-for="(shift, index) in shifts"
            > 
              <v-divider
                v-if="index > 0"
                :key="'divider' + index"
              ></v-divider>
            <v-list-tile
              :key="'shift' + shift.id" 
              class="shift-list-item"           
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="shift.day"></v-list-tile-title>
                <v-list-tile-title v-html="shift.startTime + ' - ' + shift.endTime"></v-list-tile-title>
                <v-list-tile-sub-title v-html="shift.center"></v-list-tile-sub-title>
              </v-list-tile-content>
              
              <!-- <v-list-tile-action>
                <v-icon 
                  :color="shift.active ? 'teal' : 'grey'"
                  @click="openDialog1(shift.id)"
                >edit</v-icon>
                
              </v-list-tile-action> -->
              <v-list-tile-action>
                <v-icon 
                  :color="shift.active ? 'teal' : 'grey'"
                  @click="openDialog2(shift.id)"
                >delete</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      </v-layout>
    </v-container>
    <v-dialog
      v-model="dialog1"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">Permanantly delete this shift?</v-card-title>


        <v-card-text>
          Deleting can not be undone
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey darken-2"
            flat="flat"
            @click="dialog1 = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="error"
            flat="flat"
            @click="edit(selectedShift)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog2"
      max-width="700"
    >
      <v-card>
        <v-card-title class="headline">Permanantly delete this shift?</v-card-title>

        <v-card-text>
          Deleting can not be undone
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="grey darken-2"
            flat="flat"
            @click="dialog2 = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="error"
            flat="flat"
            @click="del(selectedShift)"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { times, timesFormatted } from '../utilities';
import EventBus from '../event-bus';
export default {
  props: ['tutorID', 'tutorName', 'shiftAdded', 'shifts'],
  data: () => ({
    selectedShift: 0,
    dialog1: false,
    dialog2: false,
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
      const times1 = [...times, "7:00PM"];
      const startTimeFormatted = timesFormatted[times1.indexOf(this.startTime)];
      const endTimeFormatted = timesFormatted[times1.indexOf(this.endTime)];
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
          this.emitMethod('ADDED_SHIFT');
          this.clear();
        })
      }
    },
    emitMethod(action) {
      EventBus.$emit(action, true);
    },
    openDialog1(id) {
      this.selectedShift = id;
      this.dialog1 = true;
    },
    openDialog2(id) {
      this.selectedShift = id;
      this.dialog2 = true;
    },
    del(shiftID) {
      this.$http.delete(`${this.apiURL}/shifts/${shiftID}`)
      .then(() => {
        this.emitMethod('DELETED_SHIFT');
      });
      this.dialog2 = false;
    },
    edit(shiftID) {
      // eslint-disable-next-line
      console.log(shiftID)
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
.shift-list {
  width: 30rem;
}
.shift-list-item {
  height: 6rem;
}
</style>

