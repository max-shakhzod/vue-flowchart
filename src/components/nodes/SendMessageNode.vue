<!-- src/components/nodes/SendMessageNode.vue -->

<template>
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
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    data: Object,
  },

  computed: {
    title() {
      return this.data.name === 'Away Message'
        ? 'Away Message'
        : 'Welcomeeee Message'
    },
    description() {
      // Only show the description if there's no attachment
      const textMessages =
        this.data.payload
          .filter(item => item.type === 'text')
          .map(item => item.text)
          .join(', ') || 'No message available.'
      return textMessages
    },
    attachment() {
      // Get the attachment URL if it exists
      const attachmentItem = this.data.payload.find(
        item => item.type === 'attachment',
      )
      return attachmentItem ? attachmentItem.attachment : null
    },
  },
})

// Use markRaw to prevent reactivity for components in your nodeTypes if needed
</script>
