<script setup lang='ts' name=''>
import type { CommentT } from '@/components/comment/type';
const {
    id,
    parentId,
    parentUserName,
    like,
    username,
    content,
    time,
    province,
    width = '8vw',
    avatar = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    children,
    } = defineProps<CommentT>()
</script>
<template>
   <div class="comment">
            <div class="user-info">
                <van-image
                :width="width"
                :height="width" 
                fit="cover"
                round
                :src="avatar"
                class="user-img"
                />
                <div class="center">
                    <div class="user-name">
                        <span>{{ username }}</span>
                        <span class="author">作者</span>
                    </div>
                    <div class="text">
                    <div class="content">
                            {{ content }}
                    </div>
                    <div class="time">
                            <span class="date-adress">
                            {{ time+' ' }} {{ province }}
                            </span>
                            <span class="reply">
                                    回复
                            </span>
                    </div>
                    </div>
                </div>
            </div>
            <div class="like">
                <van-rate  icon="like" void-icon="like-o" count="1" clearable  size="6vw"/>
                <div>{{ like }}</div>
            </div>
        </div>
</template>

<style scoped lang='scss'>
.comment{
    padding-left: 6vw;
}
</style>