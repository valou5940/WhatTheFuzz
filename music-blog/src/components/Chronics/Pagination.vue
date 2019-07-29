<template>
  <div class="pagination">
    <button @click="$emit('show-more')" :disabled="noMoreResults">Afficher plus de résultats</button>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: ['noMoreResults']
};
</script>
<style>
.pagination {
  display: inline-block;
}
</style>