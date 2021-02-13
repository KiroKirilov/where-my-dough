<template>
  <div>
    <TitleBar />
  </div>
  <div id="main-app-wrapper">
    <SideNav />

    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import TitleBar from '@/components/layout/TitleBar.vue';
import SideNav from '@/components/layout/SideNav/SideNav.vue';
import ScrollbarHelpers from '@/common/helpers/ScrollbarHelpers';
import 'bootstrap/dist/js/bootstrap.bundle';

export default defineComponent({
  name: 'App',
  components: {
    TitleBar,
    SideNav
  },
  setup() {
    onMounted(() => {
      ScrollbarHelpers.initScrollbar('#content');
    });
  }
});
</script>

<style lang="scss">
//global styles
@import "./common/styles/_variables.scss";
@import "bootstrap/scss/bootstrap";
@import "./common/styles/_bootswatch.scss";
@import "./common/styles/constants.scss";
@import "./assets/material-design-iconic-font/css/material-design-iconic-font.min.css";

@import "./common/styles/mixins.scss";
@import "../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";

#main-app-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: $dark;
}

#content {
  position: absolute;
  overflow: hidden;
  top: $titleBarHeight;
  left: $sideNavWidth;
  height: calc(100vh - #{$titleBarHeight});
  width: calc(100vw - #{$sideNavWidth});
  background-color: $body-bg;
  border-top-left-radius: 10px;
}

.mCSB_draggerRail {
  @include transparentBackgroundColorMixin($gray-800, 0.6);
}

.mCSB_dragger_bar {
  background-color: $gray-900 !important;
}

// make bootstrap dialog faster
.show {
  transition: opacity 50ms;
}
</style>
