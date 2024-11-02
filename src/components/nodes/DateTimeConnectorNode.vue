<!-- src/components/nodes/DateTimeNode.vue -->
<template>
  <div class="node">
    <span>{{ formattedConnectorType }}</span>
  </div>
</template>

<script>
export default {
  name: 'DateTimeConnectorNode',
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
  },
}
</script>

<style scoped>
.node {
  width: 50px;
  font-size: 7px;
  color: #ffffff;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 40%;
  background-color: #0d6efd;
}
</style>
