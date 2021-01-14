import {createWebHistory, createRouter} from "vue-router";
import Home from '../views/Home.vue'
import {authGuardBuilder} from "../services/auth";

function routeBuilder() {
  return [
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
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    },
    {
      path: '/movies',
      name: 'Movie List',
      component: () => import(/* webpackChunkName: "about" */ '../views/Movie.vue'),
      beforeEnter: authGuardBuilder
    },
    {
      path: '/artists',
      name: 'Artist List',
      component: () => import(/* webpackChunkName: "about" */ '../views/Artists'),
      beforeEnter: authGuardBuilder
    },
    {
      path: '/crews',
      name: 'Crew List',
      component: () => import(/* webpackChunkName: "about" */ '../views/Crews'),
      beforeEnter: authGuardBuilder
    },
  ]
}

export default function routerBuilder() {
  return createRouter({
    history: createWebHistory(),
    routes: routeBuilder()
  })
}
