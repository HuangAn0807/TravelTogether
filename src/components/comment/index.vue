<script setup lang='ts' name='Comment'>
import { nextTick, ref } from 'vue'
import '@/assets/css/comment.css'
import type { CommentT } from './type';
import CommentTwo from '@/components/commentTwo/index.vue';
import ConmentThree from '@/components/commentThree/index.vue';
const father = ref<HTMLDivElement>();
const showAll = ref(false);
const {
    like,
    username,
    content,
    time,
    province,
    width = '8vw',
    avatar = 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    children,
    } = defineProps<CommentT>()
 // 显示该评论的所有回复
const changeShow = () => {
        showAll.value = !showAll.value;
        console.log(father.value);
        
        father.value!.style.height = 'fit-content';
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
        <CommentTwo 
        v-for="child in children"
        class="son"
        :key="child.id"
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
        <template v-for="child in children">
            <div v-if="child.children.length>0">
                <ConmentThree
                v-for="item in child.children"
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
</template>

<style scoped lang='scss'>
.son{
    padding-left: 12vw !important;
    .like{
        width: 40px;
    }
}
.father{
    padding: 10px 0;
    height: fit-content;
    // overflow: hidden;
    .show-all{
        padding-left: 8vw;
        color:#3c5c7f ;
    }
    
}
</style>