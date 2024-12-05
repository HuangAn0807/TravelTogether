<script setup lang='ts' name='index'>
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
const active = ref('home')
const toPath = () => {
    router.push('/uploader')
}
</script>
<template>
    <div class="page">
        <RouterView/>
        <van-tabbar v-model="active" fixed class="footer">
            <van-tabbar-item name="home" icon="home-o" :to="`/home`">首页</van-tabbar-item>
            <van-tabbar-item> <van-icon name="plus" class="plus" @click="toPath"/></van-tabbar-item>  
            <van-tabbar-item name="user" icon="contact" :to="`/user`">我</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style scoped lang="scss" >
.page{
    height: 100vh;
    .plus{
        border: none;
        color: red;
        background-color: #fff;
        font-size: 2em;
        line-height: 2em;
    }
}
</style>