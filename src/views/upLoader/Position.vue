<template>
    <div>
      <!-- 显示当前城市 -->
      <p>当前城市: {{ city }}</p>
      <!-- 显示当前地区 -->
      <p>当前地区: {{ district }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        city: '', // 存储当前城市信息
        district: '' // 存储当前地区信息
      };
    },
    created() {
      this.getLocationByIP(); // 组件创建时调用获取当前位置的方法
    },
    methods: {
      async getLocationByIP() {
        const apiKey = '7527e8d695b957eed8793bb60651869a'; // 请替换为你自己的API Key
        // 构建高德IP定位服务的URL
        const locationUrl = `https://restapi.amap.com/v3/ip?key=${apiKey}`;
  
        try {
          const response = await axios.get(locationUrl); // 发送HTTP GET请求到高德IP定位服务
          if (response.data && response.data.status === '1') { // 判断请求是否成功（状态码为1表示成功）
            const location = response.data.rectangle; // 获取定位结果中的矩形区域
            if (location) {
              const [lat1, lng1, lat2, lng2] = location.split(';').flatMap(coord => coord.split(','));
              const centerLatitude = ((parseFloat(lat1) + parseFloat(lat2)) / 2).toFixed(6); // 计算并格式化中心点的纬度
              const centerLongitude = ((parseFloat(lng1) + parseFloat(lng2)) / 2).toFixed(6); // 计算并格式化中心点的经度
              this.getCityAndDistrict(centerLatitude, centerLongitude); // 调用方法获取城市和地区信息
            } else {
              console.error('无法获取定位信息');
            }
          } else {
            console.error('获取定位信息失败:', response.data); // 打印错误信息
          }
        } catch (error) {
          console.error('请求高德IP定位服务出错:', error); // 捕获并打印请求错误
        }
      },
      async getCityAndDistrict(latitude, longitude) {
        const apiKey = '7527e8d695b957eed8793bb60651869a'; // 请替换为你自己的API Key
        // 构建高德逆地理编码服务的URL
        const geocodeUrl = `https://restapi.amap.com/v3/geocode/regeo?location=${latitude},${longitude}&key=${apiKey}`;
  
        try {
          const response = await axios.get(geocodeUrl); // 发送HTTP GET请求到高德逆地理编码服务
          console.log('Response:', response); // 打印完整响应内容
          if (response.data && response.data.status === '1') { // 判断请求是否成功（状态码为1表示成功）
            const addressComponent = response.data.regeocode.addressComponent;
            console.log(addressComponent);
            
            this.city = addressComponent.city || addressComponent.province; // 提取城市信息，优先使用city字段，如果没有则使用province字段
            this.district = addressComponent.district; // 提取地区信息
          } else {
            console.error('获取位置信息失败:', response.data); // 打印错误信息
          }
        } catch (error) {
          console.error('请求高德API出错:', error); // 捕获并打印请求错误
        }
      }
    }
  };
  </script>
  