<script setup lang='ts' name=''>
import { ref } from "vue";
import ProfileItem from "./components/ProfileItem.vue";
const active = ref(0)
const activeNote = ref(0)
</script>
<template>
  <div class="page">
    <div class="top">
      <header class="header">
        <van-icon name="setting-o" class="setting" size="6vw" />
      </header>
      <!-- 个人信息 -->
      <div class="user-info">
        <van-image 
        round
        fit="cover"
        width="100px"
        height="100px"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          class="user-img"
          />
          <div class="right">
            <div class="user-name">
              张三张三张三
            </div>
            <div class="user-id">
              <div>id: 12323412</div>
              <div>IP属地：深圳</div>
            </div>
          </div>
      </div>
      <!-- 个人简介 -->
       <div class="intro">
        这里是简介，这里是简介，这里是简介这里是简介这里是简介这里是简介这里是简介
       </div>
       <div class="profile">
        <ProfileItem text="关注" :number="123"></ProfileItem>
        <ProfileItem text="粉丝" :number="123"></ProfileItem>
        <ProfileItem text="收藏" :number="123"></ProfileItem>
          <div class="edit">
            <RouterLink :to="{name:'editInfo'}">编辑资料</RouterLink>  
          </div>
       </div>
    </div>
    <div class="bottom">
      <van-tabs v-model:active="active" sticky >
        <van-tab  title="笔记">
            <van-tabs class="son" v-model:active="activeNote" >
                <van-tab title="公开">内容 1</van-tab>
                <van-tab title="私密">内容 2</van-tab>
            </van-tabs>
        </van-tab>
        <van-tab  title="收藏">
        </van-tab>
        <van-tab  title="赞过">
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.top::after{
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  content: '';
  width: 100%;
  height: 100%;
  background: rgba(9, 8, 8, 0.6);
}
.top{
  position: relative;
  z-index: 100;
  width: 100%;
  height: 40%;
  color: #aca9aa;
  // background: rgba(9, 8, 8, 0.8);
  background-image: url('https://preview.qiantucdn.com/meijing/73/20/58/46T58PICIUhqnC92dkBmI_PIC2018.jpg!qt_w320');
  background-size: cover;
  .header{
    padding: 20px;
    width: 100%;
    height: 10vw;
    .setting{
    margin-left: calc(100% - 12vw);
    }
  }
  .user-info{
    display: flex;
    align-items: center;
    padding: 10px;
    .right{
      margin-left: 20px;
      color: #ede8e8;
      .user-name{
        width: calc(100vw - 140px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 1.5em;
      }
      .user-id{
        color: rgb(143, 133, 141);
      }
    }
  }
  .intro{
    padding: 10px;
  }
  .profile{
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #d2cecb;
    text-align: center;
    .edit{
      width: 100px;
      height: 2em;
      line-height: 2em;
      background-color:#736464 ;
      border-radius: 1em;
      a{
        color: #d2cecb;
      }
    }
  }
}
:deep(.van-tabs__line){
    background-color: #e10a2a;
    }
:deep(.son .van-tabs__line){
        display: none;
      }

</style>