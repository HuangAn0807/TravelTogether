<script setup lang='ts' name=''>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import HistoryItem from './components/HistoryItem.vue';
import Waterfall from "@/components/waterfall/index.vue";
import { useSearchHistoryStore } from '@/stores/searchHistoryStore';
// 搜索数据及方法
const {searchHistoryList,setSearchHistoryList,clearSearchHistoryList,deleteSearchHistory} = useSearchHistoryStore()
const router = useRouter()
const searchValue = ref('')// 搜索框内容
const show = ref(false)// 显示删除按钮
const showSearch = ref(true)//显示历史记录
const active = ref(0)//当前显示内容的标签页索引
// 搜索
const onSearch = () => {
    setSearchHistoryList(searchValue.value)// 存储搜索历史
    showSearch.value = false// 隐藏搜索历史
}
// 返回上一页
const goBack = () => {
    router.back()
}
// 点击搜索历史输入框同步内容
const changeSearch = (item:string) => {
    searchValue.value = item
}
// 显示删除按钮
const changeShow = () => {
    show.value = !show.value
}
// 清空搜索列表
const allDelete = () => {
    clearSearchHistoryList() // 清空搜索列表
    changeShow() // 隐藏删除按钮
}
// 删除单个搜索历史
const delSearchHistory = (index:number) => {
    deleteSearchHistory(index) // 删除单个搜索历史
    // 如果删除后没有搜索历史，隐藏删除按钮
    if (searchHistoryList.length === 0) {
        changeShow()
    }
}
const changeSearchShow = () => {
    showSearch.value = !showSearch.value
}
const fn = () => {
    console.log(123);
}
</script>
<template>
  <div class="page-content">
    <van-nav-bar  left-arrow size="6vw" @click-left="goBack"> 
        <template #title>
            <van-search 
            v-model.trim="searchValue" 
            placeholder="请输入搜索关键词" 
            @search="onSearch"
            @clear="changeSearchShow"
            />
        </template>
        <template #right >
            <div @click="onSearch">
                搜索
            </div>  
        </template>
    </van-nav-bar>
    <div class="search" v-if="searchHistoryList.length>0 && showSearch">
        <div class="history">
            <span>历史记录</span>
            <div>
                <!-- 删除按钮 -->
                <van-icon name="delete-o" size="4vw" @click="changeShow" v-show="!show"/>
                <span v-show="show" class="alldel" @click="allDelete">全部删除</span>
                <span v-show="show" @click="changeShow" class="complete">完成</span>
            </div>
        </div>
        <div class="search-history">
            <HistoryItem 
            v-for="(item,index) in searchHistoryList" 
            :text="item" 
            :key="item" 
            :show="show"
            :index="index"
            :changeSearch="changeSearch"
            @delHistory="delSearchHistory"
            />
        </div>
    </div>
    <div v-else-if="searchHistoryList.length===0 && showSearch">
        <van-empty
        image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
        image-size="100"
        description="暂无搜索内容"
        />
    </div>
    <div v-if="!showSearch">
        <van-tabs v-model:active="active" sticky>
            <van-tab :title="'笔记 '" class="tab">
                <Waterfall :request-data="fn"/>
            </van-tab>
            <van-tab :title="'用户 '">
               
            </van-tab>
        </van-tabs>
    </div>
</div>
</template>

<style scoped lang='scss'>
:deep(.van-tabs__line){
    background-color: #e10a2a;
    }
:deep(.van-icon-arrow-left){
    color: #000;
    font-size: 6vw;
}
:deep(.van-icon-search){
    color:#9c9f9f ;
}
:deep(.van-nav-bar__left){
    padding-left: 0;
}
.search{
    padding: 10px;
    .history{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .complete{
        margin-left: 10px;
      }
      .alldel{
        color: #9c9f9f;
      }
    }
    .search-history{
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
    }
}

</style>