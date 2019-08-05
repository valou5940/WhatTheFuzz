<template>
  <div class="row">
    <div class="col-md-12">
      <b-card-group @mouseleave="hideAll()">
        <div class="row">
          <template v-for="(chronic, index) in chronicsList">
            <div
              :class="['col-md-2 col-xs-12 col-half-offset', {shift: index % 2 === 0 ,  unshift: (index) % 5 % 2 === 0 }]"
              :key="chronic.id"
            >
              <b-card
                @mouseenter="toggleDisplayContent(index)"
                @mouseleave="toggleDisplayContent(index)"
                :class="{'text-focus':  chronic.displayContent }"
              >
                <b-card-img
                  :class="{blurred: chronic.displayContent}"
                  width="100%"
                  height="100%"
                  :src="'http://localhost:5000/images/' + chronic.imagePath"
                  alt="Image"
                  @click="!chronic.diplayContent ? goToChronicDetails(chronic._id) : null"
                ></b-card-img>
                <b-card-text class="card-details">
                  <div v-if="!chronic.displayContent">
                    <!-- <span>{{ chronic.name }}</span> -->
                    <h6>{{ chronic.name }}</h6>
                    <span>{{ chronic.genre }}</span>
                  </div>
                  <div v-else>
                    <h6 @click="goToChronicDetails(chronic._id)">
                      <span>{{ chronic.bandName }}</span>
                      <br />-
                      <br />
                      <span>{{ chronic.discName }}</span>
                    </h6>
                    <span>{{ chronic.rating }}</span>
                  </div>
                </b-card-text>
                <div slot="footer">
                  <small class="text-muted">{{ chronic.date | date }}</small>
                </div>
              </b-card>
            </div>
          </template>
        </div>
      </b-card-group>
      <LoadMore @show-more="fetchNextChronics()" :no-more-results="noMoreResults" />
    </div>
  </div>
</template>

<script>
import LoadMore from './LoadMore';
import moment from 'moment';
import store from '../../store/store';
import { mapGetters } from 'vuex';

export default {
  name: 'Chronics',
  data: function() {
    return { chronicsList: null, chronicsId: [], rangeMax: 10, noMoreResults: false };
  },
  components: { LoadMore },
  computed: {
    // get sort type to perform from store when clicking navbar
    sortToPerform() {
      this.chronicsList = this.$store.getters.sortToPerform;
    }
  },
  methods: {
    // get 10 first chronics when going into chronics menu and store them
    fetchFirstChronics: function(range) {
      this.chronicsId = [];
      fetch(`http://localhost:5000/api/chronics?range=${range}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.chronicsList = data.chronics;
          this.chronicsList.splice().forEach(chronic => {
            chronic = Object.assign({}, chronic, { displayContent: false });
          });
          store.dispatch('addChronicsToList', { chronicsList: this.chronicsList });
          this.chronicsId = this.chronicsList.map(chronic => {
            return chronic._id;
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // get the 10th next chronics when clicking show more button, then add them to the chronics list
    fetchNextChronics: function() {
      this.rangeMax += 10;
      fetch(`http://localhost:5000/api/chronics?range=${this.rangeMax}`, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.chronics.length > 0) {
            let nextChronics = data.chronics;
            let nextChronicsId = data.chronics.map(chronic => {
              return chronic._id;
            });
            this.chronicsId = [...this.chronicsId, ...nextChronicsId];
            this.chronicsList = [...this.chronicsList, ...nextChronics];

            store.dispatch('addChronicsId', this.chronicsId);
            store.dispatch('addChronicsToList', this.chronicsList);
          } else {
            this.noMoreResults = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // show/hide chronic details
    toggleDisplayContent: function(index) {
      let chronic = this.chronicsList[index];
      chronic = Object.assign({}, chronic, (chronic.displayContent = !chronic.displayContent));
      this.chronicsList.splice(index, 1, chronic);
    },
    // force hiding chronics details
    hideAll: function() {
      this.chronicsList.splice().forEach(chronic => {
        chronic = Object.assign({}, chronic, { displayContent: false });
      });
    },
    // when clicking on the chronic, go to the chronic details thanks the route
    goToChronicDetails: function(chronicId) {
      store.commit('addChronicsId', this.chronicsId);
      this.$router.push({ path: `/chronics/${chronicId}` });
    }
  },
  mounted: function() {
    this.fetchFirstChronics(10);
  },
  filters: {
    date: function(value) {
      if (value !== undefined) {
        value = moment(value).format('DD/MM/YYYY');
      }
      return value;
    }
  }
};
</script>

<style scoped>
.card-details {
  font-size: 14px;
  height: 100px;
}

.text-muted {
  font-size: 11px;
}

.blurred {
  filter: grayscale(100%);
}
@media (min-width: 576px) {
  .card {
    min-width: 260px;
  }
}

@media (max-width: 1200px) {
  .card {
    min-width: 150px;
  }
}

.card {
  border: none;
  border-radius: 0 !important;
  box-shadow: 3px 3px 10px 0 rgb(163, 157, 157);
}

.card-body {
  padding: 0 !important;
}

.card-group {
  margin-left: 25px;
  margin-right: 25px;
}

.col-half-offset {
  margin: 15px 1.4% 15px 1.4%;
}

.shift {
  margin-top: 15px;
}

.unshift {
  margin-top: -15px;
}

h6 {
  font-size: 14px;
}

.card-details span {
  font-size: 12px;
}

.text-focus {
  box-shadow: 10px 10px 10px 0 rgba(163, 157, 157, 0.904);
}
</style>