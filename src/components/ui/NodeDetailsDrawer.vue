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
        <div class="mb-3">
          <label for="nodeDescription" class="form-label">Description</label>
          <input
            type="text"
            class="form-control"
            id="nodeDescription"
            v-model="nodeData.description"
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
          </div>

          <h6 class="form-heading">Attachments</h6>
          <div v-if="attachments.length">
            <div
              v-for="(attachment, index) in attachments"
              :key="index"
              class="attachment-preview mb-3"
            >
              <img :src="attachment.attachment" alt="Attachment" class="me-2" />
              <input
                type="text"
                class="form-control"
                :placeholder="`Attachment ${index + 1}`"
                v-model="attachment.name"
              />
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
          <div
            v-for="(time, index) in nodeData.data.times"
            :key="index"
            class="mb-2 d-flex align-items-center"
          >
            <span class="day-label">{{ time.day }}</span>
            <img
              src="@/assets/icons/clock.svg"
              alt="Clock"
              class="clock-icon"
            />
            <div class="time-container">
              <input
                type="time"
                v-model="time.startTime"
                class="form-control time-input"
                aria-label="Start Time"
              />
              <input
                type="time"
                v-model="time.endTime"
                class="form-control time-input"
                aria-label="End Time"
              />
            </div>
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
      const { name, description } = nodeData.value

      if (!name || !description) {
        alert('Title and Description are required!')
        return
      }

      flowStore.updateNode(nodeData.value)
      hideDrawer()
    }

    const uploadAttachment = event => {
      const file = event.target.files[0]

      if (file) {
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf']
        if (!validTypes.includes(file.type)) {
          alert('Invalid file type. Please upload a JPEG, PNG, or PDF file.')
          return
        }

        const reader = new FileReader()
        reader.onload = e => {
          nodeData.value.data.payload.push({
            type: 'attachment',
            attachment: e.target.result,
            name: file.name, // Store the name of the attachment
          })
        }
        reader.readAsDataURL(file)
      }
    }

    const deleteNode = () => {
      if (confirm('Are you sure you want to delete this node?')) {
        flowStore.deleteNode(nodeData.value.id)
        hideDrawer()
      }
    }

    return {
      nodeData,
      iconUrl,
      hideDrawer,
      updateNode,
      uploadAttachment,
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

.clock-icon {
  width: 16px;
  height: 16px;
  margin: 0 10px; /* Space between icon and inputs */
}

.time-container {
  display: flex;
  align-items: center; /* Center align inputs vertically */
  justify-content: flex-start; /* Align to the start */
  gap: 1px; /* Space between the two input fields */
  flex-grow: 1; /* Allow this container to grow */
}

.day-label {
  flex-basis: 40px; /* Fixed width for day labels */
  text-align: left; /* Left align day labels */
}

.time-input {
  width: 100px; /* Set input fields to a consistent width */
  padding: 5px; /* Add some padding for better usability */
  margin-right: 20px;
}

.button-group {
  display: flex;
  gap: 20px; /* Space between buttons */
  justify-content: center; /* Center buttons horizontally */
  align-items: center; /* Center buttons vertically */
  margin: 20px 0; /* Space above and below the button group */
}

.btn {
  padding: 10px 20px; /* Add padding to buttons for more space inside */
}
</style>
