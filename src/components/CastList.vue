<template>
  <div>
    <button class="btn-switch" :class="{ active: (this.type === 0)}" @click="type = 0">Actors</button>
    <button class="btn-switch" :class="{ active: (this.type === 1)}" @click="type = 1">Crew</button>
    <transition mode="out-in" tag="div"  name="fadeSwitchVertical">
        <div v-if="Persons"  style="transition-delay: 0.3s" class="actor" :key="type">
            <ul class="actor__list" >
                <li v-for="person in Persons" :key="person.credit_id">
                    <figure>
                      <img v-if="person.profile_path" :src="`http://image.tmdb.org/t/p/w185/${person.profile_path}`" :alt="person.name" />
                      <img v-else src="https://via.placeholder.com/185x287.png?text=Unavailable" alt="None found" />
                    </figure>
                    <figcaption>{{ person.name }}</figcaption>
                </li>

            </ul>
        </div>
    </transition>
  </div>


</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { movieService } from "../services";

enum viewType{
  cast = 0,
  crew  = 1
}

@Component
export default class ActorList extends Vue {
  actors: Array<any> = [];
  type: viewType = viewType.cast;
  data = {
    cast : [],
    crew: []
  };

  @Prop()
  movieId!: number;



  mounted() {
    this.getCast(this.movieId);
  }

  get Persons(){
    if(this.type === viewType.cast){
      return this.data.cast;
    } else {
      return this.data.crew;
    }
  }

  async getCast(id: number) {
    try {
      this.data = await movieService.getCast(id);

    } catch (error) {
      throw Error(error);
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-switch {
  background: none;
  color: #FFF;
  border: 0;
  font-weight: 700;
  margin-bottom: 20px;
  padding: 10px;
  cursor: pointer;
  &:focus {
    outline: 0;

  }

  &.active {
    border-bottom: 2px solid #FFF;
  }
}
.actor{

    &__list{
      height: 200px;
      padding: 0px 10px;
        display: flex;
        list-style: none;

        max-width: 100%;
        overflow-y:hidden;
        padding-bottom: 30px;
        li {
            display: flex;
            flex-direction: column;
            align-content: center;
            figure{
                margin: 0 10px;
            }
            img{
                max-width: 100px;
            }
        }

    }
}
</style>