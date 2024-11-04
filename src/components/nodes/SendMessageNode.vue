<!-- src/components/nodes/SendMessageNode.vue -->

<template>
  <div class="node-wrapper">
    <div class="node-container">
      <div class="node-header">
        <img
          src="@/assets/icons/message-icon.svg"
          alt="Message Icon"
          class="node-icon"
        />
        <span class="node-title">{{ title }}</span>
      </div>
      <hr />
      <div class="node-description">
        <template v-if="attachment">
          <p>Message:</p>
          <img :src="attachment" alt="Attachment" class="attachment-image" />
        </template>
        <template v-else>
          {{ description }}
        </template>
      </div>
    </div>
    <!-- Add the "+" button below the Send Message node -->
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
    title() {
      const nodeName = this.data.name
      return nodeName === 'Away Message'
        ? 'Away Message'
        : nodeName === 'Welcome Message'
          ? 'Welcome Message'
          : 'Default Message Title'
    },
    description() {
      const textMessages =
        this.data.payload
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join(', ') || 'No message available.'
      return textMessages
    },
    attachment() {
      const attachmentItem = this.data.payload.find(
        item => item.type === 'attachment',
      )
      return attachmentItem ? attachmentItem.attachment : null
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
      console.log('SendMessageNode parentId:', parentId)
      this.$emit('open-create-node-modal', { parentId })
    },
  },
})
</script>
