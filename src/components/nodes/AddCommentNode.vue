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
      <div class="node-description">
        {{ data.comment }}
      </div>
    </div>
    <!-- Add the "+" button below the Add Comment node -->
    <AddNodeButton
      :parentId="validParentId"
      @open-modal="openCreateNodeModal"
      class="add-button"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AddNodeButton from './AddNodeButton.vue' // Import the AddNodeButton component

export default defineComponent({
  components: {
    AddNodeButton,
  },
  props: {
    data: {
      type: Object,
      required: true, // Ensure data is required
    },
  },
  computed: {
    title() {
      return this.data.name || 'Default Comment Title' // Fallback title
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
      console.log('AddCommentNode parentId:', parentId)
      this.$emit('open-create-node-modal', { parentId }) // Emit event with parentId
    },
  },
})
</script>
