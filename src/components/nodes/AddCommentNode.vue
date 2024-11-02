<!-- src/components/nodes/AddCommentNode.vue -->

<template>
  <div class="node-container">
    <div class="node-header">
      <img
        src="@/assets/icons/comment-icon.svg"
        alt="Comment Icon"
        class="node-icon"
      />
      <span class="node-title">Add Comment</span>
    </div>
    <hr />
    <div class="node-description">
      {{ data.comment }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
}
</script>
