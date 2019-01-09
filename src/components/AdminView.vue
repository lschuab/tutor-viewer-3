<template>
  <div id="admin-view">
    <v-layout row>
      <Sidebar />
      <v-flex>
        <router-view />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue'
  export default {
    data: () => ({
      apiURL: "http://localhost:8000",
    }),
    components: {
      Sidebar
    },
    methods: {
    },
    created () {
      // this.$http.get(`${this.apiURL}/courses`)
      // .then(data => {
      //   this.courses = data.body;
      // })
    }
  }
</script>

<style>
#admin-view {
  height: 100%;
  width: 100%;
  background-color: #C9E4CA;
}
</style>
