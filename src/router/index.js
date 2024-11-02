// src/router.js

import { createRouter, createWebHistory } from 'vue-router'
import FlowChartView from '@/views/FlowChartView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: FlowChartView,
  },
  // Add other routes here, e.g., node details page if needed
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
