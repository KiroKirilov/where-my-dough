<!-- Template -->
<template>
  <nav id="sidebar">
    <SideNavLink to="/" title="Home" />
    <SideNavLink to="/about" title="About" />
  </nav>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';
import SideNavLink from './SideNavLink.vue';

export default defineComponent({
  name: 'Side Nav',
  components: {
    SideNavLink
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../../common/styles/_variables.scss";
@import "../../../common/styles/constants.scss";

#sidebar {
    width: 6.25vw;
    position: fixed;
    bottom: 0;
    left: 0;
    height: calc(100vh - #{$titleBarHeight});
    z-index: 999;
    background: $dark;
    color: $body-color;
    display: flex;
    justify-content: center;
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}
</style>
