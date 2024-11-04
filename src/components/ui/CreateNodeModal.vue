<!-- src/components/ui/CreateNodeModal.vue -->

<template>
  <div
    class="modal"
    tabindex="-1"
    role="dialog"
    :class="{ show }"
    :style="{ display: show ? 'block' : 'none' }"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h6 class="modal-title mx-auto">Create Node</h6>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="hideModal"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createNode">
            <div class="form-group">
              <label for="nodeTitle">Title</label>
              <input
                type="text"
                class="form-control"
                id="nodeTitle"
                v-model="nodeTitle"
                required
              />
            </div>
            <div class="form-group">
              <label for="nodeDescription">Message</label>
              <input
                type="text"
                class="form-control"
                id="nodeDescription"
                v-model="nodeDescription"
                required
              />
            </div>
            <div class="form-group">
              <label for="nodeType">Node Type</label>
              <select
                class="form-control"
                id="nodeType"
                v-model="nodeType"
                @change="updateTitle"
              >
                <option value="sendMessage">Send Message</option>
                <option value="addComment">Add Comments</option>
                <option value="businessHours">Business Hours</option>
              </select>
            </div>
            <div v-if="nodeType === 'sendMessage'" class="form-group">
              <label for="messageSubtype">Message Type</label>
              <select
                class="form-control"
                id="messageSubtype"
                v-model="messageSubtype"
                @change="updateTitle"
              >
                <option value="away">Away Message</option>
                <option value="welcome">Welcome Message</option>
              </select>
            </div>
            <div class="text-danger" v-if="errorMessage">
              {{ errorMessage }}
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hideModal">
            Close
          </button>
          <button type="submit" class="btn btn-success" @click="createNode">
            Create Node
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { useFlowStore } from '@/stores/useFlowStore'

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      nodeTitle: 'Add Comment', // Default title
      nodeDescription: '',
      nodeType: 'addComment', // Default to 'Add Comments'
      messageSubtype: 'away', // Default subtype for sendMessage
      errorMessage: '',
    }
  },
  methods: {
    hideModal() {
      this.$emit('close')
    },
    updateTitle() {
      if (this.nodeType === 'sendMessage') {
        this.nodeTitle =
          this.messageSubtype === 'away' ? 'Away Message' : 'Welcome Message'
      } else if (this.nodeType === 'addComment') {
        this.nodeTitle = 'Add Comment'
      } else if (this.nodeType === 'businessHours') {
        this.nodeTitle = 'Business Hours'
      }
    },
    createNode() {
      // Check if required fields are filled
      if (!this.nodeTitle || !this.nodeDescription) {
        this.errorMessage = 'Title and Description are required.'
        return
      }

      const flowStore = useFlowStore()
      const existingTitles = flowStore.elements.map(node => node.data.name)

      let uniqueTitle = this.nodeTitle
      let count = 1

      while (existingTitles.includes(uniqueTitle)) {
        uniqueTitle = `${this.nodeTitle} (${count})`
        count++
      }

      const newNode = {
        id: uuidv4(),
        name: uniqueTitle,
        type: this.nodeType,
        data: {
          payload: [], // Initialize payload
        },
      }

      // Initialize payload based on node type
      if (this.nodeType === 'businessHours') {
        newNode.type = 'dateTime' // Change type for business hours
        newNode.data.times = [] // Initialize times
      } else if (this.nodeType === 'addComment') {
        newNode.data.comment = this.nodeDescription // Store description as comment
      } else if (this.nodeType === 'sendMessage') {
        newNode.data.payload.push({
          type: 'text',
          text: this.nodeDescription, // Use description as text for message
        })
      }

      this.$emit('create', newNode)
      this.hideModal()
      this.resetFields()
    },
    resetFields() {
      this.nodeTitle = 'Add Comment'
      this.nodeDescription = ''
      this.nodeType = 'addComment'
      this.messageSubtype = 'away'
      this.errorMessage = ''
    },
  },
}
</script>

<style scoped>
.text-danger {
  color: red;
}
</style>

<style scoped>
.modal-title {
  flex-grow: 1;
  text-align: center;
}

.form-group label {
  margin: 5px 0;
  text-align: left;
  display: block;
}

.input-group {
  position: relative;
}

.arrow-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  pointer-events: none;
}

.text-danger {
  color: red;
}
</style>
