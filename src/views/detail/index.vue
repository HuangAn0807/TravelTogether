<script setup lang='ts' name=''>
import { useRoute,useRouter } from 'vue-router';
import {ref} from 'vue'
const route = useRoute();
const router = useRouter()
// 评论内容
const commentValue = ref('')
// 点赞数
const like = ref(99999)
// 收藏数
const collect = ref(99999)
  const images = ref([
    'https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320',
    'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
])
console.log(route.query.id);
const goBack = () => {
    router.go(-1)
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
            />
                <div class="user-name">
                    {{ '张三张三张三张三张三张三张三张三张三张三' }}
                </div>
        </div>
    </div>
    <div class="header-right">
        <van-button type="danger" plain round  class="follow">关注</van-button>
    </div>
   </header>
   <main class="main">
    <div class="top">
        <van-swipe  lazy-render>
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
    padding:30px ;
    padding-bottom: 20px;
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
        .follow{
        margin-right: 10px;
        font-size: 3vw;
        width: 15vw;
        height: 6vw;
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
    ::v-deep .van-swipe__track{
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