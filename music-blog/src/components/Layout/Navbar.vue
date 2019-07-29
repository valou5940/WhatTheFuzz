<template>
  <b-navbar toggleable="md" class="chronic-bar">
    <b-navbar-brand>
      <router-link to="/news">Home</router-link>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <router-link to="/news">News</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/chronics" active>Chroniques</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/live-reports">Concerts</router-link>
        </b-nav-item>
        <b-nav-item>
          <router-link to="/misc">Divers</router-link>
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Rechercher"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Go!</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Trier par" right>
          <b-dropdown-item @click="sortChronicsByArtist">Artistes</b-dropdown-item>
          <b-dropdown-item href="#">Album</b-dropdown-item>
          <b-dropdown-item href="#">Genre</b-dropdown-item>
          <b-dropdown-item href="#">Date</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
import store from '../../store/store';
export default {
  name: 'Navbar',
  methods: {
    sortChronicsByArtist: function() {
      store.commit('setSortingChronicsByArtist');
    }
  }
};
</script>

<style>
.chronic-bar {
  background-color: rgb(222, 239, 247);
  border: 1px white solid;
  position: absolute;
  bottom: 0;
  border-radius: 5px;
}
</style>