<template>
  <div>
    <TitleBar />
  </div>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/my-route">My Route</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TitleBar from '@/components/layout/TitleBar.vue';

export default defineComponent({
  name: 'App',
  components: {
    TitleBar
  }
})
</script>

<style lang="scss">
//global styles
@import "./common/styles/_variables.scss";
@import "../node_modules/bootstrap/scss/bootstrap";
@import "./common/styles/_bootswatch.scss";
</style>
