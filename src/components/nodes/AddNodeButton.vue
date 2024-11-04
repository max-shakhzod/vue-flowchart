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
      this.$emit('open-modal', { parentId: this.parentId })
    },
  },
}
</script>
