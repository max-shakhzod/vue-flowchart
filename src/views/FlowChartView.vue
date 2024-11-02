<!-- src/views/FlowChartView.vue -->

<template>
  <div class="flow-chart-view">
    <button
      type="button"
      class="btn btn-primary"
      @click="showCreateNodeModal = true"
    >
      Create New Node
    </button>

    <vue-flow
      @node-click="openDrawer"
      @nodeDragStart="onNodeDrag"
      @nodeDrag="onNodeDrag"
      @nodeDragStop="onNodeDrag"
      :nodes="nodes"
      :edges="edges"
      :node-types="nodeTypes"
      :edge-options="{ type: 'straight' }"
    >
      <Background pattern-color="#aaa" :gap="8" />
    </vue-flow>

    <CreateNodeModal v-model:show="showCreateNodeModal" />
    <NodeDetailsDrawer
      v-if="selectedNodeId"
      :show="showNodeDrawer"
      :nodeId="selectedNodeId"
      @update:show="showNodeDrawer = false"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, markRaw } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import TriggerNode from '../components/nodes/TriggerNode.vue'
import SendMessageNode from '../components/nodes/SendMessageNode.vue'
import BusinessHoursNode from '../components/nodes/BusinessHoursNode.vue'
import DateTimeConnectorNode from '../components/nodes/DateTimeConnectorNode.vue'
import AddCommentNode from '../components/nodes/AddCommentNode.vue'
import CreateNodeModal from '@/components/ui/CreateNodeModal.vue'
import NodeDetailsDrawer from '@/components/ui/NodeDetailsDrawer.vue'
// import payload from '../data/payload.json'
import { useFlowStore } from '../stores/useFlowStore'

export default defineComponent({
  name: 'FlowChartView',
  components: {
    VueFlow,
    Background,
    CreateNodeModal,
    NodeDetailsDrawer,
  },
  setup() {
    const nodes = ref([])
    const edges = ref([])
    const showCreateNodeModal = ref(false)
    const showNodeDrawer = ref(false)
    const selectedNodeId = ref(null)

    const flowStore = useFlowStore()

    const nodeTypes = {
      trigger: markRaw(TriggerNode),
      sendMessage: markRaw(SendMessageNode),
      dateTime: markRaw(BusinessHoursNode),
      dateTimeConnector: markRaw(DateTimeConnectorNode),
      addComment: markRaw(AddCommentNode),
    }

    const positionMap = {
      1: { x: 400, y: 50 }, // Trigger Node
      d09c08: { x: 400, y: 200 }, // Business Hours Node
      '161f52': { x: 200, y: 300 }, // Success Node
      '28c4b9': { x: 750, y: 300 }, // Failure Node
      b0653a: { x: 125, y: 400 }, // Welcome Message Node
      b6a0c1: { x: 675, y: 400 }, // Away Message Node
      e879e4: { x: 675, y: 550 }, // Add Comment Node
    }

    onMounted(() => {
      flowStore.loadElements() // Load elements from the store
      const elements = flowStore.elements || []

      if (!Array.isArray(elements) || elements.length === 0) {
        console.error('Payload is empty or not an array:', elements)
        return
      }

      nodes.value = elements.map(({ id, type, data }) => ({
        id,
        type,
        data,
        position: positionMap[id] || { x: 0, y: 0 },
      }))

      edges.value = elements
        .filter(({ parentId }) => parentId !== -1)
        .map(({ id, parentId }) => ({
          id: `e${parentId}-${id}`,
          source: parentId.toString(),
          target: id,
          animated: true,
        }))
    })

    const onNodeDrag = event => {
      console.log('Node is being dragged:', event)
    }

    const openDrawer = ({ node }) => {
      // Access the actual node data
      const nodeData = node // This should contain the actual node info
      console.log('Clicked node data:', nodeData) // Log the actual node data

      selectedNodeId.value = nodeData.id // Set the selectedNodeId
      showNodeDrawer.value = true // Open the drawer
    }

    return {
      nodes,
      edges,
      nodeTypes,
      onNodeDrag,
      showCreateNodeModal,
      showNodeDrawer,
      selectedNodeId,
      openDrawer,
    }
  },
})
</script>

<style scoped>
.flow-chart-view {
  width: 100%;
  height: 90vh;
  background-color: #fbfbfb;
}
</style>
