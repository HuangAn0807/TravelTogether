<script setup lang='ts' name='PositionItem'>
import type {ScenicSpotInfo} from '../type.ts'
import {useRouter} from 'vue-router'
 defineProps<{
    scenicSpotInfo:ScenicSpotInfo
 }>()
const router = useRouter()
const toUploader = () => {
    // router.push({path:'/uploader',query:{scenicSpotInfo:scenicSpotInfo.value}})
}
</script>
<template>
    <div class="item" @click="toUploader">
        <div class="name">{{ scenicSpotInfo.name }}</div>
        <div class="address">{{ scenicSpotInfo.address}}</div>
    </div>
</template>

<style scoped lang='scss'>
 .item{
    width: 100%;
    height: 10%;
    .name{
        line-height: 2em;
        font-size: 1.2em;
        font-weight: 700;
    }
    .address{
        color: #8c8c8c;
    }
    .name,.address{
        padding-left: 10px;
        white-space: nowrap;       /* 禁止换行 */
        overflow: hidden;          /* 隐藏溢出的内容 */
        text-overflow: ellipsis;   /* 使用省略号表示溢出的文本 */
    }
 }
</style>