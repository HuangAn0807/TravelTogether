<script setup lang='ts' name='Home'>
import { onMounted, ref } from "vue";
import { useRouter, } from "vue-router";
import Waterfall from "@/components/waterfall/index.vue";
import { getNoteList } from '@/api/notes/index'
import { getUser } from "@/api";
import { useUserStore } from '@/stores/userStore'
const { setUserInfo } = useUserStore()
onMounted(async () => {
  const res = await getUser()
  setUserInfo(res.data.data)
})
const router = useRouter()
const active = ref('discover')
const toSearch = () => {
  router.push('/search')
}
</script>
<template>
  <div class="page">
    <van-icon name="search" size="6vw" class="search" @click="toSearch" />
    <van-tabs v-model:active="active" sticky swipeable animated>
      <!-- <van-tab title="关注" name="follow" class="tab" @click="">
        <Waterfall :request-fun="getNoteList" :key="'Waterfall-follow'" />
      </van-tab> -->
      <van-tab title="发现" name="discover" class="tab">
        <Waterfall ref="waterfall" :request-fun="getNoteList" :key="'Waterfall-discover'" />
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
  right: 30%;
  top: 10px;
  color: #000;
}

:deep(.van-tabs__line) {
  background-color: #e10a2a;
}
</style>