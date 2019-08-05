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

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Rechercher"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Go!</b-button>
        </b-nav-form>

        <b-nav-item-dropdown text="Trier par" right>
          <b-dropdown-item @click="sortChronics(sortByArtists)">Artistes</b-dropdown-item>
          <b-dropdown-item @click="sortChronics(sortByAlbum)">Album</b-dropdown-item>
          <!-- <b-dropdown-item href="#">Genre</b-dropdown-item> -->
          <b-dropdown-item @click="sortChronics(sortByDate)" href="#">Date</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
import store from '../../store/store';
export default {
  name: 'Navbar',
  data: function() {
    return { sortByDate: 'DATE_ASC', sortByArtists: 'ARTISTS_ASC', sortByAlbum: 'ALBUM_ASC' };
  },
  methods: {
    // send sorting type to the store
    sortChronics: function(type) {
      if (type === 'DATE_ASC') {
        this.sortByDate = 'DATE_DESC';
        type = this.sortByDate;
      } else if (type === 'DATE_DESC') {
        this.sortByDate = 'DATE_ASC';
        type = this.sortByDate;
      } else if (type === 'ARTISTS_ASC') {
        this.sortByArtists = 'ARTISTS_DESC';
        type = this.sortByArtists;
      } else if (type === 'ARTISTS_DESC') {
        this.sortByArtists = 'ARTISTS_ASC';
        type = this.sortByArtists;
      } else if (type === 'ALBUM_ASC') {
        this.sortByAlbum = 'ALBUM_DESC';
        type = this.sortByAlbum;
      } else if (type === 'ALBUM_DESC') {
        this.sortByAlbum = 'ALBUM_ASC';
        type = this.sortByAlbum;
      }
      store.commit('setSortingChronics', type);
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