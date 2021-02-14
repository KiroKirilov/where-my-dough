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
          <Icon v-if="category.icon" :name="category.icon" :color="category.iconColor" class="categories-list-icon" />
          <div v-if="!category.icon">n/a</div>
        </td>
        <td>
          <div>
            <button type="button" class="btn btn-primary">
              <Icon name="edit" />
            </button>

            <button type="button" class="btn btn-danger">
              <Icon name="delete" />
            </button>
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

export default defineComponent({
  name: 'Categories List',
  components: {
    Icon
  },
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

button {
  border-radius: 50%;
  color: $body-color;
  font-size: 23px;
  padding: 0;
  width: 40px;
  height: 40px;
  margin: 0 5px;

  &:hover, &:focus, &:active {
    color: $body-color;

    &.btn-primary {
      background-color: darken($primary, $darkenAmountOnHover);
      border-color: darken($primary, $darkenAmountOnHover);
    }

    &.btn-danger {
      background-color: darken($danger, $darkenAmountOnHover);
      border-color: darken($danger, $darkenAmountOnHover);
    }
  }
}

.categories-list-icon {
  font-size: 23px;
}

tr {
  vertical-align: middle;
}
</style>
