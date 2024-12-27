<script setup lang='ts' name=''>
import { ref } from 'vue'
import { useRoute,useRouter } from 'vue-router';
import UserItem from './components/UserItem.vue';
const route = useRoute()
const router = useRouter()
// 激活主页点击的tab栏
const active = ref(Number(route.query.type) as number)
const goBack = () => {
  router.go(-1)
}
const list = ref([
  {
    isFollow:false,
    intro:'这是简介',
    username:'小明',
    avatar:'https://img.yzcdn.cn/vant/cat.jpeg'
  },
  {
    isFollow:true,
    username:'张三',
    avatar:'https://img.yzcdn.cn/vant/cat.jpeg'
  }
])
// const isFollow = ref(false)
// 关注点击事件
const followChange = (index:number,newVal:boolean) => {
  list.value[index].isFollow = newVal
  // 根据当前的tab栏进行发不同的请求
  if(active.value === 1){
    console.log('回关');
    
  }else{
    console.log('关注');
  }
}
</script>
<template>
  <div class="page-content">
    <div class="goBack">
      <van-icon name="arrow-left" @click="goBack" size="6vw"/>
    </div>
    <van-tabs v-model:active="active" sticky >
        <van-tab :title="'关注 '">
          <UserItem 
          v-for="(item,index) in list" 
          @followChange="followChange(index,$event)" 
          :isFollow="item.isFollow"
          :username="item.username"
          :avatar="item.avatar"
          >
              <template #intro>
                {{ item.intro||'还没有简介' }} 
              </template>
              <template #follow>
                 {{ item.isFollow ? '已关注' : '关注' }}
              </template>
          </UserItem>
        </van-tab>
        <van-tab :title="'粉丝'">
          <UserItem 
          v-for="(item,index) in list" 
          @followChange="followChange(index,$event)" 
          :isFollow="item.isFollow"
          :username="item.username"
          :avatar="item.avatar"
          >
              <template #fans>
                笔记
                <span>{{ 5 }}</span>
                <span>|</span>
                粉丝
                <span>{{ 7 }}</span>
              </template>
              <template #follow>
                 {{ item.isFollow ? '互相关注' : '回关' }}
              </template>
          </UserItem>
        </van-tab>
    </van-tabs>
  </div>
</template>

<style scoped lang="scss">
:deep(.van-tabs__line){
    background-color: #e10a2a;
    }
    .goBack{
      position: absolute;
      width: 6vw;
      height: 6vw;
      left: 10px;
      top: 20px;
      z-index: 100;
    }
    .fans span{
        margin: 0 5px;
      }
</style>