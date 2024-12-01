<template>
    <div class="errPage-container">
      <el-button icon="arrow-left" class="pan-back-btn" @click="back">
        返回
      </el-button>
      <h2>401错误!对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</h2>
      <div> 
        <router-link to="/">
                回到首页
        </router-link>
    </div>
     
    </div>
  </template>
  
<script setup lang="ts" name="401">
import {useRouter} from "vue-router";
const router = useRouter();
 const back = () => {
    router.go(-1)
  }
</script>
  
  <style lang="scss" scoped>
    .errPage-container {
      width: 100%;
      max-width: 100%;
     padding: 20px;
      .pan-back-btn {
        // background: #008489;
        color: rgb(23, 107, 235);
        border: none!important;
      }
      
    }
  </style>
  