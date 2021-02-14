<!-- Template -->
<template>
  <table class="table table-striped table-hover">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Created On</th>
        <th scope="col">Icon</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="category in props.categories" :key="category._id">
        <td>{{category.name}}</td>
        <td>{{$filters.formatDate(category.createdOn)}}</td>
        <td>
          <Icon
            v-if="category.icon"
            :name="category.icon"
            :color="category.iconColor"
            class="categories-list-icon"
          />
          <div v-if="!category.icon">n/a</div>
        </td>
        <td>
          <div class="actions-buttons-container">
            <IconButton
              v-on:click="$emit('edit', category)"
              iconName="edit"
              text=""
              buttonType="primary"
              class="action-button"
            />

            <IconButton
              v-on:click="$emit('delete', category)"
              iconName="delete"
              text=""
              buttonType="danger"
              class="action-button"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<!-- Script -->
<script lang="ts">
import { Category } from '@/db/models/category';
import { defineComponent, PropType } from 'vue';
import Icon from '@/components/misc/Icon.vue';
import IconButton from '@/components/misc/IconButton.vue';

export default defineComponent({
  name: 'Categories List',
  components: {
    Icon,
    IconButton
  },
  emits: ['edit', 'delete'],
  props: {
    categories: Array as PropType<Array<Category>>
  },
  setup(props) {
    return {
      props
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
  margin: 0 5px;
  width: 30px;
  display: flex;
  justify-content: center;
}

tr {
  vertical-align: middle;
}
</style>
