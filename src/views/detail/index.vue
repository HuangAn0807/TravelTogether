<script setup lang='ts' name=''>
import { useRoute,useRouter } from 'vue-router';
import  Comment from '@/components/comment/index.vue';
import type { CommentT } from '@/components/comment/type';
import {ref} from 'vue'
const route = useRoute();
const router = useRouter()
const datalist = ref<CommentT[]>([  
    {
        id:'1',
        parentId:'',
        like:12,
        username:'张三',
        content:'程序员的破防瞬间的破防瞬间 程序员的破防瞬间程序员的破防瞬间 程序员的破防瞬间程序员',
        time:'01-01',
        province:'广东',
        avatar:'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        children:[
             {
                id:'2',
                parentId:'1',
                parentUserName:'张三',
                like:12,
                username:'李四',
                content:'123456',
                time:'01-01',
                province:'广东',
                avatar:'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                children:[
                    {
                        id:'3',
                        parentId:'2',
                        parentUserName:'李四',
                        like:12,
                        username:'黄小安',
                        content:'如何躺着也能暴富',
                        time:'01-01',
                        province:'广东',
                        avatar:'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                        children:[
                            {
                                id:'4',
                                parentId:'3',
                                parentUserName:'黄小安',
                                like:12,
                                username:'王五',
                                content:'程序员的破防瞬间 程序员的破防瞬间程序员的破防瞬间',
                                time:'01-01',
                                province:'广东',
                                avatar:'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
                                children:[]
                            }
                        ]
                    },
                ]
            },
        ]
    },
    {
        id:'5',
        parentId:'',   
        like:12,
        username:'张三',
        content:'如何躺平也能暴富',
        time:'01-01',
        province:'广东',
        avatar:'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
        children:[]
        }
])
// 评论内容
const commentValue = ref('')
// 点赞数
const like = ref(99999)
// 收藏数
const collect = ref(99999)
// 关注
const isFollow = ref(false)
  const images = ref([
    'https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320',
    'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
])
const goBack = () => {
    router.go(-1)
}
const goUserDetail = () => {
    router.push({name:'userDetail',query:{id:route.query.id}})
}
const followChange = () => {
    isFollow.value =!isFollow.value
}

</script>
<template>
<div class="page-content page">
   <header class="header">
    <div class="header-left">
        <van-icon name="arrow-left" size="6vw" @click="goBack" />
        <div class="user-info">
            <van-image 
            fit="cover"
            round
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            class="user-img"
            @click="goUserDetail"
            />
                <div class="user-name">
                    {{ '张三张三张三张三张三张三张三张三张三张三' }}
                </div>
        </div>
    </div>
    <div class="header-right">
        <div :class="['right',isFollow?'black':'red']" @click="followChange">
                      {{ isFollow ? '已关注' : '关注' }}
        </div>
    </div>
   </header>
   <main class="main">
    <div class="top">
        <van-swipe  lazy-render :loop="false">
            <van-swipe-item class="item" v-for="image in images" :key="image">
                <img :src="image"  fit="cover" class="img"/>
            </van-swipe-item>
            <template #indicator="{ active, total }">
                <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div>
            </template>
        </van-swipe>
    </div>
      <div class="center">
            <div class="title">
                程序员的破防瞬间
            </div>
            <div class="content">
                自爆痛点“新来的校招生比你便宜还比你好用”
            </div>
            <div class="date"><span>12/09</span><span>深圳</span></div>
      </div>
      <div class="bottom">
        <div class="comment-count">
            共有{{ '1' }}条评论
        </div>
        <Comment 
        v-for="item in datalist"
        :id="item.id"
        :parentId="item.parentId"
        :parentUserName="item.parentUserName"
        :username="item.username"
        :content="item.content"
        :time="item.time"
        :province="item.province"
        :avatar="item.avatar"
        :children="item.children"
        :like="item.like"
        >
        </Comment>
      </div>
   </main>
   <footer>
        <div class="left">
            <van-field v-model="commentValue"left-icon="smile-o" placeholder="说点什么" class="input" />
        </div>
        <div class="right">
            <div class="like">
                <van-rate v-model="like" icon="like" void-icon="like-o" count="1" clearable />
            <span>{{ like }}</span>
            </div>
            <div class="collect">
                <van-rate
                v-model="collect"
                count="1"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
                />
                <span>{{ collect }}</span>
            </div>
        </div>
   </footer>
</div>
</template>

<style scoped lang='scss'>
.page{
    padding: 0;
}
.custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 10px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.3);
  }
.user-name,.title{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.header{
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    padding:30px 30px 30px 10px ;
    align-items: center;
    height:8vw;
    width: 100%;
    background-color: #fff;
    .header-left{
        display: flex;
        .user-info{
            margin-left: 20px;
            display: flex;
            align-items: center;
            .user-img{
            margin-right: 10px;
            width:6vw;
            height: 6vw;
            }
            .user-name{
                width: 40vw;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        } 
    }
    .header-right{
        display: flex;
       .right{
        width: 80px;
        height: 2em;
        line-height: 2em;
        border-radius: 1em;
        text-align: center;
        font-weight: 500;
        }
    .red{
            border: 1px solid #e10a2a;
            color: #e10a2a;
        }
        .black{
            border: 1px solid #898989;
        }
    }
}
.main{
    margin-top: 14vw;
    margin-bottom: 14vw;
    width: 100%;
    .center{
        padding: 10px;
    }
    .item{
        overflow: hidden;
        width: 100%;
        .img{
        height: auto;
        width: 100%;
        }
    }
    :deep(.van-swipe__track){
        align-items: center;
    }
    .title{
        font-size: 1.4em
    }
    .date{
        font-size: 0.8em;
        color: #898989;
        span{
            margin-right: 10px;
        }
    }
    .bottom{
        padding: 10px;
        padding-bottom: 14vw;
        .comment-count{
            font-size: 1em;
            color: #898989;
        }
    }
}
footer{
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    width: 100%;
    height: 14vw;
    background-color: #fff;
    .input{
        height: 40px;
        border-radius: 20px;
        background-color: #eee;
    }
    .right{
        width: 40vw;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        span{
            margin-left: 5px;
        }
    }
}

</style>