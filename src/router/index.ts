import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Detail from '../views/gratitude/Detail.vue'
import Edit from '../views/gratitude/Edit.vue'
import addGratitude from '../views/gratitude/AddGratitude.vue'
import editMoods from '@/views/moods/EditMoods.vue'
import Habits from '@/views/habits/Habits.vue'
import Settings from '@/views/settings/Settings.vue'

// eslint-disable-next-line
const routes: any[] = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About
  },
  {
    path: '/gratitude/detail/:id',
    name: 'gratitude/detail',
    component: Detail
  },
  {
    path: '/gratitude/edit/:id',
    name: 'gratitude/edit',
    component: Edit
  },
  {
    path: '/gratitude/new',
    name: 'addgratitude',
    component: addGratitude
  },
  {
    path: '/moods/edit',
    name: 'editMoods',
    component: editMoods
  },
  {
    path: '/habits',
    name: 'Habits',
    component: Habits
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
