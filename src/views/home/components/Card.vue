<script setup lang='ts' name=''>
import {ref,onMounted,computed} from "vue";
const {cardData,arr} = defineProps<{
  cardData: {
    id: number;
    img: string;
    text: string;
    user: string;
    userImg: string;
    like: number;
  },
  arr: number[];
}>();
const card = ref<HTMLDivElement>()
// 获取屏幕宽度
const bodyWidth = ref(document.body.clientWidth)
// 最小值的下标
const minIndex = ref(0)
window.onresize = () => {
    bodyWidth.value = document.body.clientWidth;
    console.log(123);
    
    setCardPosotion()
}
// 获取屏幕宽度计算出每个item的宽度
const cardWidth = computed(() => (bodyWidth.value-30)/2)

// 设置当前元素的位置
const setCardPosotion = () => {
        minIndex.value = arr.indexOf(Math.min(...arr));
        if(minIndex.value%2===0){
            // 如果是第一列就增加10px的左边距
            card.value!.style.left = `${minIndex.value * cardWidth.value + 10}px`;
        }else{
            // 如果是第二列就增加20px的左边距
            card.value!.style.left = `${minIndex.value * cardWidth.value + 20 }px`;
        }
        // 设置当前元素的距离顶部的位置
        card.value!.style.top = `${arr[minIndex.value]}px`;
        // 设置当前元素的宽度
        card.value!.style.width = `${cardWidth.value}px`;
        arr[minIndex.value] += card.value!.clientHeight+10 || 0;
    }  
onMounted(() => {
    setCardPosotion()
})
</script>
<template>
  <div class="card" ref="card" >
            <van-image
            class="card-img"
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
 .card{
      position: absolute;
      background-color: #fff;
      height: fit-content;
      overflow: hidden; /* 隐藏溢出内容 */
      text-overflow: ellipsis; /* 使用省略号表示溢出内容 */
      border-radius: 5px;
      .card-img{
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
            height: 20px;
            }
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