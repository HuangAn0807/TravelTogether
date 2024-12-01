<script setup lang='ts' name=''>
defineProps({
    cardData: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div class="item">
            <van-image
            class="item-img"
              fit="contain"
              :src="cardData.img" 
            >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" />
            </template>
            </van-image>
            <div class="text">
             {{ cardData.text}}
            </div>
            <div class="user">
              <div class="user-info">
                <van-image 
                fit="cover"
                round
                :src="cardData.userImg"
                class="user-img"
                />
                <div class="user-name">
                  {{ cardData.user }}
                </div>
              </div>
              <div class="like">
                <van-rate v-model="cardData.like" icon="like" void-icon="like-o" count="1" clearable /><span>{{ cardData.like }}</span>
              </div>
            </div>
          </div>
</template>

<style scoped lang='scss'>
 .item{
      // flex: 1 1;
      break-inside: avoid;
      width: calc(50% - 20px);
      background-color: #fff;
      margin: 10px;
      height: fit-content;
      overflow: hidden; /* 隐藏溢出内容 */
      text-overflow: ellipsis; /* 使用省略号表示溢出内容 */
      .item-img{
          width: 100%;
          padding: 0;
      }
      .text{
          height: 4em;
          max-height: 4em;
          width: 100%;
          display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          padding: 10px;
          color: #000;
      }
      .user{
        width: 100%;
        padding: 10px;
        display: flex;
        justify-content:space-between;
        .user-info{
          display: flex;
          align-items: center;
          .user-img{
            margin-right: 10px;
            width: 20px;
            height: 20px;}
        } 
        .user-name{
          width: 60px;
          white-space: nowrap; /* 禁止文本换行 */
          overflow: hidden; /* 隐藏溢出内容 */
          text-overflow: ellipsis; /* 使用省略号表示溢出内容 */
          color: #000;
        }
        .like{
          width: 42%;
          display: flex;
          span{
          text-overflow: ellipsis; /* 使用省略号表示溢出内容 */
          }
        }
      }
    }
</style>