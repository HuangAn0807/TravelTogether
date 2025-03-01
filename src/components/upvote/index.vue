<script setup lang='ts' name='Upvote'>
import { ref } from 'vue'
// 默认已点赞样式
const {
    like = false,
    icon = 'like',
    color = '#ee0a24',
    position = 'right',
    count = 0,
    index
}
    = defineProps<{
        like?: boolean,
        icon?: string,
        color?: string,
        position?: 'bottom' | 'right',
        count: number,
        index?: number
    }>()
// 控制爱心样式默认未点赞
// const isLike = ref(like || false)
const emit = defineEmits<{
    //返回点击后的数量和图标类型以解决一个页面多个图标数量加减问题
    changeLike: [count: number, icon: string, isLike: boolean]
}>()
// 将点赞状态传给父组件
const changeLike = (like: boolean) => {
    if (like) {
        emit('changeLike', count + 1, icon, like)
    } else {
        emit('changeLike', count - 1, icon, like)
    }
}
</script>
<template>
    <van-icon v-if="!like" :name="`${icon}-o`" @click="changeLike(!like)" class="islike" size="6vw" />
    <van-icon v-else="like" :name="icon" @click="changeLike(!like)" class="islike" size="6vw"
        :style="{ color: color }" />
    <div v-if="position === 'bottom'">{{ count }}</div>
    <span v-if="position === 'right'">{{ count }}</span>
</template>

<style scoped lang='scss'>
.islike {
    margin-right: 5px;
}

.red {
    color: #ee0a24;
}
</style>