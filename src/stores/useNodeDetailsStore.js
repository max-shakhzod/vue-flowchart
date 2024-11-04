// src/store/useNodeDetailsStore.js

import { defineStore } from 'pinia'

export const useNodeDetailsStore = defineStore('nodeDetails', {
  state: () => ({
    currentNode: null,
  }),

  actions: {
    setNode(node) {
      this.currentNode = node
    },
    clearNode() {
      this.currentNode = null
    },
  },
})
