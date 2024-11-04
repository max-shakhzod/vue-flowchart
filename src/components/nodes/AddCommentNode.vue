<!-- src/components/nodes/AddCommentNode.vue -->

<!-- src/components/nodes/AddCommentNode.vue -->
<template>
  <div class="node-wrapper">
    <div class="node-container">
      <div class="node-header">
        <img
          src="@/assets/icons/comment-icon.svg"
          alt="Comment Icon"
          class="node-icon"
        />
        <span class="node-title">{{ title }}</span>
      </div>
      <hr />
      <div class="node-description">{{ data.comment }}</div>
    </div>
    <AddNodeButton
      :parentId="validParentId"
      @open-modal="openCreateNodeModal"
      class="add-button"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AddNodeButton from './AddNodeButton.vue'

export default defineComponent({
  components: { AddNodeButton },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    title() {
      return this.data.name || 'Default Comment Title'
    },
    validParentId() {
      return this.data.id ?? -1
    },
  },
  methods: {
    openCreateNodeModal({ parentId }) {
      this.$emit('open-create-node-modal', { parentId }) // Emit event with parentId
    },
  },
})
</script>
