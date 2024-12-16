<script setup lang='ts' name=''>
import { ref } from 'vue'
const value = ref('')
</script>
<template>
  <div class="page-content">
    <van-nav-bar title="标题" left-arrow size="6vw"> 
  <template #title>
    <van-search v-model="value" placeholder="请输入搜索关键词" />
  </template>
  <template #right>
    搜索
  </template>
</van-nav-bar>
</div>
</template>

<style scoped lang='scss'>

</style>