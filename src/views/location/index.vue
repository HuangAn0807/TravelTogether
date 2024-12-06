<script setup lang='ts' name=''>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import useCity from './hooks/getCity'
// 获取路由实例
const router = useRouter()
// 定义搜索关键词
const search = ref('')
const {cityInfo,getLocationByIP} = useCity()
onMounted(() => {
    getLocationByIP()
    console.log(cityInfo.value.citycode);
})


const locationList = ref([])
// 搜索地点
const onSearch = () => {
    console.log(search.value)
}
// 取消搜索
const onCancel = () => {
    search.value = ''
}
const goBack = () => {
    router.go(-1)
}
</script>
<template>
  <div class="page-content ">
    <div class="search">
        <van-icon name="arrow-left" size="6vw"  @click="goBack"/>
        <form action="/">
        <van-search
        class="input"
            v-model="search"
            shape="round"
            :show-action="false"
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        />
         </form>
    </div>
   
</div>
</template>

<style scoped lang='scss'>
.search{
    display: flex;
    justify-content: left;
    align-items: center;
    position: fixed;
    left: 10;
    top: 10;
}
::v-deep .van-search {
        margin-left: 20vw;
    }
</style>