<template>
    <div>
      <input v-model="searchKeyword" @keyup.enter="searchPOI" placeholder="输入关键词搜索POI">
      <button @click="searchPOI">搜索</button>
      <div v-if="pois.length > 0">
        <div v-for="(poi, index) in pois" :key="index">
          {{ poi.name }} - {{ poi.address }}
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchKeyword: '',
        pois: []
      };
    },
    methods: {
      async searchPOI() {
        const API_KEY = '7527e8d695b957eed8793bb60651869a';
        const TYPE = '景点'; // 可选，用于指定搜索类型，如餐饮、酒店等
        const CITY = ''; // 可选，用于指定搜索城市，如'北京'的代码是'110000'
        const CITYGRID = ''; // 可选，用于网格化搜索
        const RADIUS = '5000'; // 可选，用于周边搜索
        const EXTENSIONS = 'all'; // 返回结果中需要包含的扩展信息，默认为'base'，可选'all'
        const OUTPUT = 'JSON'; // 返回结果的数据格式，默认为'JSON'
        const PAGE_SIZE = '10'; // 每页返回的结果数量
        const PAGE_INDEX = '1'; // 返回结果的页码
  
        const params = {
          key: API_KEY,
          keywords: this.searchKeyword,
          types: TYPE,
          city: CITY,
          citygrid: CITYGRID,
          radius: RADIUS,
          extensions: EXTENSIONS,
          output: OUTPUT,
          page_size: PAGE_SIZE,
          page_index: PAGE_INDEX
        };
  
        try {
          const response = await axios.get('https://restapi.amap.com/v3/place/text', { params });
          const data = response.data;
          if (data.status === '1' && data.info === 'OK') {
            this.pois = data.pois;
          } else {
            console.error('搜索失败：', data.info);
          }
        } catch (error) {
          console.error('请求失败：', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* 添加你的样式 */
  </style>