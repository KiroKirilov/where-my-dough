<!-- Template -->
<template>
  <nav id="sidebar">
    <SideNavLink class="sidebar-link" to="/" title="Home" iconName="home" />
    <hr class="side-nav-separator" />
    <SideNavLink class="sidebar-link" to="/categories" title="Categories" iconName="labels" />
    <SideNavLink class="sidebar-link" to="/my-route" title="My Route" />
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
  width: $sideNavWidth;
  position: fixed;
  bottom: 0;
  left: 0;
  height: calc(100vh - #{$titleBarHeight});
  z-index: 999;
  background: $dark;
  color: $body-color;
  display: flex;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  .sidebar-link {
    margin: 5px 0;
  }
}

.sidebar-link:first-child {
  margin-top: 0px !important;
}

.side-nav-separator {
  width: 75%;
  margin: 2.5px auto;
  border: none;
  height: 2px;
  background-color: $light;
}
</style>
