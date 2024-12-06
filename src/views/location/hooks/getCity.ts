
import axios from "axios";
import { ref } from "vue";
export default function useCity(){
    // 定义城市信息类型
    type CityInfo = {
        city: string,
        citycode: string,
    }
    // 获取当前位置信息
    const cityInfo = ref<CityInfo>({
        city: '',
        citycode: ''
    })
    // 定义API Key
    const apiKey = '7527e8d695b957eed8793bb60651869a'
    async function getLocationByIP() {
        // 构建高德IP定位服务的URL
        const locationUrl = `https://restapi.amap.com/v3/ip?key=${apiKey}`;
        try {
          const response = await axios.get(locationUrl); // 发送HTTP GET请求到高德IP定位服务
          if (response.data && response.data.status === '1') { // 判断请求是否成功（状态码为1表示成功）
            const location = response.data.rectangle; // 获取定位结果中的矩形区域
            if (location) {
              const [lat1, lng1, lat2, lng2] = location.split(';').flatMap((coord:string) => coord.split(','));
              const centerLatitude = ((parseFloat(lat1) + parseFloat(lat2)) / 2).toFixed(6); // 计算并格式化中心点的纬度
              const centerLongitude = ((parseFloat(lng1) + parseFloat(lng2)) / 2).toFixed(6); // 计算并格式化中心点的经度
              getCityAndDistrict(centerLatitude, centerLongitude); // 调用方法获取城市和地区信息
            } else {
              console.error('无法获取定位信息');
            }
          } else {
            console.error('获取定位信息失败:', response.data); // 打印错误信息
          }
        } catch (error) {
          console.error('请求高德IP定位服务出错:', error); // 捕获并打印请求错误
        }
      }
      async function getCityAndDistrict(latitude:string, longitude:string) {
        // 构建高德逆地理编码服务的URL
        const geocodeUrl = `https://restapi.amap.com/v3/geocode/regeo?location=${latitude},${longitude}&key=${apiKey}`;
  
        try {
          const response = await axios.get(geocodeUrl); // 发送HTTP GET请求到高德逆地理编码服务
          console.log('Response:', response); // 打印完整响应内容
          if (response.data && response.data.status === '1') { // 判断请求是否成功（状态码为1表示成功）
            const addressComponent = response.data.regeocode.addressComponent;
            cityInfo.value.city = addressComponent.city || addressComponent.province; // 提取城市信息，优先使用city字段，如果没有则使用province字段
            cityInfo.value.citycode = addressComponent.citycode || addressComponent.adcode; // 提取城市编码信息，优先使用citycode字段，如果没有则使用adcode字段 
          } else {
            console.error('获取位置信息失败:', response.data); // 打印错误信息
          }
        } catch (error) {
          console.error('请求高德API出错:', error); // 捕获并打印请求错误
        }
       
      }
      return {
        getLocationByIP,
        cityInfo
    }
}