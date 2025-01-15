<script setup lang='ts' name='Home'>
import { ref } from "vue";
import { useRouter, } from "vue-router";
import Waterfall from "@/components/waterfall/index.vue";
import axios from "axios";

const router = useRouter()
const active = ref('discover')
const toSearch = () => {
  router.push('/search')
}
const fun = () => {

}
</script>
<template>
  <div class="page">
    <van-icon name="search" size="6vw" class="search" @click="toSearch" />
    <van-tabs v-model:active="active" sticky swipeable animated>
      <van-tab title="关注" name="follow" class="tab" @click="">
        <Waterfall :request-fun="fun" :key="'Waterfall-follow'" />
      </van-tab>
      <van-tab title="发现" name="discover" class="tab">
        <Waterfall ref="waterfall" :request-fun="fun" :key="'Waterfall-discover'" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-tabs__nav) {
  padding-right: 100px;
}

.search {
  position: absolute;
  z-index: 100;
  right: 40px;
  top: 10px;
  color: #000;
}

:deep(.van-tabs__line) {
  background-color: #e10a2a;
}
</style>