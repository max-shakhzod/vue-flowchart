// src/store/useFlowStore.js

import { defineStore } from 'pinia'
import nodesData from '@/data/payload.json'

export const useFlowStore = defineStore('flow', {
  state: () => ({
    elements: [],
  }),

  actions: {
    loadElements() {
      // Define positions based on flowchart structure
      const positions = {
        1: { x: 200, y: 100 }, // Trigger
        d09c08: { x: 200, y: 250 }, // Business Hours
        '161f52': { x: 100, y: 400 }, // Success
        '28c4b9': { x: 300, y: 400 }, // Failure
        b0653a: { x: 100, y: 550 }, // Welcome Message
        b6a0c1: { x: 300, y: 550 }, // Away Message
        e879e4: { x: 200, y: 700 }, // Add Comment
      }

      this.elements = nodesData.map(node => ({
        id: node.id,
        type: node.type,
        data: node.data,
        position: positions[node.id] || { x: 0, y: 0 },
        parentId: node.parentId,
        name: node.name,
      }))
    },
  },
})
