<script setup lang='ts' name='index'>
import { useRouter,} from "vue-router";
const router = useRouter()
const toPath = () => {
    router.push('/uploader')
}
</script>
<template>
    <div class="page">
        <RouterView/>
        <van-tabbar fixed class="footer" route  active-color="#ee0a24">
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
    .footer{
        bottom: -1px;
    }
}
</style>