<template>
  <div>
    <ul v-if="movies.length" class="movies" ref="movies">
      <li v-for="movie in filteredMovies" :key="movie.id">
        <router-link class="movies__item" :to="{name: `detail`, params: {id: movie.id,  movie: movie}}">
          <movie-item :movie="movie" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import MovieItem from "./MovieItem.vue";

@Component({
  components: {
    MovieItem
  }
})
export default class MovieList extends Vue {
  @Prop()
  movies!: Array<any>

  get filteredMovies() {
    const movies = this.movies;
    return movies;
  }

  mounted(){
    this.enableScrollEffect();
  }

  @Watch('movies')
  enableScrollEffect(){
    this.$nextTick(() => {
      let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            entry.target.classList.add('animIn');
          }
        });
      },
      {rootMargin: "0px 0px -200px 0px"});

      let list : any = this.$refs.movies;
      if(list && list.childNodes.length) {
        list.childNodes.forEach((i: any) => { observer.observe(i)});
      }
    });
  }
}
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 960px;

  li {

    opacity: 0;


    &.animIn{
      animation: animIn 0.6s ease-out forwards;
    }
  }

  @keyframes animIn{
    0%{
      transform: translateY(100px);
      opacity: 0;
    }
    100%{
      transform: translateY(0px);
      opacity: 1;
    }
  }
}

.movies{
  &__item {
    color: inherit;
    text-decoration: none;
  }
}
</style>