<script setup lang='ts' name='Home'>
import { ref,computed,onMounted} from "vue";
import Card from "./components/Card.vue";
// tab栏标签切换
const activeName = ref('index')
// 喜欢的数量
const likeNumber = ref(100000)

const arr = ref([0,0])
// 获取屏幕宽度
const bodyWidth = ref(document.body.clientWidth)
// 获取屏幕宽度计算出每个item的宽度
const itemWidth = computed(() => bodyWidth.value/2)
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
])


</script>
<template>
    <van-tabs v-model:active="activeName" sticky swipeable animated>
      <van-tab title="关注" name="follow" class="tab">
      </van-tab>
      <van-tab title="发现" name="index" class="tab">
        <div ref="waterfall" class="waterfall">
          <Card v-for="item in data" :cardData="item" :key="item.id"/>
        </div>
      </van-tab>
    </van-tabs>
</template>

<style scoped lang="scss" >
.tab{
  background-color: #f1f4f6;

}
.waterfall {
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 50px;
}

</style>