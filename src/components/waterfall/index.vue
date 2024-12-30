<script setup lang='ts' name=''>
import {ref,onMounted} from 'vue'
import type {WaterfallData} from './type'
import Card from '@/components/card/index.vue'
// 获取请求数据的方法
const {requestData} = defineProps<{
    requestData:Function
}>()
const num = ref(11)
// 数据是否加载中
const loading = ref(false)
let timer = 0
// 数据是否加载完成
const finished = ref(false)
// 是否刷新中
const refreshing = ref(false);
// 数据加载是否失败
const error = ref(false)
const data  = ref<WaterfallData>([
  {
    id: 1,
    img: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    text: '想跑路了，不想待在深圳了想跑路了，不想待在深圳想跑路了，不想待在深圳',
    user: '张三',
    userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    like: 1
  },
  {
    id: 2,
    img: 'https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320',
    text: '想跑路了，不想待在深圳了',
    user: '李四',
    userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    like: 1
  },
  {
    id: 3,
    img: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    text: '想跑路了，不想待在深圳了',
    user: '张三',
    userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    like: 1
  },
  {
    id: 4,
    img: 'https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320',
    text: '想跑路了，不想待在深圳了',
    user: '李四',
    userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    like: 1
  },
  {
    id: 5,
    img: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    text: '想跑路了，不想待在深圳了想跑路了，不想待在深圳想跑路了，不想待在深圳',
    user: '张三',
    userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    like: 1
  },
  {
    id: 6,
    img: 'https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320',
    text: '想跑路了，不想待在深圳了',
    user: '李四',
    userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    like: 1
  },
  {
    id:7,
    img: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    text: '想跑路了，不想待在深圳了',
    user: '张三',
    userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    like: 1
  },
  {
    id: 8,
    img: 'https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320',
    text: '想跑路了，不想待在深圳了',
    user: '李四',
    userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    like: 1
  },
  {
    id: 9,
    img: 'https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320',
    text: '想跑路了，不想待在深圳了',
    user: '李四',
    userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    like: 1
  },
  {
    id: 10,
    img: 'https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320',
    text: '想跑路了，不想待在深圳了',
    user: '李四',
    userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    like: 1
  },
])
// 瀑布流布局
const arr = ref<number[]>([10,10])
const loadMoreItems = () => {
   // 加载状态结束
   loading.value = false;
  if(timer) clearTimeout(timer)
  timer =  setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          data.value.push({
            id: ++num.value,
            img: 'https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320',
            text: '想跑路了，不想待在深圳了',
            user: '李四',
            userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
            like: 1
          });
        }
        requestData()
        // 数据全部加载完成
        if (data.value.length >=60) {
          finished.value = true;
        }
      }, 500);    
}
// 下拉刷新数据
const onRefresh = () => {
      // 清空列表数据
      data.value = [];
        // 重新加载数据
      finished.value = false;
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      refreshing.value = false;
 };
</script>
<template>
  <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
        ref="list"
        v-model:loading="loading"
        :immediate-check="false"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        :finished="finished"
        @load="loadMoreItems"
        :offset="300">
              <Card 
              :id="`card${item.id}`" 
              v-for="item in data" 
              :cardData="item" 
              :arr="arr" 
              :key="item.id"  
              />
        </van-list> 
  </van-pull-refresh>
</template>

<style scoped lang='scss'>
:deep(.van-list){
  font-size: 14px;
  position: relative;
  width: 100%;
  left: 0;
  top: 0;
    // 因为子元素使用了定位所以必须给一个最小高度否则默认高度为零，导致内容无法显示
  height:calc(100vh - 40px);
  overflow-y: auto; // 确保内容超出时显示滚动条
  // 隐藏滚动条
  -ms-overflow-style: none;  /* IE 10+ 和 Edge */
  scrollbar-width: none; /* Firefox 64+ */
  -webkit-overflow-scrolling: touch; /* 在移动设备上启用原生滚动 */
  scroll-behavior: smooth;
  // height: auto;
  margin-bottom: 60px;
}
</style>