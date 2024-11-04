<!-- src/components/AddNodeButton.vue -->

<template>
  <button class="add-node-button" @click.stop="emitAddNode">+</button>
</template>

<script>
export default {
  props: {
    parentId: {
      type: [String, Number],
      required: true,
    },
  },
  methods: {
    emitAddNode() {
      console.log('Button clicked, emitting parentId:', this.parentId) // Log the parentId
      this.$emit('open-modal', { parentId: this.parentId })
    },
  },
}
</script>

<style scoped>
.add-node-button {
  position: absolute;
  bottom: 10px;
  right: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 20px;
  cursor: pointer;
}
</style>
