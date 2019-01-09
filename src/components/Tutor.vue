<template>
  <v-layout column align-center justify-start>
    <v-flex mt-3>
      <v-toolbar color="teal darken-1" dark>
        <v-toolbar-title>{{tutor.firstName ? (tutor.firstName + " " + tutor.lastName) : "Choose a tutor"}}</v-toolbar-title>
        <!-- <v-btn 
          @click="refresh()"
          icon
        >
          <v-icon>refresh</v-icon>
        </v-btn> -->
        <v-tabs
          slot="extension"
          v-model="tab"
          color="teal darken-1"
          grow
          darkens
        >
          <v-tabs-slider color="teal accent-3"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
      </v-toolbar>
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="item in items"
          :key="item"
        >
          <v-card id='tab-window' flat>
            <SingleSchedule v-if="item === 'schedule'" v-bind:tutorID="tutorID"
          />
            <AddShift v-else-if="item === 'add shift'" v-bind:tutorID="tutorID"
            v-bind:tutorName="tutor.firstName + ' ' + tutor.lastName"
            v-bind:shiftAdded="shiftAdded"
            />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-flex>
  </v-layout>
</template>

<script>
import SingleSchedule from './SingleSchedule.vue'
import AddShift from './AddShift.vue'
export default {
  props: ['tutorID'],
  data: () => ({
    shiftAdded: false,
    apiURL: "http://localhost:8000",
    tutor: {},
    tab: null,
    items: [
      'schedule', 'add shift', 'courses', 'edit'
    ]
  }),
  components: {
    SingleSchedule,
    AddShift
  },
  created () {
    if (this.tutorID){
      this.$http.get(`${this.apiURL}/tutors/${this.tutorID}`)
      .then(data => {
        this.tutor = data.body;
      })
    }
  },
  updated () {
  },
  methods: {
    refresh() {
    }
  },
  watch: {
    tutorID (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$http.get(`${this.apiURL}/tutors/${newVal}`)
        .then(data => {
          this.tutor = data.body;
        });
      }
    }
  }
  
}
</script>

<style>
#tab-window {
  width: 70vw !important;
  height:81vh !important;
}
</style>
