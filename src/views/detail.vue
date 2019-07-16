<template>
    <transition name="detail">
        <div class="detail" v-if="movie">
            <div class="detail__backdrop" v-if="movie.backdrop_path" :style="{ backgroundImage: `url(http://image.tmdb.org/t/p/w1280${movie.backdrop_path})`}" />
            <div class="container">
                <router-link :to="{name: 'home'}" class="material-icons detail__close">close</router-link>
                <MovieItem :movie="movie" isDetail />

                <section class="detail__cast">
                    <h3>Cast</h3>
                    <Cast :movieId="movie.id" />
                </section>

            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';

import MovieList from '@/components/MovieList.vue';
import MovieItem from '@/components/MovieItem.vue';
import { Movie } from '../models/Movie.model';
import { movieService } from '../services';
import Cast from '@/components/CastList.vue';
@Component({
  components: {
    MovieList,
    MovieItem,
    Cast
  }
})
export default class MovieView extends Vue {
    movie: Partial<Movie> = null;
    searchQuery : string = '';
    created() {
        if(this.$route.params.movie){
            this.movie = this.$route.params.movie as Object;
        }
        this.getMovie(this.$route.params.id);
    }
    async getMovie(id: string){
        try {

            this.movie = await movieService.getMovie(id);
        } catch (error) {
            throw Error(error);
        }
    }
}
</script>

<style lang="scss">
    .detail {
        position: relative;

        .container {
            $bg-color: var(--primary-color);
            background-color: rgba(var(--primary-rgb), 0.8);
            z-index: 9;
            position: relative;
            top: 200px;
            padding-top: 25px;
            padding-bottom: 100px;
        }

        &__backdrop {
            height: 500px;
            background-size: cover;
            background-position: center;
            width: 100%;
            position: absolute;
            top: 0;
            opacity: 0.6;
            z-index: 0;
            transition: all 0.7s;
            // opacity: 0;
            &:after{
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 20%;
                background: linear-gradient(transparent, var(--primary-color) 70%);
            }
        }

        &__close{
            color: #FFF;
            text-decoration: none;
            text-align: right;
            margin-right: 30px;
        }

        &__cast{
            margin-top: 20px;
        }

        &-enter-active, &-leave-active {
            transition: all .3s;
            transform: translateY(0px);

        }

        &-leave-to {
            opacity: 0;
            transform: translateY(-50px);
        }
        &-enter {
            transform: translateY(50px);
            opacity: 0;

            .detail__backdrop{
                opacity: 0;
            }
        }
    }



</style>
