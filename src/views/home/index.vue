<script setup lang='ts' name='Home'>
import { nextTick, onMounted, ref,watch, type Ref} from "vue";
import Card from "./components/Card.vue";
const waterfall = ref<HTMLDivElement>()
const arr = ref<number[]>([0,0])
const data  = ref([
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
const num = ref(11)
const loading = ref(false)
let timer = 0
const finished = ref(false)
const active = ref('discover')
const loadMoreItems = () => {
  if(timer) clearTimeout(timer)
  timer =  setTimeout(() => {
       // 加载状态结束
       loading.value = false;
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
        // 数据全部加载完成
        if (data.value.length >=30) {
          finished.value = true;
        }
      }, 1000);
        
}
const refreshing = ref(false);
const error = ref(false)
const onRefresh = () => {
      // 清空列表数据
      finished.value = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      loadMoreItems();
    };
</script>
<template>
  <van-tabs v-model:active="active" sticky swipeable animated >
    <van-tab title="关注" name="follow" class="tab">
    </van-tab>
    <van-tab title="发现" name="discover" class="tab">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
          ref="waterfall"
          class="waterfall"
          v-model:loading="loading"
          :immediate-check="false"
          v-model:error="error"
          error-text="请求失败，点击重新加载"
          :finished="finished"
          @load="loadMoreItems"
          :offset="300"
        >
          <Card :id="`card${item.id}`" v-for="item in data" :cardData="item" :arr="arr" :key="item.id"  />
        </van-list>  
      </van-pull-refresh>
    </van-tab>
  </van-tabs>
</template>

<style scoped lang="scss" >
.tab{
  background-color: #f1f4f6;
}
::v-deep .van-list{
  font-size: 14px;
  position: relative;
  width: 100%;
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