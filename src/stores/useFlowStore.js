// src/store/useFlowStore.js
import { defineStore } from 'pinia'
import nodesData from '@/data/payload.json'

export const useFlowStore = defineStore('flow', {
  state: () => ({
    elements: [],
  }),

  actions: {
    loadElements() {
      this.elements = nodesData.map(node => ({
        id: node.id,
        type: node.type,
        data: node.data,
        parentId: node.parentId,
        name: node.name,
      }))
    },
    addNode(node) {
      const newNode = { ...node, id: Date.now().toString(), parentId: null }
      this.elements.push(newNode)
    },
    updateNode(updatedNode) {
      const index = this.elements.findIndex(node => node.id === updatedNode.id)
      if (index !== -1) this.elements[index] = updatedNode
    },
    deleteNode(nodeId) {
      this.elements = this.elements.filter(node => node.id !== nodeId)
    },
    getNodeById(nodeId) {
      return this.elements.find(node => node.id === nodeId)
    },
  },
})
