<!-- Template -->
<template>
  <Grid :data="props.categories" :columns="columns">
    <template v-slot:header-actions></template>

    <template v-slot:cell-icon="slotProps">
          <Icon
            v-if="slotProps.dataItem.icon"
            :name="slotProps.dataItem.icon"
            :color="slotProps.dataItem.iconColor"
            class="categories-list-icon"
          />
          <div v-if="!slotProps.dataItem.icon">n/a</div>
    </template>

    <template v-slot:cell-actions="slotProps">
      <div class="actions-buttons-container">
        <IconButton
          v-on:click="$emit('edit', slotProps.dataItem)"
          iconName="edit"
          text
          buttonType="primary"
          class="action-button"
        />

        <div class="button-spacer"></div>

        <LongpressButton :value="slotProps.dataItem" duration="1" :onConfirm="onDeleteConfirmed">
          <IconButton iconName="delete" text buttonType="danger" class="action-button" />
        </LongpressButton>
      </div>
    </template>
  </Grid>
</template>

<!-- Script -->
<script lang="ts">
import { Category } from '@/db/models/category';
import { defineComponent, PropType } from 'vue';
import Icon from '@/components/misc/Icon.vue';
import IconButton from '@/components/misc/IconButton.vue';
import LongpressButton from '@/components/misc/LongpressButton.vue';
import Grid from '@/components/misc/Grid/Grid.vue';
import { ColumnInfo } from '../misc/Grid/ColumnInfo';
import { ColumnType } from '../misc/Grid/ColumnType';
import { nameof } from '@/common/helpers/nameof';

export default defineComponent({
  name: 'Categories List',
  components: {
    Icon,
    IconButton,
    LongpressButton,
    Grid
  },
  emits: ['edit', 'delete'],
  props: {
    categories: Array as PropType<Array<Category>>
  },
  setup(props, { emit }) {
    const onDeleteConfirmed = (category: Category) => {
      emit('delete', category);
    };

    const columns: ColumnInfo[] = [
      {
        name: nameof<Category>('name'),
        title: 'Name',
        type: ColumnType.String,
        sortable: true,
        widthPercent: 25
      },
      {
        name: nameof<Category>('createdOn'),
        title: 'Created On',
        type: ColumnType.Date,
        sortable: true,
        widthPercent: 25
      },
      {
        name: nameof<Category>('icon'),
        title: 'Icon',
        widthPercent: 20
      },
      {
        name: 'actions',
        title: 'Actions',
        widthPercent: 30
      }
    ];

    return {
      props,
      onDeleteConfirmed,
      columns
    };
  }
});
</script>

<!-- Styles -->
<style scoped lang="scss">
@import "../../common/styles/_variables.scss";
$darkenAmountOnHover: 10%;

.categories-list-icon {
  font-size: 23px;
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

.button-spacer {
  width: 10px;
}

tr {
  vertical-align: middle;
}
</style>
