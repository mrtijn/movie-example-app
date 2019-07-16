<template>
  <div id="app">
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>

  </div>
</template>

<script>
import Vue from 'vue';
import { Watch } from "vue-property-decorator";

export default {
  computed:{
    transitionName(){
      if(this.$route.name){
        return this.$route.name;
      }else {
        return 'fade';
      }

    }
  }
}
</script>


<style lang="scss">
  // :root {
  //   --primary-color : #FFF;
  //   --text-color: #333;
  // }

  // @media (prefers-color-scheme: dark) {
    :root {
      --primary-color : #191919;
      --primary-rgb: 25,25,25;
      --primary-color-light: #3c3c3c;
      --text-color: #FFF;
    }
  // }
  html,body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    height: auto;
    background-color: var(--primary-color);
  }

  #app {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--text-color);

    height: 100%;
    // min-height: 100%;
    position: relative;
  }

  * {
    box-sizing: border-box;
  }

  .container {
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }



.fade {
  &-enter-active, &-leave-active {
    transition: all .8s;
  }
  &-enter, &-leave-to{
    opacity: 0;
  }
}

.fadeSwitchVertical {
  &-enter-active, &-leave-active {
    transition: all .2s;
    transform: translateY(0px);
  }
  &-enter{
    transform: translateY(50px);
    opacity: 0;
  }
  &-leave-to{
    opacity: 0;
    transform: translateY(-50px);
  }
}


</style>
