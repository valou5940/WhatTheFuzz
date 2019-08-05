<template>
  <div>
    <div v-if="chronicDetails">
      <h3>{{ chronicDetails.bandName }} - {{ chronicDetails.discName }}</h3>
      <br />
      <div class="row chronic-content">
        <div class="col-md-5 col-ld-4 col-sm-12 col-xs-12">
          <img :src="'http://localhost:5000/images/' + chronicDetails.imagePath" />
          <p>{{ chronicDetails.genre }}</p>
          <p>{{ chronicDetails.rating }}</p>
        </div>
        <div class="col-md-7 col-ld-8 col-sm-12 col-xs-12">
          <p class="chronic-text">{{ chronicDetails.content }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <Pagination
            @next-article="goToNextChronic()"
            @previous-article="goToPreviousChronic()"
            :disableNext="disableNext"
            :disablePrevious="disablePrevious"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '../Shared/Pagination';

export default {
  name: 'ChronicDetails',
  data: function() {
    return {
      chronicDetails: null,
      chronicId: this.$route.params.chronicId,
      disableNext: false,
      disablePrevious: false
    };
  },
  components: {
    Pagination
  },
  watch: {
    // call again the method if the route changes
    $route: 'fecthChronicDetails'
  },
  methods: {
    // get chronic details on click
    fecthChronicDetails: function() {
      // let chronicId = this.$route.params.chronicId;
      fetch(`http://localhost:5000/api/chronics/${this.chronicId}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          this.chronicDetails = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // switch to next chronic
    goToNextChronic: function() {
      const index = this.$store.state.chronicsId.findIndex(chronicId => {
        return this.chronicId === chronicId;
      });
      if (this.$store.state.chronicsId[index + 1] !== undefined) {
        this.disablePrevious = false;
        this.chronicId = this.$store.state.chronicsId[index + 1];
        this.$router.push({ path: `/chronics/${this.chronicId}` });
      } else {
        this.disableNext = true;
      }
    },
    // switch to previous chronic
    goToPreviousChronic: function() {
      const index = this.$store.state.chronicsId.findIndex(chronicId => {
        return this.chronicId === chronicId;
      });
      if (index - 1 >= 0) {
        this.disableNext = false;
        this.chronicId = this.$store.state.chronicsId[index - 1];
        this.$router.push({ path: `/chronics/${this.chronicId}` });
      } else {
        this.disablePrevious = true;
      }
    }
  },

  mounted: function() {
    this.fecthChronicDetails();
  }
};
</script>
<style scoped>
.chronic-content {
  margin-right: 5%;
  margin-left: 5%;
}
.chronic-text {
  text-align: left;
  /* white-space: nowrap; */
  overflow: auto;
}
</style>