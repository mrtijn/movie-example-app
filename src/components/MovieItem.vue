<template>
  <article class="movie-item">
    <figure>
      <img
        v-if="movie.poster_path"
        :src="`http://image.tmdb.org/t/p/w185/${movie.poster_path}`"
        :alt="movie.name"
      />
      <img v-else src="https://via.placeholder.com/185x287.png?text=Unavailable" alt="None found" />
    </figure>
    <div class="movie-item__detail">
      <h3>{{ movie.title }}</h3>

      <i v-if="isDetailView">{{ movie.tagline }} </i>
      <p v-html="movie.overview"></p>
    </div>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Movie } from "../models/Movie.model";

@Component
export default class MovieItem extends Vue {
  @Prop()
  movie!: Movie;
  @Prop()
  isDetail!: Boolean

  get isDetailView(){
    if(this.$props.hasOwnProperty('isDetail')){
      return true;
    }
    return false;
  }
}
</script>


<style lang="scss" scoped>
.movie-item {
  display: flex;
  background-size: cover;

  &__detail {
    margin-top: 20px;
    text-align: left;

    h3 {
      font-weight: 700;
    }
    p {
      color: --text-color;
    }
  }
}
</style>