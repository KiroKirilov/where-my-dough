<template>
  <div class="home">
    <img alt="Vue logo" v-bind:src="require('../assets/logo.png')">
    <MyComp :msg="'ivancho'" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MyComp from '@/components/MyComp.vue'

export default defineComponent({
  name: 'My View',
  components: {
    MyComp
  }
})
</script>
