<template>
  <v-container id="student-view">
    <v-layout column align-center>
      <v-flex>
        <v-layout row mt-1>
          <v-flex>
            <v-autocomplete
              v-model="selectedCourseID"
              :items="courses"
              :label="'Course code'"
              item-text="courseCode"
              item-value="id"
              no-data-text="No tutors available for this course currently. Contact LSC for more resources."
            ></v-autocomplete>
          </v-flex>
          <v-flex>
            <v-btn
              @click="handleClick"
            >
              Find Tutoring Schedule
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex id="schedule-div">
        <Schedule
          v-if="courseID"
          v-bind:courseID="courseID"
        ></Schedule>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Schedule from './Schedule.vue'
  export default {
    data: () => ({
      apiURL: "http://localhost:8000",
      courses: [],
      selectedCourseID: null,
      courseID: null,
      studentView: true
    }),
    components: {
      Schedule
    },
    methods: {
      handleClick () {
        this.courseID = this.selectedCourseID;
      }
    },
    created () {
      this.studentView = this.$route.path !== "/student_view";
      this.$http.get(`${this.apiURL}/courses`)
      .then(data => {
        this.courses = data.body;
      })
    }
  }
</script>

<style>

</style>
