<template>
  <div class="node">
    <h3>{{ formattedConnectorType }}</h3>
    <!-- Additional content can go here -->
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
  width: 40px;
  font-size: 7px;
  color: #ffffff;
  padding: 1px;
  border: 1px solid #ccc;
  border-radius: 40%;
  background-color: #3778e2;
}
</style>
