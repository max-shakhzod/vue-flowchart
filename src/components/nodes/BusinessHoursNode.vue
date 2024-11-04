<!-- src/components/nodes/BusinessHoursNode.vue -->

<template>
  <div class="node-wrapper">
    <div class="node-container">
      <div class="node-header">
        <img
          src="@/assets/icons/datetime-icon.svg"
          alt="Business Hours Icon"
          class="node-icon"
        />
        <span class="node-title">Business Hours</span>
      </div>
      <hr />
      <div class="node-description">
        <img
          src="@/assets/icons/clock.svg"
          alt="Clock Icon"
          class="clock-icon"
        />
        {{ formattedTodayHours }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    formattedTodayHours() {
      const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
      const today = daysOfWeek[new Date().getDay()]
      const todayHours = this.data.times.find(time => time.day === today)

      if (todayHours) {
        return `${todayHours.day.charAt(0).toUpperCase() + todayHours.day.slice(1)}
          ${todayHours.startTime} - ${todayHours.endTime} UTC`
      } else {
        return 'Closed today'
      }
    },
    validParentId() {
      return this.data.id !== undefined && this.data.id !== null
        ? this.data.id
        : -1
    },
  },

  methods: {
    openCreateNodeModal() {
      const parentId = this.validParentId
      console.log('BusinessHoursNode parentId:', parentId)
      this.$emit('open-modal', { parentId })
    },
  },
}
</script>

<style scoped>
.clock-icon {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
</style>
