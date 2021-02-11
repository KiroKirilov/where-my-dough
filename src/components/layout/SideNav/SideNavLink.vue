<!-- Template -->
<template>
  <Tooltip class="side-nav-link-tooltip" :content="props.title">
    <div
      v-on:click="navigateTo(props.to)"
      class="side-nav-link-container"
      v-bind:class="{ active: isActive }"
    >
      <div class="link-indicator"></div>
      <div class="side-nav-link"></div>
    </div>
  </Tooltip>
</template>

<!-- Script -->
<script lang="ts">
import useRefWithSetter from '@/composables/useRefWithSetter';
import Tooltip from '@/components/misc/Tooltip.vue';
import { defineComponent, watch } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Side Nav Link',
  components: {
    Tooltip
  },
  props: {
    to: String,
    title: String
  },
  setup(props) {
    const router = useRouter();
    const [isActive, setIsActive] = useRefWithSetter(router.currentRoute.value.path === props.to);

    watch(router.currentRoute, (newVal) => {
      setIsActive(newVal.path === props.to);
    });

    const navigateTo = (location: string) => {
      router.replace({ path: location });
    };

    return {
      isActive,
      navigateTo,
      props
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../../common/styles/_variables.scss";
$transitionSpeed: 0.3s;

.side-nav-link-container {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;

  &.active {
    .link-indicator {
      height: 40px !important;
      width: 5px !important;
    }

    .side-nav-link {
      border-radius: 20px !important;
      background-color: $primary !important;
    }
  }

  &:hover {
    .link-indicator {
      height: 25px;
      width: 5px;
    }

    .side-nav-link {
      border-radius: 18px;
      background-color: $primary;
    }
  }
}

.side-nav-link-tooltip {
  cursor: pointer;
}

.link-indicator {
  height: 0px;
  width: 0px;
  background-color: $white;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  transition: $transitionSpeed;
  position: absolute;
  left: 0;
}

.side-nav-link {
  width: 50px;
  height: 100%;
  background-color: $body-bg;
  border-radius: 50%;
  transition: $transitionSpeed;
  cursor: pointer;
}
</style>
