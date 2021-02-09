<template>
  <div class="home">
    <img alt="Vue logo" v-bind:src="require('../assets/logo.png')">
    <MyComp msg="ivan" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import MyComp from '@/components/MyComp.vue' // @ is an alias to /src

@Options({
  components: {
    MyComp
  }
})
export default class Home extends Vue {}
</script>
