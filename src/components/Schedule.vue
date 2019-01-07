<template>
  <v-container>
    <v-autocomplete
      v-model="selectedCourse"
      :items="courses"
      :label="'Course code'"
      item-text="courseCode"
      item-value="id"
      no-data-text="No tutors available for this course currently. Contact LSC for more resources."
    >
    </v-autocomplete>
    <v-btn
        @click="handleClick"
      >
        Find Tutoring Schedule
      </v-btn>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      apiURL: "http://localhost:8000",
      courses: [],
      selectedCourse: null
    }),
    methods: {
      handleClick () {
        console.log(this.selectedCourse)
      }
    },
    created () {
      this.$http.get(`${this.apiURL}/courses`)
      .then(data => {
        this.courses = data.body;
      })
    }
  }
</script>

<style>

</style>
