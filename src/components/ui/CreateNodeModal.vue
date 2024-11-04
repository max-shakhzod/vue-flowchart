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
                :readonly="nodeType === 'sendMessage'"
                required
              />
            </div>
            <div class="form-group">
              <label for="nodeDescription">Description</label>
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
              <div class="input-group">
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
                <span class="arrow-icon">
                  <img src="@/assets/icons/arrow-down.svg" alt="Arrow down" />
                </span>
              </div>
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
            <div
              v-if="nodeType === 'sendMessage' && messageSubtype === 'welcome'"
              class="form-group"
            >
              <label for="attachment">Attachment</label>
              <input
                type="file"
                class="form-control"
                id="attachment"
                @change="handleAttachment"
              />
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

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      nodeTitle: 'Send Message', // Default title based on type
      nodeDescription: '',
      nodeType: 'sendMessage',
      messageSubtype: 'away', // Default subtype for sendMessage
      errorMessage: '',
      attachment: null, // To handle file input for attachments
    }
  },
  methods: {
    hideModal() {
      this.$emit('close') // Emit close event to parent
    },
    updateTitle() {
      // Update title based on nodeType and messageSubtype
      if (this.nodeType === 'sendMessage') {
        this.nodeTitle =
          this.messageSubtype === 'away' ? 'Away Message' : 'Welcome Message'
      } else if (this.nodeType === 'addComment') {
        this.nodeTitle = 'Add Comment'
      } else if (this.nodeType === 'businessHours') {
        this.nodeTitle = 'Business Hours'
      }
    },
    handleAttachment(event) {
      this.attachment = event.target.files[0]
    },
    createNode() {
      if (!this.nodeTitle || !this.nodeDescription) {
        this.errorMessage = 'Title and Description are required.'
        return
      }

      const newNode = {
        id: uuidv4(),
        title: this.nodeTitle,
        description: this.nodeDescription,
        type: this.nodeType,
        data: {
          payload: [],
          attachment: this.attachment,
        },
      }

      // Adjust data for business hours
      if (this.nodeType === 'businessHours') {
        newNode.type = 'dateTime' // Match payload structure for business hours
        newNode.data.times = []
      }

      this.$emit('create', newNode) // Emit the new node data to parent
      this.hideModal() // Close the modal
      this.resetFields() // Clear the input fields
    },
    resetFields() {
      this.nodeTitle = 'Send Message'
      this.nodeDescription = ''
      this.nodeType = 'sendMessage'
      this.messageSubtype = 'away'
      this.errorMessage = ''
      this.attachment = null // Clear attachment
    },
  },
}
</script>

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
