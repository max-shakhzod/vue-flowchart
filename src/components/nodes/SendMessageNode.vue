<!-- src/components/nodes/SendMessageNode.vue -->

<template>
  <div class="node-wrapper">
    <div class="node-container">
      <div class="node-header">
        <img
          src="@/assets/icons/message-icon.svg"
          alt="Message Icon"
          class="node-icon"
          aria-hidden="true"
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
          <p>{{ description }}</p>
        </template>
      </div>
    </div>

    <AddNodeButton
      :parentId="validParentId"
      @open-modal="openCreateNodeModal"
      class="add-button"
      aria-label="Add a new node"
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
      const nodeName = this.data.name || 'Default Message Title'
      return nodeName === 'Away Message'
        ? 'Away Message'
        : nodeName === 'Welcome Message'
          ? 'Welcome Message'
          : nodeName
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
      return this.data.id != null ? this.data.id : -1
    },
  },
  methods: {
    openCreateNodeModal() {
      const parentId = this.validParentId
      console.log('SendMessageNode parentId:', parentId)
      this.$emit('open-modal', parentId)
    },
  },
})
</script>
