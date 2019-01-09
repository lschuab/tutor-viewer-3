<template>
  <v-layout justify-center column>
    <v-flex mx-auto mt-5 xs12 sm6 >
      <v-card id="form-card">
        <v-toolbar color="teal darken-1" dark>
          <v-toolbar-title>Add A New Tutor</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container
          fluid
          id='form-card-cont'
        >
          <v-layout column justify-space-between fill-height>
            <v-flex>
                <form
                  data-vv-scope="form-1"
                  v-on:submit.prevent="submitNewTutor()"
                >
                  <v-text-field
                    class='input'
                    v-validate="'required|max:20'"
                    v-model="firstName"
                    :counter="20"
                    :error-messages="errors.collect('form-1.First Name')"
                    label="First Name"
                    name="First Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    class='input'
                    v-validate="'required|max:20'"
                    v-model="lastName"
                    :counter="20"
                    :error-messages="errors.collect('form-1.Last Name')"
                    label="Last Name"
                    name="Last Name"
                    required
                    mb-3
                  ></v-text-field>
                  <br>
                  <v-spacer></v-spacer>
                  <v-autocomplete
                    v-model="selectedCourses"
                    :items="courses"
                    box
                    chips
                    color="blue-grey lighten-2"
                    label="Courses Qualified to Tutor"
                    item-text="courseCode"
                    item-value="id"
                    multiple
                    mt-3
                  >
                    <template
                      slot="selection"
                      slot-scope="data"
                    >
                      <v-chip
                        :selected="data.selected"
                        close
                        class="chip--select-multi"
                        @input="remove(data.item)"
                      >
                        {{ data.item.courseCode }}
                      </v-chip>
                    </template>
                    <template
                      slot="item"
                      slot-scope="data"
                    >
                      <template v-if="typeof data.item !== 'object'">
                        <v-list-tile-content v-text="data.item"></v-list-tile-content>
                      </template>
                      <template v-else>
                        <v-list-tile-content>
                          <v-list-tile-title v-html="data.item.courseCode"></v-list-tile-title>
                        </v-list-tile-content>
                      </template>
                    </template>
                </v-autocomplete>
                <v-btn @click="submit('form-1')">submit</v-btn>
                <v-btn @click="clear">clear</v-btn>
              </form>
              <h1 v-bind:class="'successful' + (addedTutor === 'Nobody' ? ' invisible' : '')">{{this.addedTutor}} was added.</h1>
            </v-flex>
            <v-divider></v-divider>
            <v-flex>
              <h1 mt-5>Is this tutor qualified to tutor a course that is new to your center? Add it below.</h1>   
              <form
                data-vv-scope="form-2"
              >
                <v-text-field
                  class='input'
                  v-validate="'required|max:6'"
                  v-model="courseCode"
                  :counter="6"
                  :error-messages="errors.collect('form-2.Course Code')"
                  label="Course Code"
                  name="Course Code"
                  required
                ></v-text-field>
                <v-text-field
                  class='input'
                  v-validate="'required|max:20'"
                  v-model="courseName"
                  :counter="20"
                  :error-messages="errors.collect('form-2.Course Title')"
                  label="Title of Course"
                  name="Course Title"
                  required
                  mb-3
                ></v-text-field>     
                <v-btn @click="submit('form-2')">submit</v-btn>
                <v-btn @click="clear2">clear</v-btn>
              </form>
              <h1 v-bind:class="'successful' + (addedCourse === 'Nothing' ? ' invisible' : '')">{{this.addedCourse}} was added.</h1>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    apiURL: "http://localhost:8000",
    firstName: '',
    lastName: '',
    courses: [
    ],
    selectedCourses: [],
    courseCode: '',
    courseName: '',
    addedTutor: 'Nobody',
    addedCourse: 'Nothing',
    dictionary: {
      attributes: {
      },
      custom: {
        name: {
          required: () => 'Name can not be empty',
          max: 'The name field may not be greater than 20 characters'
          // custom messages
        },
      }
    }
  }),

  mounted () {
    this.$validator.localize('en', this.dictionary)
  },

  methods: {
    remove (item) {
      const index = this.selectedCourses.indexOf(item.id)
      if (index >= 0) this.selectedCourses.splice(index, 1)
    },
    submit (scope) {
      this.$validator.validateAll(scope)
      .then(valid => {
        if (valid) {
          if (scope === 'form-1') {
            this.$http.post(`${this.apiURL}/tutors`, {
              firstName: this.firstName,
              lastName: this.lastName
            })
            .then(response => {
              for (let courseId of this.selectedCourses) {
                this.$http.post(`${this.apiURL}/tutors/${response.body.id}/courses/${courseId}`)
              }
              this.addedTutor = response.body.firstName + " " + response.body.lastName;
              this.clear();
            }); 
          } else {
            this.$http.post(`${this.apiURL}/courses`, {
              courseCode: this.courseCode,
              courseName: this.courseName
            })
            .then(response => {
              this.addedCourse = response.body.courseCode;
              this.clear2();
            })
          }
        }
      });
    },
    clear () {
      this.firstName = ''
      this.lastName = ''
      this.selectedCourses = []
      this.$validator.reset()
    },
    clear2 () {
      this.courseCode = ''
      this.courseName = ''
      this.$validator.reset()
    },
  },
  created() {
    this.$http.get(`${this.apiURL}/courses`)
      .then(data => {
        this.courses = data.body;
      })
  }
}
</script>

<style>
  #form-card {
    width: 80vw;
    height: 90vh;
  }
  .input {
    width: 20rem;
  }
  #form-card-cont {
    height: 95%;
  }
  .invisible {
    visibility: hidden;
  }
  .successful {
    color: green;
  }
</style>

