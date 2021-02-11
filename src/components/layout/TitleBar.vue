<!-- Template -->
<template>
  <header class="title-bar">
    <div class="drag-region">
      <div class="window-title">Where My Dough?</div>

      <div class="title-bar-buttons-container">
        <div v-on:click="minimize" class="title-bar-button">
          <window-minimize :size="16" />
        </div>

        <div v-on:click="unmaximize" v-if="isMaximized" class="title-bar-button">
          <window-restore :size="16" />
        </div>

        <div v-on:click="maximize" v-if="!isMaximized" class="title-bar-button">
          <window-maximize :size="16" />
        </div>

        <div v-on:click="close" class="close-button title-bar-button">
          <window-close :size="16" />
        </div>
      </div>
    </div>
  </header>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';
import WindowMinimize from 'vue3-material-design-icons/WindowMinimize.vue';
import WindowMaximize from 'vue3-material-design-icons/WindowMaximize.vue';
import WindowRestore from 'vue3-material-design-icons/WindowRestore.vue';
import WindowClose from 'vue3-material-design-icons/WindowClose.vue';
import { ipcRenderer } from 'electron';
import { TitleBarEventNames } from '@/electron/ipc/event-names/titleBarEventNames';
import useRefWithSetter from '@/composables/useRefWithSetter';

export default defineComponent({
  name: 'Title Bar',
  components: {
    WindowMinimize,
    WindowRestore,
    WindowMaximize,
    WindowClose
  },
  setup() {
    const [isMaximized, setIsMaximized] = useRefWithSetter(false);

    ipcRenderer.on(TitleBarEventNames.WAS_MAXIMIZED, () => {
      setIsMaximized(true);
    });

    ipcRenderer.on(TitleBarEventNames.WAS_UNMAXIMIZED, () => {
      setIsMaximized(false);
    });

    const minimize = () => {
      ipcRenderer.send(TitleBarEventNames.MINIMIZE);
    };

    const unmaximize = () => {
      ipcRenderer.send(TitleBarEventNames.UNMAXIMIZE);
    };

    const maximize = () => {
      ipcRenderer.send(TitleBarEventNames.MAXIMIZE);
    };

    const close = () => {
      ipcRenderer.send(TitleBarEventNames.CLOSE);
    };

    return {
      minimize,
      maximize,
      unmaximize,
      close,
      isMaximized
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../common/styles/_variables.scss";

@mixin transparentBackgroundColorMixin($color, $alpha) {
  background-color: rgba(red($color), green($color), blue($color), $alpha);
}

.title-bar {
  display: block;
  position: fixed;
  height: 26px;
  width: 100%;
  background: $dark;

  .drag-region {
    width: 100%;
    height: 100%;
    -webkit-app-region: drag;

    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
  }

  .title-bar-buttons-container {
    display: flex;
    height: 100%;
    -webkit-app-region: no-drag;

    .title-bar-button {
      width: 40px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      user-select: none;
      cursor: pointer;
      transition: 0.2s;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &:hover {
        @include transparentBackgroundColorMixin(
          $nav-tabs-link-active-color,
          0.1
        );
      }

      &:active {
        @include transparentBackgroundColorMixin(
          $nav-tabs-link-active-color,
          0.2
        );
      }

      &.close-button {
        &:hover {
          background: $danger !important;
        }
        &:active {
          background: lighten($danger, 10) !important;
        }
      }
    }
  }
}
</style>
