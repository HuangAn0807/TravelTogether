<script setup lang='ts' name=''>
import type { CommentT } from '../type';
import { emitter } from '@/utils/emitter';
import { ref } from 'vue'
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
  // 点赞数
const likenum = ref(like)
const changeLike = (count:number) => {
   likenum.value = count
}
  // 将回复的评论id和用户名传给父组件
  const handleReply = () => {
        emitter.emit('reply',{id,username})
    }
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
                            <span class="reply" @click="handleReply">
                                    回复
                            </span>
                    </div>
                    </div>
                </div>
            </div>
            <div class="like">
                <Upvote @changeLike="changeLike" :count="likenum" position="bottom"/>
            </div>
        </div>
</template>

<style scoped lang='scss'>
.comment{
    padding-left: 6vw;
}
</style>