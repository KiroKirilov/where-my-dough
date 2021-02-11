<!-- Template -->
<template>
  <nav id="sidebar">
    <router-link to="/">Home</router-link> <br />
    <router-link to="/about">About</router-link> <br />
    <router-link to="/my-route">MyRoute</router-link>
  </nav>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Side Nav'
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../common/styles/_variables.scss";
#sidebar {
    width: 6.25vw;
    position: fixed;
    bottom: 0;
    left: 0;
    height: calc(100vh - 26px);
    z-index: 999;
    background: $dark;
    color: $body-color;
}
</style>
