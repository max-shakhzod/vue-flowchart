<!-- src/components/nodes/TriggerNode.vue -->

<template>
  <div class="node-container">
    <div class="node-header">
      <img
        src="@/assets/icons/trigger-icon.svg"
        alt="Trigger Icon"
        class="node-icon"
      />
      <span class="node-title">Trigger</span>
    </div>
    <hr />
    <div class="node-description">
      {{ formattedType }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },

  computed: {
    formattedType() {
      return this.data.type
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
    },
  },
}
</script>
