<template>
  <div>
    <button @click="$emit('previous-article')" :disabled="disablePrevious">Previous</button>
    <button @click="$emit('next-article')" :disabled="disableNext">Next</button>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: ['disableNext', 'disablePrevious'],
  data: function() {
    return {};
  }
};
</script>
<style scoped>
</style>