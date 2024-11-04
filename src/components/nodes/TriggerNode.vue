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
    openCreateNodeModal(payload) {
      console.log('Parent ID from TriggerNode:', payload.parentId) // Check if payload has parentId
      this.$emit('open-create-node-modal', payload)
    },
  },
}
</script>
