// src/store/useFlowStore.js

import { defineStore } from 'pinia'
import nodesData from '@/data/payload.json'
import { v4 as uuidv4 } from 'uuid'

export const useFlowStore = defineStore('flow', {
  state: () => ({
    elements: JSON.parse(localStorage.getItem('flowElements')) || [],
  }),

  actions: {
    loadElements() {
      // Load from initial data or localStorage
      const initialNodes = nodesData.map(node => ({
        id: node.id || uuidv4(),
        type: node.type,
        data: node.data,
        parentId: node.parentId || null,
        name: node.name || 'Unnamed Node', // Default name if not present
      }))
      this.elements = initialNodes
      this.saveElements() // Save to localStorage
    },

    addNode(node) {
      const newNode = {
        ...node,
        id: uuidv4(), // Generate a new ID for the new node
        parentId: node.parentId || null,
      }

      this.elements.push(newNode)
      this.saveElements() // Save to localStorage
    },

    updateNode(updatedNode) {
      const index = this.elements.findIndex(node => node.id === updatedNode.id)
      if (index !== -1) {
        this.elements[index] = updatedNode
        this.saveElements() // Save to localStorage
      }
    },

    deleteNode(nodeId) {
      this.elements = this.elements.filter(node => node.id !== nodeId)
      this.saveElements() // Save to localStorage
    },

    getNodeById(nodeId) {
      return this.elements.find(node => node.id === nodeId)
    },

    saveElements() {
      localStorage.setItem('flowElements', JSON.stringify(this.elements)) // Persist to localStorage
    },
  },

  // Optional: Consider adding getters if you need to compute derived state
  getters: {
    // Example getter to get all nodes or specific filtered nodes
    allNodes: state => state.elements,
  },
})
