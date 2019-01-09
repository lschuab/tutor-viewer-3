import Vue from 'vue'
import Router from 'vue-router'
import StudentView from './components/StudentView.vue'
import AdminView from './components/AdminView.vue'
import Tutors from './components/Tutors.vue'
import NewTutor from './components/NewTutor.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'studentView',
      component: StudentView,
    },
    {
      path: '/admin',
      name: 'adminView',
      component: AdminView,
      children: [
        {
          path: '/tutors',
          name: 'tutors',
          component: Tutors
        },
        {
          path: '/student_view',
          name: 'studentViewDash',
          component: StudentView
        },
        {
          path: '/new_tutor',
          name: 'newTutor',
          component: NewTutor
        }
      ]
    },
  ]
})
