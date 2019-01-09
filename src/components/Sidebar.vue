<template>
  <v-flex id="sidebar">
    <v-layout column align-center>
      <v-flex>
        <h1 class="header">TutorViewer</h1>
      </v-flex>
      <v-flex mb-5>
        <h2>Admin Portal</h2>
      </v-flex>
      <v-flex>
        <v-navigation-drawer class="teal darken-1">
          <v-divider></v-divider>
          <v-list dense class="pt-0">
            <v-list-group
              v-for="item in items"
              :key="item.title"
            >
              <v-list-tile
                slot="activator"
                :to='item.path'
              >
                <v-list-tile-action>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
        
                <v-list-tile-content>
                  <v-list-tile-title >{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                v-for="subItem in item.items"
                :key="subItem.title"
                :to='subItem.path'
              >
                <v-list-tile-action>
                  <v-icon>{{ subItem.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list-group>
          </v-list>
        </v-navigation-drawer>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { 
          title: 'Home', 
          icon: 'dashboard', 
          path:'/admin' 
        },
        { 
          title: 'Tutors', 
          icon: 'face', 
          path:'/tutors',
          items: [
            {
              title: "Add New Tutor",
              icon: 'add',
              path: '/new_tutor'
            }
          ]
        },
        { 
          title: 'Student View', 
          icon: 'view_week', 
          path:'/student_view'
        },
        { 
          title: 'About', 
          icon: 'question_answer', 
          path: ''}
      ],
    }
  }
}
</script>

<style>
#sidebar {
  background-color: #87BBA2;
  height: 100vh;
  max-width: 13%;
}
.header {
  font-family: 'Shrikhand', cursive;
  font-weight: lighter;
  color: #364958;
  margin-top: 2rem;
}
h2 {
font-family: 'Bree Serif', serif;
}
</style>

