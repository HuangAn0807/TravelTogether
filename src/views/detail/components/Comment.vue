<script setup lang='ts' name='Comment'>
import { ref } from 'vue'
import '@/assets/css/comment.css'
import type { CommentT } from '../type';
import CommentTwo from './CommentTwo.vue';
import ConmentThree from './CommentThree.vue';
import { emitter } from '@/utils/emitter';
const father = ref<HTMLDivElement>();
const showAll = ref(false);
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
 // 显示该评论的所有回复
const changeShow = () => {
        showAll.value = !showAll.value;
        father.value!.style.maxHeight = 'fit-content';
    }
</script>
<template>
    <div class="father" ref="father">
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
                <!-- 点赞组件 -->
                <div class="like">
              <!-- 点赞 -->
              <Upvote @changeLike="changeLike" :count="likenum" position="bottom"/>
            </div>
            </div>
        </div>
        <template v-if="children.length>0">
            <CommentTwo 
            v-for="child in children"
            class="son" 
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
       
        <template v-for="child in children" v-if="children.length">
            <div v-if="child.children.length>0">
                <ConmentThree
                v-for="item in child.children"
                :root-id="child.rootId"
                :key="item.id"
                :id="item.id"
                :parentId="item.parentId"
                :parentUserName="item.parentUserName"
                :like="item.like"
                :username="item.username"
                :content="item.content"
                :time="item.time"
                :province="item.province"
                :avatar="item.avatar"
                :children="item.children"
                :width="'6vw'"
                />
            </div>
        </template>
       
    </div>
    <div @click="changeShow" v-if="!showAll" class="show-all">展开所有回复</div>
</template>

<style scoped lang='scss'>
.son{
    padding-left: 12vw !important;
    .like{
        width: 40px;
    }
}
.show-all{
        padding-left: 8vw;
        color:#3c5c7f ;
    }
    
.father{
    padding: 10px 0;
    max-height: 170px;
    overflow: hidden;
    
}
</style>