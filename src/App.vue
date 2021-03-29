<template>
  <div>
    <TitleBar />
  </div>
  <div id="main-app-wrapper">
    <SideNav />

    <div id="content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TitleBar from '@/components/layout/TitleBar.vue';
import SideNav from '@/components/layout/SideNav/SideNav.vue';
import 'bootstrap/dist/js/bootstrap.bundle';

export default defineComponent({
  name: 'App',
  components: {
    TitleBar,
    SideNav
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
@import "./common/styles/functions.scss";
@import "../node_modules/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";

:root {
  --vdp-selected-bg-color: #{$primary};
  --vdp-bg-color: #{$gray-800};
  --vdp-text-color: $body-color;
  --vdp-heading-hover-color: none;
  --vdp-hover-bg-color: #{$primary};
}

.v3dp__elements button span {
  transition: 0.2s !important;
}

.v3dp__divider {
  margin-top: 5px !important;
}

.v3dp__popout {
  left: 50%;
  transform: translateX(-50%);
}

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

.mCSB_inside > .mCSB_container {
  margin-right: 15px !important;
}

.mCSB_scrollTools_vertical {
  margin-top: 10px !important;
  margin-bottom: 10px !important;
}

// make bootstrap dialog faster
.show {
  transition: opacity 50ms;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.month-picker {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

.month-picker-input-container {
  overflow: visible !important;

  input.month-picker-input {
    @extend .form-control;
  }
}

.month-picker__container {
  background-color: $dark !important;
  border-color: $dark !important;
}

.month-picker__month {
  background-color: $gray-800 !important;
  flex-basis: 33.333% !important;
  border-color: $dark !important;
  transition: 0.2s !important;

  &.selected {
    font-weight: bold;
    box-shadow: inset 0 0 3px $primary, 0px 2px 5px rgba(85, 176, 242, 0.2) !important;
    background: $primary !important;
  }
}

.month-picker__year {
  display: flex !important;
  align-items: center !important;
  justify-content: space-evenly !important;
  width: 100%;
  height: 50px !important;

  button {
    background-color: $gray-700 !important;
    border-color: $dark !important;
    color: $body-color !important;
    height: 38px !important;
    width: 50px !important;
    position: initial !important;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 5px;
    flex: initial !important;
  }

  p {
    flex: initial !important;
    width: 33.333% !important;
  }
}

.single-line-month-picker {
  width: 100% !important;

  .month-picker {
    flex-wrap: nowrap !important;
  }

  .month-picker__month {
    padding: 0.4rem 0.25rem !important;
  }

  .month-picker__year {
    height: 29px !important;
    justify-content: center !important;

    button {
      height: 21px !important;
      width: 32px !important;
      padding-bottom: 9px !important;
    }

    p {
      width: 18% !important;
    }
  }
}

.apexcharts-canvas svg {
  background-color: $gray-800 !important;
  border-radius: 5px;
  border: 1px solid $dark;
}
</style>
