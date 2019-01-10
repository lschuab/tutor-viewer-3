<template>
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
                <v-btn @click="submit('form-1')">update</v-btn>
              </form>
              <h1 v-bind:class="'successful' + (tutorUpdated === 'Nobody' ? ' invisible' : '')">{{this.tutorUpdated}} was updated.</h1>
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
            <v-flex>
              <v-btn
                color="error"
                dark
                @click="dialog = true"
              >
                DELETE TUTOR
              </v-btn>
          
              <v-dialog
                v-model="dialog"
                max-width="700"
              >
                <v-card>
                  <v-card-title class="headline">Permanantly Delete {{this.firstName}} {{this.lastName}}?</v-card-title>
          
                  <v-card-text>
                    Deleting a tutor cannot be undone. Their shifts will also be deleted.
                  </v-card-text>
          
                  <v-card-actions>
                    <v-spacer></v-spacer>
          
                    <v-btn
                      color="grey darken-2"
                      flat="flat"
                      @click="dialog = false"
                    >
                      Cancel
                    </v-btn>
          
                    <v-btn
                      color="error"
                      flat="flat"
                      @click="del()"
                    >
                      Delete
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-container>
</template>

<script>
import EventBus from "../event-bus";
export default {
  props: ['tutorID', 'firstName', 'lastName', 'previouslySelectedCourses'],
  data: () => ({
    dialog: false,
    apiURL: "http://localhost:8000",
    courses: [
    ],
    courseCode: '',
    courseName: '',
    tutorUpdated: 'Nobody',
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
    },
    selectedCourses: []
  }),
  mounted () {
    this.$validator.localize('en', this.dictionary);
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
            this.$http.put(`${this.apiURL}/tutors/${this.tutorID}`, {
              firstName: this.firstName,
              lastName: this.lastName
            })
            .then(() => {
              this.$http.delete(`${this.apiURL}/tutors/${this.tutorID}/courses`)
              .then(() => {
                for (let courseId of this.selectedCourses) {
                  this.$http.post(`${this.apiURL}/tutors/${this.tutorID}/courses/${courseId}`)
                }
                this.tutorUpdated = this.firstName + " " + this.lastName;
              })
            }); 
          } else {
            this.$http.post(`${this.apiURL}/courses`, {
              courseCode: this.courseCode,
              courseName: this.courseName
            })
            .then(response => {
              const newCourse = response.body;
              this.$http.post(`${this.apiURL}/tutors/${this.tutorID}/courses/${newCourse.id}`)
              .then(() => {
                this.$http.get(`${this.apiURL}/courses`)
                .then(data => {
                  this.courses = data.body;
                  this.selectedCourses.push(newCourse.id)
                })
              })
              this.addedCourse = newCourse.courseCode;
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
    del() {
      this.$http.delete(`${this.apiURL}/tutors/${this.tutorID}`)
      .then(() => {
        this.emitMethod();
      });
      this.dialog = false;
    },
    emitMethod() {
      EventBus.$emit('DELETED_TUTOR', true);
    }
  },
  created() {
    this.$http.get(`${this.apiURL}/courses`)
      .then(data => {
        this.courses = data.body;
      })
  },
  watch: {
    tutorID () {
      this.selectedCourses = [...this.previouslySelectedCourses];
      this.tutorUpdated = "Nobody"
    }
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

