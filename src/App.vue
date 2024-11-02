<!-- src/App.vue -->

<template>
  <div id="app">
    <FlowChartView />
  </div>
</template>

<script>
import FlowChartView from './views/FlowChartView.vue'

export default {
  components: {
    FlowChartView,
  },
}
</script>

<style>
/* Global styles can go here */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
