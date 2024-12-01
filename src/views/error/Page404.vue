<template>
    <div class="wscn-http404-container">
      <h1>404!</h1>
      <h2 class="bullshit__info">
            对不起，您正在寻找的页面不存在。
          </h2>
          <router-link to="/" class="bullshit__return-home">
            返回首页
          </router-link>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  const message = computed(() => '找不到网页！')
  </script>
  
  <style lang="scss" scoped>
  .wscn-http404-container{
    padding: 20px;
  }
  </style>
  