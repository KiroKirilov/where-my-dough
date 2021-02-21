<!-- Template -->
<template>
  <div class="settings-editor">
    <div class="username-container">
      <Icon name="account-circle" class="username-icon" />
      <div class="username-text">{{name}}</div>
    </div>

    <div class="settings-container">
      <SettingsInput
        label="Monthly Budget"
        v-model="monthlyBudget"
        :inputProps="{ type: 'number', min: '0'}"
        preAddon="$"
        @save="saveBudget"
        :validator="validateBudget"
        :loading="props.loading"
      />

      <div class="setting-separator"></div>

      <SettingsInput
        label="Target savings"
        v-model="targetSavings"
        :inputProps="{ type: 'number', min: '0', max: '100', step: '0.01'}"
        postAddon="%"
        @save="saveTargetSavings"
        :validator="validateTargetSavings"
        :loading="props.loading"
      />
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { Settings } from '@/db/models/settings';
import Icon from '@/components/misc/Icon.vue';
import SettingsInput from './SettingInput.vue';
import useOsUserName from '@/composables/useOsUserName';

export default defineComponent({
  name: 'SettingsEditor',
  components: {
    Icon,
    SettingsInput
  },
  emits: ['save'],
  props: {
    settings: Object as () => Settings | null,
    loading: Boolean
  },
  setup(props, { emit }) {
    const name = useOsUserName();
    const monthlyBudget = ref('');
    const targetSavings = ref('');

    watch(
      () => props.settings,
      () => {
        const model = props.settings;
        monthlyBudget.value = (model?.monthlyBudget || 0).toString();
        targetSavings.value = (model?.targetSavings || 0).toString();
      },
      {
        deep: true
      }
    );

    const validateBudget = (value: string) => {
      const parsedValue = Number(value);
      if (!parsedValue || parsedValue < 0) {
        return 'Please provide a positive number.';
      }

      return undefined;
    };

    const validateTargetSavings = (value: string) => {
      const parsedValue = Number(value);
      if (!parsedValue || parsedValue < 0 || parsedValue > 100) {
        return 'Please provide a number between 0 and 100.';
      }

      return undefined;
    };

    const saveBudget = () => {
      const newSettings = {
        ...props.settings,
        monthlyBudget: Number(monthlyBudget.value)
      }

      emit('save', newSettings);
    }

    const saveTargetSavings = () => {
      const newSettings = {
        ...props.settings,
        targetSavings: Number(targetSavings.value)
      }

      emit('save', newSettings);
    }

    return {
      props,
      monthlyBudget,
      targetSavings,
      name,
      validateBudget,
      saveBudget,
      validateTargetSavings,
      saveTargetSavings
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../common/styles/_variables.scss";

.settings-editor {
  background-color: $gray-800;
  padding: 14px 16px;
  border-radius: 10px;
  width: 35%;
}

.settings-container {
  background-color: $body-bg;
  padding: 10px;
  padding-bottom: 0px;
  border-radius: 10px;
  width: 100%;
}

.username-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.username-icon {
  font-size: 48px;
  margin-right: 10px;
}

.username-text {
  font-size: 23px;
  font-weight: bold;
}

.setting-separator {
  margin-bottom: 9px;
  width: 100%;
  height: 1px;
  border-top: thin solid hsla(0, 0%, 100%, 0.06);
}
</style>
