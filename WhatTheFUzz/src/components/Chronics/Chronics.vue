<template>
  <div class="row">
    <!-- <div class="col-12"> -->
    <!-- <div class="col-12"> -->
    <!-- <div class="row"> -->
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
                ></b-card-img>
                <b-card-text class="card-details">
                  <div v-if="!chronic.displayContent">
                    <!-- <span>{{ chronic.name }}</span> -->
                    <h6>{{ chronic.name }}</h6>
                    <span>{{ chronic.content }}</span>
                  </div>
                  <div v-else>
                    <h6>
                      <router-link to="/chronic/:id">
                        <span>{{ chronic.bandName }}</span>
                        <br />-
                        <br />
                        <span>{{ chronic.discName }}</span>
                      </router-link>
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
      <Pagination @show-more="fetchNextChronics()" :no-more-results="noMoreResults" />
    </div>
  </div>

  <!-- </div> -->
  <!--</div>-->
</template>

<script>
import Pagination from './Pagination';
import moment from 'moment';
import store from '../../store/store';

export default {
  name: 'Chronics',
  data: function() {
    return { chronicsList: null, rangeMax: 10, noMoreResults: false };
  },
  components: { Pagination },
  computed: {
    sortChronicsByArtists() {
      console.log(this.$store.state.sortChronicsByArtists);
      return this.$store.state.sortChronicsByArtists;
    }
  },
  methods: {
    fetchFirstChronics: function(range) {
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
          console.log(data);
          // this.chronicsList = data.chronics.sort(
          //   (a, b) =>
          //     parseFloat(new Date(b.date).getTime()) - parseFloat(new Date(a.date).getTime())
          // );
          this.chronicsList = data.chronics;
          this.chronicsList.splice().forEach(chronic => {
            chronic = Object.assign({}, chronic, { displayContent: false });
          });
          console.log(this.chronicsList);
        })
        .catch(err => {
          console.log(err);
        });
    },
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
            this.chronicsList = [...this.chronicsList, ...nextChronics];
            console.log(this.chronicsList);
          } else {
            this.noMoreResults = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    toggleDisplayContent: function(index) {
      let chronic = this.chronicsList[index];
      chronic = Object.assign({}, chronic, (chronic.displayContent = !chronic.displayContent));
      this.chronicsList.splice(index, 1, chronic);
    },
    hideAll: function() {
      this.chronicsList.splice().forEach(chronic => {
        chronic = Object.assign({}, chronic, { displayContent: false });
      });
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
/* .card-columns {
  column-count: 4;
} */
/* @media (min-width: 576px) {
  .card-columns {
    -webkit-column-count: 4;
    -moz-column-count: 4;
    column-count: 4;
    display: inline-block;
  }
} */

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
  /* margin: 5%; */
  /* background-color: rgba(238, 203, 203, 0.336); */
  /* min-width: 250px; */

  border: none;
  border-radius: 0 !important;
  box-shadow: 3px 3px 10px 0 rgb(163, 157, 157);
}

.card-body {
  /* margin: 10px 0 10px 0;  */
  padding: 0 !important;
}

.card-group {
  margin-left: 25px;
  margin-right: 25px;
}

.col-half-offset {
  margin: 15px 1.4% 15px 1.4%;
}

/* .card-img {
  width: 250px;
  height: 250px;
} */
.shift {
  margin-top: 15px;
  /* background-color: rgba(179, 109, 109, 0.342); */
}

.unshift {
  margin-top: -15px;
  /* margin-bottom: 50px; */
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