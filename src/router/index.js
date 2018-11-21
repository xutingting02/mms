import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Patients from '@/pages/Patients'
import Dashboard from '@/pages/Dashboard'
import AddPatient from '@/pages/AddPatient'
import Records from '@/pages/Records'
import AddRecord from '@/pages/AddRecord'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/manage',
      component: Layout,
      children: [
        {
          path: '',
          component: Dashboard
        },
        {
          path: 'dashboard',
          component: Dashboard
        },
        {
          path: 'patients',
          component: Patients
        },
        {
          path: 'addPatient',
          component: AddPatient
        },
        {
          path: 'addPatient/:id',
          component: AddPatient,
          props: true
        },
        {
          path: 'records',
          component: Records
        },
        {
          path: 'addRecord',
          component: AddRecord
        },
        {
          path: 'addRecord/:id',
          component: AddRecord,
          props: true
        }
      ]
    }
  ]
})
