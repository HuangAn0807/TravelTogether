<script setup lang='ts' name='Home'>
import { ref} from "vue";
import Card from "./components/Card.vue";
// tab栏标签切换
const activeName = ref('index')
window.onscroll = () => {
  console.log(window.scrollY,'window.scrollY');
  
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        // 滚动到底部，执行加载更多操作
        console.log('滚动到底部');
        data.value.push({
        id: 10,
        img: 'https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320',
        text: '想跑路了，不想待在深圳了',
        user: '李四',
        userImg: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        like: 1
    })
       // 在这里执行加载更多的逻辑，比如加载更多的数据
    }

}
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
])


</script>
<template>
    <van-tabs v-model:active="activeName" sticky swipeable animated>
      <van-tab title="关注" name="follow" class="tab">
      </van-tab>
      <van-tab title="发现" name="index" class="tab">
        <div ref="waterfall" class="waterfall">
          <Card v-for="item in data" :cardData="item" :arr="arr" :key="item.id"/>
        </div>
      </van-tab>
    </van-tabs>
</template>

<style scoped lang="scss" >
.tab{
  background-color: #f1f4f6;
}
::v-deep .van-tab__panel{
  min-height: calc(100vh - 44px);
  overflow-y: auto; // 确保内容超出时显示滚动条
  // 隐藏滚动条
  -ms-overflow-style: none;  /* IE 10+ 和 Edge */
  scrollbar-width: none; /* Firefox 64+ */
  -webkit-overflow-scrolling: touch; /* 在移动设备上启用原生滚动 */
  height: auto;
  width: 100%;
  margin-bottom: 60px;
}
.waterfall {
    font-size: 14px;
    position: relative;
    min-height:100%;
    // bottom: 50px;
    height: auto;
    width: 100%;
   
}

</style>