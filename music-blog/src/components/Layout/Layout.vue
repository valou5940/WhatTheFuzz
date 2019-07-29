<template>
  <div class="container-fluid">
    <Header />
    <!-- <SideNav /> -->
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue';
import SideNav from './SideNav.vue';
import Footer from './Footer.vue';

export default {
  name: 'Layout',
  components: {
    Header,
    SideNav,
    Footer
  }
};
</script>