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
import SideNav from '@/components/layout/SideNav.vue';
import ScrollbarHelpers from '@/common/helpers/ScrollbarHelpers';

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
@import "../node_modules/bootstrap/scss/bootstrap";
@import "./common/styles/_bootswatch.scss";

@import "./common/styles/mixins.scss";
@import "../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";

#main-app-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
}

#content {
  position: absolute;
  overflow: hidden;
  top: 4vh;
  left: 6.25vw;
  height: 96vh;
  width: 93.75vw;
}

.mCSB_draggerRail {
  @include transparentBackgroundColorMixin($gray-800, 0.6);
}

.mCSB_dragger_bar {
  background-color: $gray-900 !important;
}
</style>
