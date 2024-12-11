
import axios from "axios";
import { ref } from "vue";
import type { CityInfo } from "../type";
import useSearchAttractions from "./searchAttractions";
export default function useCity(){
    // 获取当前位置信息
    const cityInfo = ref<CityInfo>({
        city: '',
        citycode: '',
        district: '',
        abcode: ''
    })
    const locationInfo = ref({
        latitude: '',
        longitude: ''
    })
    // 定义API Key
    const apiKey = '7527e8d695b957eed8793bb60651869a'
    /**
     *   获取当前位置信息
     */
  async function  getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => { 
            // 成功获取位置信息
            locationInfo.value.latitude = String(position.coords.latitude)
            locationInfo.value.longitude = String(position.coords.longitude)
            getCityAndDistrict(locationInfo.value.longitude,locationInfo.value.latitude)
            
          },
          (error) => {
           console.log(error);
           
          }
        );
      } else {
       console.log( "浏览器不支持地理定位。");
      }
    }
      /**
       * 
       * @param latitude 经度
       * @param longitude 纬度
       * 根据经纬度获取城市和地区
       */
      async function getCityAndDistrict(latitude:string, longitude:string) {
        // 构建高德逆地理编码服务的URL
        const geocodeUrl = `https://restapi.amap.com/v3/geocode/regeo?location=${latitude},${longitude}&key=${apiKey}`;
        try {
          const response = await axios.get(geocodeUrl); // 发送HTTP GET请求到高德逆地理编码服务
          if (response.data && response.data.status === '1') { // 判断请求是否成功（状态码为1表示成功）
            const addressComponent = response.data.regeocode.addressComponent;
            cityInfo.value.city = addressComponent.city || addressComponent.province; // 提取城市信息，优先使用city字段，如果没有则使用province字段
            cityInfo.value.citycode = addressComponent.citycode || addressComponent.adcode; // 提取城市编码信息，优先使用citycode字段，如果没有则使用adcode字段 
            cityInfo.value.abcode =  addressComponent.adcode
            cityInfo.value.district = addressComponent.district
            // console.log(pois.value);
          } else {
            console.error('获取位置信息失败:', response.data); // 打印错误信息
          }
        } catch (error) {
          console.error('请求高德API出错:', error); // 捕获并打印请求错误
        }
       
      }
      return {
        cityInfo,
        locationInfo,
        getLocation
    }
}