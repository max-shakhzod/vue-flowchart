<!-- src/components/nodes/TriggerNode.vue -->

<template>
  <div class="node-wrapper">
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
    <AddNodeButton
      :parentId="parentId"
      @open-modal="openCreateNodeModal"
      class="add-button"
    />
  </div>
</template>

<script>
import AddNodeButton from './AddNodeButton.vue'

export default {
  components: {
    AddNodeButton,
  },
  props: {
    data: Object,
  },
  computed: {
    formattedType() {
      return this.data.type
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
    },
    parentId() {
      return this.data.parentId !== undefined && this.data.parentId !== null
        ? this.data.parentId
        : -1
    },
  },
  methods: {
    openCreateNodeModal() {
      console.log('Parent ID from TriggerNode:', this.parentId)
      this.$emit('open-create-node-modal', { parentId: this.parentId })
    },
  },
}
</script>

<!-- <style scoped>
.node-wrapper {
  position: relative; /* Allows absolute positioning of connection points */
}
.node-container {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
}
.node-header {
  display: flex;
  align-items: center;
}
.node-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
.node-title {
  font-weight: bold;
}
.node-description {
  margin-top: 8px;
}
.connection-point {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #007bff;
  border-radius: 50%;
}
.connection-point.left {
  left: -5px; /* Adjust as necessary */
  top: 50%;
  transform: translateY(-50%);
}
.connection-point.right {
  right: -5px; /* Adjust as necessary */
  top: 50%;
  transform: translateY(-50%);
}
.add-button {
  margin-top: 10px;
}
</style> -->
