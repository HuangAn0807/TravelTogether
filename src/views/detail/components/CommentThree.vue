<script setup lang='ts' name='CommentThree'>
import type { CommentT } from '../type';
import Upvote from '@/components/upvote/index.vue'
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
// 将回复的评论id和用户名传给父组件
const handleReply = () => {
    emitter.emit('reply',{id,username})
}
const changeLike = (count:number) => {
    likenum.value = count
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
                        <div>回复 </div>
                        <div class="parent-name">{{ parentUserName }} </div>
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
    <template v-if="children.length>0">
        <CommentThree
        v-for="child in children"
        :key="child.id"
        :root-id="child.rootId"
        :id="child.id"
        :parentId="child.parentId"
        :parentUserName="child.parentUserName"
        :like="child.like"
        :username="child.username"
        :content="child.content"
        :time="child.time"
        :province="child.province"
        :avatar="child.avatar"
        :children="child.children"
        :width="'6vw'"
        />
    </template>
    
</template>

<style scoped lang='scss'>
.comment{
    padding-left: 12vw;
    .parent-name{
        margin: 0 5px;
    }
}
</style>