<!-- src/components/nodes/BusinessHoursNode.vue -->

src="@/assets/icons/datetime-icon.svg"

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
        {{ formattedBusinessHours }}
      </div>
    </div>
    <!-- Add the "+" button below the Business Hours node -->
    <AddNodeButton
      :parentId="validParentId"
      @open-modal="openCreateNodeModal"
      class="add-button"
    />
  </div>
</template>

<script>
import AddNodeButton from './AddNodeButton.vue' // Import the AddNodeButton component

export default {
  components: {
    AddNodeButton,
  },
  props: {
    data: {
      type: Object,
      required: true, // Ensure data is required
    },
  },

  computed: {
    formattedBusinessHours() {
      return this.data.times
        .map(time => `${time.day}: ${time.startTime} - ${time.endTime}`)
        .join(', ')
    },
    validParentId() {
      // Check if data.id is valid; return -1 if not
      return this.data.id !== undefined && this.data.id !== null
        ? this.data.id
        : -1
    },
  },

  methods: {
    openCreateNodeModal() {
      const parentId = this.validParentId
      console.log('BusinessHoursNode parentId:', parentId)
      this.$emit('open-modal', { parentId }) // Emit event with parentId
    },
  },
}
</script>
