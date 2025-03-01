<script setup lang='ts' name='Waterfall'>
import { ref, onMounted } from 'vue'
import type { WaterfallData } from './type'
import Card from '@/components/card/index.vue'
// 获取请求数据的方法
const { requestFun } = defineProps<{
  requestFun: Function
}>()
const num = ref(1)
// 数据是否加载中
const loading = ref(false)
let timer = 0
// 数据是否加载完成
const finished = ref(false)
// 是否刷新中
const refreshing = ref(false);
// 数据加载是否失败
const error = ref(false)
const data = ref<WaterfallData[]>([])

onMounted(async () => {
  const res = await requestFun({ pageNo: num.value })
  if (res?.data?.code == '200') {
    data.value = res.data.data
  }

})

// 瀑布流布局
const arr = ref<number[]>([10, 10])
const loadMoreItems = () => {
  // 加载状态结束
  loading.value = false;
  if (timer) clearTimeout(timer)
  timer = setTimeout(async () => {
    num.value++
    const res = await requestFun({ pageNo: num.value })
    if (res?.data?.code == '200') {
      data.value.push(...res.data.data)
    }
    // 数据全部加载完成
    if (data.value.length >= data.value.length + 5) {
      finished.value = true;
    }

  }, 500);
}
// 下拉刷新数据
const onRefresh = async () => {

  // 重新加载数据
  finished.value = false;
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  num.value = 1
  // 重新请求数据
  const res = await requestFun({ pageNo: num.value })
  // 清空列表数据
  data.value = [];
  if (res?.data?.code == '200') {
    data.value = res.data.data
  }
  loading.value = false
  refreshing.value = false;
};

</script>
<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
    <van-list ref="list" v-model:loading="loading" :immediate-check="false" v-model:error="error"
      error-text="请求失败，点击重新加载" :finished="finished" @load="loadMoreItems" :offset="300">
      <Card :id="`card${item.noteId}`" v-for="(item, index) in data" :cardData="item" :index="index" :arr="arr"
        :key="item.updateTime" />
    </van-list>
  </van-pull-refresh>
</template>

<style scoped lang='scss'>
:deep(.van-list) {
  font-size: 14px;
  position: relative;
  width: 100%;
  left: 0;
  top: 0;
  // 因为子元素使用了定位所以必须给一个最小高度否则默认高度为零，导致内容无法显示
  height: calc(100vh - 40px);
  overflow-y: auto; // 确保内容超出时显示滚动条
  // 隐藏滚动条
  -ms-overflow-style: none;
  /* IE 10+ 和 Edge */
  scrollbar-width: none;
  /* Firefox 64+ */
  -webkit-overflow-scrolling: touch;
  /* 在移动设备上启用原生滚动 */
  scroll-behavior: smooth;
  // height: auto;
  margin-bottom: 60px;
}
</style>