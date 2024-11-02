<!-- src/components/nodes/BusinessHoursNode.vue -->
<template>
  <div class="node-container">
    <div class="node-header">
      <img
        src="@/assets/icons/datetime-icon.svg"
        alt="DateTime Icon"
        class="node-icon"
      />
      <span class="node-title">Business Hours</span>
    </div>
    <hr />
    <div class="node-description">
      {{ data.businessHours }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
}
</script>
