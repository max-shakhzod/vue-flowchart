<!-- src/views/FlowChartView.vue -->

<template>
  <div class="flow-chart-container">
    <div class="flow-chart-view">
      <vue-flow
        @node-click="openDrawer"
        @nodeDragStart="onNodeDrag"
        @nodeDrag="onNodeDrag"
        @nodeDragStop="onNodeDrag"
        :nodes="nodes"
        :edges="edges"
        :node-types="nodeTypes"
        :edge-options="{ type: 'straight' }"
        fit-view
      >
        <Background pattern-color="#aaa" :gap="12" />
      </vue-flow>
    </div>

    <CreateNodeModal
      :show="showCreateNodeModal"
      @close="showCreateNodeModal = false"
      @create="handleCreateNode"
      :parentId="currentParentId"
    />

    <NodeDetailsDrawer
      v-if="selectedNodeId"
      :show="showNodeDrawer"
      :nodeId="selectedNodeId"
      @update:show="showNodeDrawer = false"
    />
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, markRaw, watch } from 'vue'
import { VueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import TriggerNode from '../components/nodes/TriggerNode.vue'
import SendMessageNode from '../components/nodes/SendMessageNode.vue'
import BusinessHoursNode from '../components/nodes/BusinessHoursNode.vue'
import DateTimeConnectorNode from '../components/nodes/DateTimeConnectorNode.vue'
import AddCommentNode from '../components/nodes/AddCommentNode.vue'
import CreateNodeModal from '@/components/ui/CreateNodeModal.vue'
import NodeDetailsDrawer from '@/components/ui/NodeDetailsDrawer.vue'
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
    const currentParentId = ref(null)

    const flowStore = useFlowStore()

    const nodeTypes = {
      trigger: markRaw(TriggerNode),
      sendMessage: markRaw(SendMessageNode),
      dateTime: markRaw(BusinessHoursNode),
      dateTimeConnector: markRaw(DateTimeConnectorNode),
      addComment: markRaw(AddCommentNode),
    }

    const positionMap = {
      1: { x: 400, y: 50 },
      d09c08: { x: 400, y: 200 },
      '161f52': { x: 200, y: 300 },
      '28c4b9': { x: 750, y: 300 },
      b0653a: { x: 125, y: 400 },
      b6a0c1: { x: 675, y: 400 },
      e879e4: { x: 675, y: 600 },
    }

    onMounted(() => {
      flowStore.loadElements()
      updateNodesAndEdges(flowStore.elements)
    })

    watch(
      () => flowStore.elements,
      newElements => {
        updateNodesAndEdges(newElements)
      },
      { immediate: true },
    )

    function updateNodesAndEdges(elements) {
      nodes.value = elements.map(({ id, type, name, data }) => ({
        id,
        type,
        data: { ...data, name },
        position: positionMap[id] || { x: 0, y: 0 },
      }))

      edges.value = elements
        .filter(({ parentId }) => parentId && parentId !== -1)
        .map(({ id, parentId }) => ({
          id: `e${parentId}-${id}`,
          source: parentId.toString(),
          target: id,
          animated: true,
        }))
    }

    function handleCreateNode(newNode) {
      flowStore.addNode(newNode)
      updateNodesAndEdges(flowStore.elements)
    }

    const onNodeDrag = event => {
      console.log('Node is being dragged:', event)
    }

    const openDrawer = ({ node }) => {
      if (node.type === 'trigger') {
        openCreateNodeModal(node.id) // Pass the trigger node's ID directly
      } else if (node.type === 'sendMessage' || node.type === 'addComment') {
        return // Do not open the modal for these node types
      } else {
        selectedNodeId.value = node.id
        showNodeDrawer.value = true
      }
    }

    const openCreateNodeModal = parentId => {
      currentParentId.value = parentId || null // Set it directly
      showCreateNodeModal.value = true
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
      handleCreateNode,
      openCreateNodeModal,
      currentParentId,
    }
  },
})
</script>

<style scoped>
.flow-chart-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #fbfbfb;
}

.flow-chart-view {
  flex: 1;
  display: flex;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
</style>
