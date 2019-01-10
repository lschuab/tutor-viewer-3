<template>
  <v-container id="tutors-cont">
    <v-layout row align-start>
      <v-flex xs12 sm6>
        <v-card id="tutors-card">
          <v-toolbar color="teal darken-1" dark>  
            <v-toolbar-title>Tutors</v-toolbar-title>
  
            <v-spacer></v-spacer>
  
            <!-- <v-btn icon>
              <v-icon>search</v-icon>
            </v-btn> -->
          </v-toolbar>
          <v-list id="tutors-list">
            <template v-for="(tutor, index) in tutors"> 
              <v-divider
                v-if="index > 0"
                :key="'divider' + index"
              ></v-divider>
  
              <v-list-tile
                :key="'tutor' + tutor.id"
                @click="updateTutor(tutor.id)"
              > 
                <v-list-tile-content>
                  <v-list-tile-title v-html="`${tutor.firstName} ${tutor.lastName}`"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex mr-3>
        <v-layout column>
          <v-flex>
            <Tutor v-bind:tutorID="selectedTutorId"/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Tutor from './Tutor.vue'
import EventBus from "../event-bus";

export default {
  components: {
    Tutor
  },
  data () {
    return {
      selectedTutorId: 27,
      apiURL: "http://localhost:8000",
      tutors: {},
    }
  },
  created () {
    this.$http.get(`${this.apiURL}/tutors`)
    .then(data => {
      this.tutors = data.body;
    })
  },
  methods: {
    updateTutor(id) {
      this.selectedTutorId = id;
    }
  },
  mounted() {
    EventBus.$on("DELETED_TUTOR", () => {
      this.$http.get(`${this.apiURL}/tutors`)
      .then(data => {
        this.tutors = data.body;
      })
    });
  }
}
</script>

<style>
#tutors-card {
  width: 10vw;
  height: 90vh;
}
#tutors-list {
  height: 100%;
  overflow-y: auto;
}
#tutors-cont {
  padding-top: .92rem;
}
</style>

