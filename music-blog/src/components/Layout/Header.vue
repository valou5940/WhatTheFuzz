<template>
  <div class="row main-header">
    <div class="col-12">
      <h1>Titre provisoire</h1>
      <div class="main-menu">
        <Navbar @sortByArtist="sortByArtist()" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './Navbar';

export default {
  name: 'Header',
  components: { Navbar }
};
</script>

<style scoped>
.main-header {
  min-height: 200px;
}

.main-menu {
  margin-top: 50px;
}

.tabs {
  border: 1px solid white;
  background-color: rgb(31, 134, 230, 0.5);
}

a {
  color: white !important;
}
</style>