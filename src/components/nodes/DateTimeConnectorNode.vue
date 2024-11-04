<!-- src/components/nodes/DateTimeNode.vue -->
<template>
  <div class="node-wrapper">
    <div class="node">
      <span>{{ formattedConnectorType }}</span>
    </div>
    <!-- Add the "+" button below the node, passing the current node's ID as parentId -->
    <AddNodeButton
      :parentId="validParentId"
      @open-modal="openCreateNodeModal"
      class="add-button"
    />
  </div>
</template>

<script>
import AddNodeButton from './AddNodeButton.vue'

export default {
  name: 'DateTimeConnectorNode',
  components: {
    AddNodeButton,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedConnectorType() {
      // Capitalize the first letter of the connectorType
      const type = this.data.connectorType
      return type.charAt(0).toUpperCase() + type.slice(1)
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
      console.log('DateTimeConnectorNode parentId:', parentId)
      this.$emit('open-create-node-modal', { parentId })
    },
  },
}
</script>
