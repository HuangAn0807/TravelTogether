<script setup lang='ts' name=''>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const {isFollow} = defineProps<{
    isFollow:boolean
}>()
// 定义followChange将isFollow的值取反传给父组件
const emit = defineEmits(['followChange'])
const followChange = () => {
    // 触发父组件的followChange事件更改isFollow的值
    emit('followChange',!isFollow)
}
const toUserDetail = () => {
router.push({
        path:'/userDetail',
        query:{
            userId:123,
        }
    })
}
</script>
<template>
  <div class="user">
    <div class="left" @click="toUserDetail">
        <van-image 
        fit="cover"
        round
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        class="user-img"
        />
        <div class="info" >
            <div class="user-name">
                羊毛卷卷 羊毛卷卷 羊
            </div>
            <div  class="intro">
                <slot name="intro"></slot>
            </div>
            <div class="fans">
                <slot name="fans"></slot>
            </div>
        </div>
    </div>
    <div :class="['right',isFollow?'red':'black']" @click="followChange">
        <slot name="follow"></slot>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.user-name,.intro,.fans span{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.user{
    padding: 8%;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
        display: flex;
        justify-content: space-between;
        .user-img{
            margin-right: 10px;
            width: 40px;
            height: 40px;
        }
        .info{
            .user-name{
                width: 150px;
            }
            .intro,.fans{
             color: #898989;
            }
          
    }
      
}
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
</style>