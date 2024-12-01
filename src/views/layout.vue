<script setup lang='ts' name='index'>
import { ref } from "vue";
const active = ref('home')

</script>
<template>
    <div class="page">
        <RouterView/>
        <van-tabbar v-model="active" fixed class="footer">
            <van-tabbar-item name="home" icon="home-o" :to="`/home`">首页</van-tabbar-item>
            <van-uploader>
                <van-button icon="plus" type="text" class="uploader"></van-button>
            </van-uploader>
            <van-tabbar-item name="user" icon="contact" :to="`/user`">我</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<style scoped lang="scss" >
.page{
    height: 100vh;
    // padding: 10px;
    .uploader{
        border: none;
        color: red;
        background-color: #fff;
        font-size: 1.5em;
    }
    .footer{
       
    }
}
</style>