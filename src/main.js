// src/main.js

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
/* these are necessary styles for vue flow */
import '@vue-flow/core/dist/style.css'

/* this contains the default theme, these are optional styles */
import '@vue-flow/core/dist/theme-default.css'
import './assets/nodeStyles.css'

// Initialize the application
const app = createApp(App)

// Use Pinia for state management
app.use(createPinia())

// Use Vue Router for routing
app.use(router)

// Mount the app
app.mount('#app')
