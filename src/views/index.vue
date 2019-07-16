<template>
    <div class="home container">
      <div class="searchbox">
        <input type="text" placeholder="Search movie.." v-model="searchQuery" @keydown.enter="searchMovies">
      </div>
      <movie-list :movies="movies" />
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

import MovieList from '@/components/MovieList.vue';
import { Movie } from '../models/Movie.model';
import { movieService } from '../services';

import { TweenMax} from 'gsap';

@Component({
  components: {
    MovieList
  }
})
export default class MovieView extends Vue {
  movies: Array<Movie> = [];
  searchQuery : string = '';
  created() {
    this.getMovies();

  }
  async getMovies(){
    try {
      this.movies = await movieService.getMovies();
    } catch (error) {
      throw Error(error);
    }
  }
  async searchMovies(){
    if(this.searchQuery.length === 0) {
      this.getMovies();
      return;
    }
    try {
      this.movies = await movieService.searchMovies(this.searchQuery);
    } catch (error) {
      throw Error(error);
    }
  }

  animations = {
    leave(el : Element, done : Function) {
      setTimeout(() => done(), 0);
      // TweenMax.to(el,100  , {autoAlpha :0, onComplete: () => done()});

    }
  }
}
</script>

<style lang="scss">

  .searchbox {
    padding: 20px;
    input {
      display: block;
      padding: 15px;
      border-radius: 3px;
      border: 1px solid var(--primary-color-light);
      width:30%;
      transition: all 0.4s ease-out;
      background-color: transparent;
      color: var(--text-color);
      &:focus {
        width: 100%;
        outline: 0;
      }
    }
  }
</style>
