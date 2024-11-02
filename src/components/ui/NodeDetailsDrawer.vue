<!-- src/components/ui/NodeDetailsDrawer.vue -->

<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    role="dialog"
    :class="{ show: show }"
    :style="{ display: show ? 'block' : 'none' }"
    aria-labelledby="offcanvasLabel"
  >
    <div class="offcanvas-header">
      <h5 id="offcanvasLabel">Node Details</h5>
      <button
        type="button"
        class="btn-close text-reset"
        aria-label="Close"
        @click="hideDrawer"
      ></button>
    </div>
    <div class="offcanvas-body">
      <form>
        <div class="mb-3">
          <label for="nodeId" class="form-label">Node ID</label>
          <input
            type="text"
            class="form-control"
            id="nodeId"
            v-model="nodeData.id"
            readonly
          />
        </div>
        <div class="mb-3">
          <label for="nodeName" class="form-label">Node Name</label>
          <input
            type="text"
            class="form-control"
            id="nodeName"
            v-model="nodeData.name"
          />
        </div>
        <button type="button" class="btn btn-primary" @click="updateNode">
          Update Node
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, toRefs } from 'vue'
import { useFlowStore } from '../../stores/useFlowStore'

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

    const hideDrawer = () => {
      emit('update:show', false) //Emit the event to close the drawer
    }

    const updateNode = () => {
      // Later for the update logic needs to be implemented in here
    }

    return { nodeData, hideDrawer, updateNode }
  },
})
</script>

<style scoped>
.form-label {
  margin: 5px 0;
  text-align: left;
  display: block;
}
</style>
