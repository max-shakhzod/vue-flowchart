<!-- src/components/ui/NodeDetailsDrawer.vue -->

<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    role="dialog"
    :class="{ show }"
    :style="{ display: show ? 'block' : 'none' }"
    aria-labelledby="offcanvasLabel"
  >
    <div class="offcanvas-header">
      <div class="header-content">
        <img :src="iconUrl" alt="Node Icon" class="node-icon" />
        <h5 id="offcanvasLabel" class="node-title">{{ nodeData.name }}</h5>
      </div>
      <button
        type="button"
        class="btn-close text-reset"
        aria-label="Close"
        @click="hideDrawer"
      ></button>
    </div>
    <div class="offcanvas-body">
      <form @submit.prevent="updateNode">
        <div class="mb-3">
          <label for="nodeName" class="form-label">Node Name</label>
          <input
            type="text"
            class="form-control"
            id="nodeName"
            v-model="nodeData.name"
          />
        </div>

        <!-- Conditional rendering based on node type -->
        <div v-if="nodeData.type === 'sendMessage'">
          <h6 class="form-heading">Message Texts</h6>
          <div
            v-for="(text, index) in nodeData.data.payload"
            :key="index"
            class="mb-3"
          >
            <input type="text" class="form-control" v-model="text.text" />
            <button
              type="button"
              class="btn btn-danger"
              @click="removeText(index)"
            >
              Remove
            </button>
          </div>
          <button type="button" class="btn btn-secondary" @click="addText">
            Add Text
          </button>

          <h6 class="form-heading">Attachments</h6>
          <div v-if="attachments.length">
            <div
              v-for="(attachment, index) in attachments"
              :key="index"
              class="attachment-preview"
            >
              <img :src="attachment.attachment" alt="Attachment" />
              <button
                type="button"
                class="btn btn-danger"
                @click="removeAttachment(index)"
              >
                Remove
              </button>
            </div>
          </div>
          <input type="file" @change="uploadAttachment" />
        </div>

        <div v-else-if="nodeData.type === 'addComment'">
          <h6 class="form-heading">Comment</h6>
          <input
            type="text"
            class="form-control"
            v-model="nodeData.data.comment"
          />
        </div>

        <div v-else-if="nodeData.type === 'dateTime'">
          <h6 class="form-heading">Business Hours</h6>
          <div v-for="(time, index) in nodeData.data.times" :key="index">
            <input
              type="text"
              v-model="time.startTime"
              placeholder="Start Time"
            />
            <input type="text" v-model="time.endTime" placeholder="End Time" />
            <span>{{ time.day }}</span>
          </div>
        </div>

        <div class="button-group">
          <button type="button" class="btn btn-danger" @click="deleteNode">
            Delete Node
          </button>
          <button type="submit" class="btn btn-primary">Update Node</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import { useFlowStore } from '../../stores/useFlowStore'
import commentIcon from '../../assets/icons/comment-icon.svg'
import messageIcon from '../../assets/icons/message-icon.svg'
import timeIcon from '../../assets/icons/datetime-icon.svg'

const iconMapping = {
  sendMessage: messageIcon,
  addComment: commentIcon,
  dateTime: timeIcon,
}

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    nodeId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const flowStore = useFlowStore()
    const { nodeId } = toRefs(props)

    const nodeData = computed(() => {
      return flowStore.getNodeById(nodeId.value) || {}
    })

    const iconUrl = computed(() => {
      return iconMapping[nodeData.value.type]
    })

    const attachments = computed(() => {
      return (
        nodeData.value.data.payload.filter(
          item => item.type === 'attachment',
        ) || []
      )
    })

    const hideDrawer = () => {
      emit('update:show', false)
    }

    const updateNode = () => {
      flowStore.updateNode(nodeData.value)
      hideDrawer()
    }

    const addText = () => {
      nodeData.value.data.payload.push({ type: 'text', text: '' })
    }

    const removeText = index => {
      nodeData.value.data.payload.splice(index, 1)
    }

    const uploadAttachment = event => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = e => {
          nodeData.value.data.payload.push({
            type: 'attachment',
            attachment: e.target.result,
          })
        }
        reader.readAsDataURL(file)
      }
    }

    const removeAttachment = index => {
      nodeData.value.data.payload = nodeData.value.data.payload.filter(
        (item, i) => i !== index,
      )
    }

    const deleteNode = () => {
      flowStore.deleteNode(nodeData.value.id)
      hideDrawer()
    }

    return {
      nodeData,
      iconUrl,
      hideDrawer,
      updateNode,
      addText,
      removeText,
      uploadAttachment,
      removeAttachment,
      deleteNode,
      attachments,
    }
  },
})
</script>

<style scoped>
.offcanvas-header {
  display: flex;
  align-items: flex-start; /* Align items to the top */
}

.header-content {
  display: flex;
  align-items: flex-start; /* Align items to the top */
}

.node-title {
  font-size: 1.25rem; /* Title font size */
  margin: 0; /* Remove default margin */
  align-self: flex-start; /* Align title to the top */
}

.node-icon {
  max-width: 30px;
  margin-right: 10px;
  margin-top: 3px; /* Adjust vertical alignment of the icon */
}

.form-label,
.form-heading {
  font-size: 1rem; /* Consistent font size for labels and headings */
  margin-bottom: 0.5rem; /* Space below labels and headings */
  display: block; /* Ensure full-width display */
  text-align: left; /* Left align text */
}

.attachment-preview {
  display: flex;
  align-items: center;
}

.attachment-preview img {
  max-width: 50px;
  margin-right: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
