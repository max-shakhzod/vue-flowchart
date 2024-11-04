// src/store/useFlowStore.js

import { defineStore } from 'pinia'
import nodesData from '@/data/payload.json'
import { v4 as uuidv4 } from 'uuid'

export const useFlowStore = defineStore('flow', {
  state: () => ({
    elements: [],
  }),

  actions: {
    loadElements() {
      this.elements = nodesData.map(node => ({
        id: node.id || uuidv4(), // Generate an ID if not present in the payload
        type: node.type,
        data: node.data,
        parentId: node.parentId || null, // Default to null if parentId is missing
        name: node.name,
      }))
    },
    addNode(node) {
      const newNode = {
        ...node,
        id: node.id || uuidv4(),
        parentId: node.parentId || null,
      }
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
