<!-- src/views/FlowChartView.vue -->

<template>
  <div class="flow-chart-container">
    <div class="flow-chart-header">
      <button
        type="button"
        class="btn btn-primary mb-3"
        @click="openCreateNodeModal({ parentId: null })"
      >
        Create New Node
      </button>
    </div>

    <div class="flow-chart-view">
      <vue-flow
        @node-click="openDrawer"
        @nodeDragStart="onNodeDrag"
        @nodeDrag="onNodeDrag"
        @nodeDragStop="onNodeDrag"
        @connect="onConnect"
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
      if (flowStore.loadElements) {
        flowStore.loadElements()
        updateNodesAndEdges(flowStore.elements || [])
      } else {
        console.error('flowStore.loadElements is not defined')
      }
    })

    watch(
      () => flowStore.elements,
      newElements => {
        updateNodesAndEdges(newElements || [])
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

      if (newNode.parentId) {
        edges.value.push({
          id: `e${newNode.parentId}-${newNode.id}`,
          source: newNode.parentId.toString(),
          target: newNode.id,
          animated: true,
        })
      }
    }

    const onNodeDrag = event => {
      console.log('Node is being dragged:', event)
    }

    const onConnect = ({ source, target }) => {
      if (source && target) {
        edges.value.push({
          id: `e${source}-${target}`,
          source,
          target,
          animated: true,
        })
      } else {
        console.warn('Invalid connection:', source, target)
      }
    }

    const openDrawer = ({ node }) => {
      if (['sendMessage', 'addComment', 'dateTime'].includes(node.type)) {
        selectedNodeId.value = node.id
        showNodeDrawer.value = true
      }
    }

    const openCreateNodeModal = () => {
      showCreateNodeModal.value = true
    }

    return {
      nodes,
      edges,
      nodeTypes,
      showCreateNodeModal,
      showNodeDrawer,
      selectedNodeId,
      openDrawer,
      handleCreateNode,
      openCreateNodeModal,
      onNodeDrag,
      onConnect,
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

.flow-chart-header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
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
