<!-- Template -->
<template>
  <PageWithHeader headerTitle="Settings" headerIconName="settings">
    <template v-slot:content>
      <div class="settings-container">
        <SettingsEditor v-if="!settingsError" :settings="settings" @save="saveSettings" :loading="loading" />

        <div v-if="settingsError">
          <ErrorMessage
            class="categories-error"
            message="An error ocurred while loading your settings :/"
            :onRetry="getSettings"
            :retrying="loading"
          />
        </div>
      </div>
    </template>
  </PageWithHeader>
</template>

<!-- Script -->
<script lang="ts">
import { defineComponent } from 'vue';
import PageWithHeader from '@/components/layout/PageWithHeader.vue';
import SettingsEditor from '@/components/settings/SettingsEditor.vue';
import useSettings from '@/composables/settings/useSettings';
import ErrorMessage from '@/components/misc/ErrorMessage.vue';
import { Settings } from '@/db/models/settings';

export default defineComponent({
  name: 'Settings',
  components: {
    PageWithHeader,
    SettingsEditor,
    ErrorMessage
  },
  setup() {
    const {
      settings,
      getSettings,
      settingsRepo,
      settingsError,
      loading
    } = useSettings();

    const saveSettings = async (newSettings: Settings) => {
      if (newSettings._id) {
        await settingsRepo.update(newSettings);
        getSettings()
      } else {
        await settingsRepo.create(newSettings);
        getSettings();
      }
    }

    return {
      settings,
      settingsError,
      getSettings,
      loading,
      saveSettings
    }
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
.settings-container {
  display: flex;
  justify-content: center;
  height: 80%;
  align-items: center;
}
</style>
