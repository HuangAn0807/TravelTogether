<script setup lang='ts' name=''>
const {text,show,index,changeSearch} = defineProps<{
  text:string,
  show:boolean,
  index:number,
  changeSearch:(text:string)=>void,
}>()
const emit = defineEmits<{
  (e:'delHistory',index:number):void
}>()
const delHistory = () => {
  emit('delHistory',index)
}
</script>
<template>
  <div class="item">
   <span @click="changeSearch(text)"> {{ text }}</span>
    <van-icon name="close" size="4vw" class="close" v-show="show" @click="delHistory"/>
  </div>
</template>

<style scoped lang='scss'>
.item{
    padding: 0 10px;
    margin: 5px 10px;
    width: fit-content;
    max-width: 30%;
    height: 2.5em;
    line-height: 2.5em;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border: 1px solid #9c9f9f ;
    border-radius: 1.25em;
    .close{
      margin-left: 5px;
    }
}
</style>