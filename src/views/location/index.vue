<script setup lang='ts' name=''>
import { nextTick, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import useCity from './hooks/getCity'
import useSearchAttractions from "./hooks/searchAttractions";
import PositionItem from "./components/PositionItem.vue";
// 获取路由实例
const router = useRouter()
// 定义搜索关键词
const search = ref('')
// 用户是否刷新中
const refreshing = ref(false)
// 数据是否加载中
const loading = ref(false)
// 数据是否加载完成
const finished = ref(false)
// 获取第一页城市景点列表
const number = ref(1)
const {pois,cityPoisCount,searchAttractions} = useSearchAttractions()
// 获取城市信息
const {cityInfo,getLocation} = useCity()
getLocation()
// 当城市信息发生变化时请求该城市的景点数据
watch(cityInfo.value,(val) => {
   if(val){
    cityInfo.value = val 
    searchAttractions(cityInfo.value.city)
   }
    
},{deep:true})

let time = 0
// 搜索地点
const onSearch = () => {
    // 初始化搜索页数
    number.value = 1
    // 搜索不同地点时需要把其他城市数据清空
    pois.value = []
    searchAttractions(search.value)
}
const goBack = () => {
    router.go(-1)
}
// 定义是否加载完成
const onLoad = () => {
    loading.value = false
    if(time){
        clearTimeout(time)
    }
    time = setTimeout(() => {
        number.value++
        // 加载景点数据
        searchAttractions(search.value||cityInfo.value.city,number.value)
        if(pois.value.length>=cityPoisCount.value){
            finished.value = true
        }  
    },1000)
}
// 下拉刷新
const onRefresh = () => {
    // 重置数据
    pois.value = []
    finished.value = false
    // 重置加载完成
    loading.value = false
    searchAttractions(search.value||cityInfo.value.city,number.value)
    // 重置加载中
    refreshing.value = false
    // 获取当前城市的景点信息
}
</script>
<template>
  <div class="page-content page">
    <div class="search">
        <van-icon name="arrow-left" size="6vw"  @click="goBack"/>
        <form action="/">
        <van-search
        class="input"
            v-model="search"
            shape="round"
            :show-action="false"
            placeholder="请输入地点关键词"
            @search="onSearch"
        />
         </form>
    </div>
   <div class="scenicSpo-list">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
        v-model:loading="loading"
        loading-text="加载中..."
        :finished="finished"
        :immediate-check="false"
        offset="400"
        finished-text="没有更多了"
        @load="onLoad"
        >
            <PositionItem v-if="pois" v-for="item in pois" :scenicSpotInfo="item"/>
        </van-list>
    </van-pull-refresh>
       
   </div>
</div>
</template>

<style scoped lang='scss'>
.page{
    padding: 0;
}
.search{
    display: flex;
    justify-content: left;
    padding-left: 10px;
    align-items: center;
    position: fixed;
    width: 100%;
    height: 8vh;
    background-color: #fff;
    z-index: 100;
}
:deep(.van-search ){
        margin-left: 20vw;
    }
.scenicSpo-list{
   padding-top: 8vh;
   padding-left: 20px;
   min-height: 100%; 
   height: auto;  
}
</style>