src/views/FlowChartView.vue

<template>
  <div class="flow-chart-view">
    <vue-flow
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
import payload from '../data/payload.json' // Adjust the import path accordingly

export default defineComponent({
  name: 'FlowChartView',
  components: {
    VueFlow,
    Background,
  },
  setup() {
    const nodes = ref([])
    const edges = ref([])

    const nodeTypes = {
      trigger: markRaw(TriggerNode),
      sendMessage: markRaw(SendMessageNode),
      dateTime: markRaw(BusinessHoursNode),
      dateTimeConnector: markRaw(DateTimeConnectorNode),
      addComment: markRaw(AddCommentNode),
    }

    // Define fixed positions in a mapping object
    const positionMap = {
      1: { x: 400, y: 50 }, // Trigger Node
      d09c08: { x: 400, y: 200 }, // Business Hours Node
      '161f52': { x: 200, y: 300 }, // Success Node
      '28c4b9': { x: 750, y: 300 }, // Failure Node
      b0653a: { x: 112, y: 450 }, // Welcome Message Node
      b6a0c1: { x: 662, y: 400 }, // Away Message Node
      e879e4: { x: 662, y: 550 }, // Add Comment Node
    }

    onMounted(() => {
      try {
        // Load elements from the payload JSON
        const elements = payload || [] // Fallback to empty array if payload is falsy

        if (!Array.isArray(elements) || elements.length === 0) {
          console.error('Payload is empty or not an array:', elements)
          return // Exit early if the payload is invalid
        }

        // Create nodes from payload with specific positions
        nodes.value = elements.map(({ id, type, data }) => ({
          id,
          type,
          data,
          position: positionMap[id] || { x: 0, y: 0 }, // Default position if not found
        }))

        // Create edges based on parent-child relationships
        edges.value = elements
          .filter(({ parentId }) => parentId !== -1) // Filter out root node
          .map(({ id, parentId }) => ({
            id: `e${parentId}-${id}`, // Unique ID for the edge
            source: parentId.toString(),
            target: id,
            animated: true,
          }))
      } catch (error) {
        console.error('Error loading payload:', error)
      }
    })

    const onNodeDrag = event => {
      console.log('Node is being dragged:', event)
    }

    return {
      nodes,
      edges,
      nodeTypes,
      onNodeDrag,
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
