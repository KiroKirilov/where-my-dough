<!-- Template -->
<template>
  <div class="transaction-group-item">
    <div class="transaction-icon-container">
      <Tooltip class="cateogry-icon-tooltip" :content="props.transaction?.category?.name" :top="-90">
        <Icon
          class="transaction-icon"
          :name="props.transaction?.category?.icon"
          :color="props.transaction?.category?.iconColor"
        />
      </Tooltip>
    </div>

    <div class="transaction-title">{{props.transaction.title}}</div>
    <div class="transaction-amount">{{$filters.formatNumber(props.transaction?.amount)}}</div>

    <div class="actions-separator"></div>

    <div class="actions-buttons-container">
      <IconButton
        v-on:click="$emit('edit', props.transaction)"
        iconName="edit"
        text
        buttonType="primary"
        class="action-button"
      />

      <div class="button-spacer"></div>

      <LongpressButton :value="props.transaction" duration="1" :onConfirm="onDeleteConfirmed">
        <IconButton iconName="delete" text buttonType="danger" class="action-button" />
      </LongpressButton>
    </div>
  </div>
</template>

<!-- Script -->
<script lang="ts">
import { Transaction } from '@/db/models/transaction';
import { defineComponent } from 'vue';
import Icon from '@/components/misc/Icon.vue';
import IconButton from '@/components/misc/IconButton.vue';
import LongpressButton from '@/components/misc/LongpressButton.vue';
import Tooltip from '@/components/misc/Tooltip.vue';

export default defineComponent({
  name: 'TransactionGroupItem',
  components: {
    Icon,
    LongpressButton,
    IconButton,
    Tooltip
  },
  emits: ['edit', 'delete'],
  props: {
    transaction: Object as () => Transaction
  },
  setup(props, { emit }) {
    const onDeleteConfirmed = (transaction: Transaction) => {
      emit('delete', transaction);
    };

    return {
      props,
      onDeleteConfirmed
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../../common/styles/_variables.scss";

.transaction-icon {
  font-size: 34px;
}

.transaction-icon-container {
  width: 10%;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.transaction-group-item {
  display: flex;
  padding: 5px 5px 5px 0;
  align-items: center;
}

.transaction-amount {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.transaction-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.actions-buttons-container {
  display: flex;
}

.action-button {
  height: 30px;
  width: 33px;
  display: flex;
  justify-content: center;
}

.cateogry-icon-tooltip {
  height: 100%;
  cursor: pointer;
}

.actions-separator {
  background-color: $light;
  height: 25px;
  width: 1px !important;
  margin: 0 10px;
  border-radius: 10px;
}

.button-spacer {
  width: 10px;
}
</style>
