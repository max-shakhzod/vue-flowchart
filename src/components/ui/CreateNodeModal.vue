<!-- src/components/ui/CreateNodeModal.vue -->

<template>
  <div
    class="modal"
    tabindex="-1"
    role="dialog"
    :class="{ show: show }"
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
          <form>
            <div class="form-group">
              <label for="nodeTitle">Title</label>
              <input
                type="text"
                class="form-control"
                id="nodeTitle"
                v-model="nodeTitle"
              />
            </div>
            <div class="form-group">
              <label for="nodeDescription">Description</label>
              <input
                type="text"
                class="form-control"
                id="nodeDescription"
                v-model="nodeDescription"
              />
            </div>
            <div class="form-group">
              <label for="nodeType">Node Type</label>
              <div class="input-group">
                <select class="form-control" id="nodeType" v-model="nodeType">
                  <option value="sendMessage">Send Message</option>
                  <option value="addComment">Add Comments</option>
                  <option value="businessHours">Business Hours</option>
                </select>
                <img
                  src="@/assets/icons/arrow-down.svg"
                  alt="Arrow down"
                  class="arrow-icon"
                />
              </div>
            </div>
            <!-- Add more fields as necessary -->
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="hideModal">
            Close
          </button>
          <button type="button" class="btn btn-success" @click="createNode">
            Create Node
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      nodeTitle: '', // Define nodeTitle here
      nodeDescription: '', // Define nodeDescription here
      nodeType: 'sendMessage', // Set default nodeType
    }
  },
  methods: {
    hideModal() {
      this.$emit('update:show', false)
    },
    createNode() {
      // Implement create logic here
      console.log({
        title: this.nodeTitle,
        description: this.nodeDescription,
        type: this.nodeType,
      })
      // Optionally reset fields after creation
      this.nodeTitle = ''
      this.nodeDescription = ''
      this.nodeType = 'sendMessage'
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
</style>
