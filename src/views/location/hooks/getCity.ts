
import axios from "axios";
import { ref } from "vue";
import type { CityInfo } from "../type";

export default function useCity(){
    // 获取当前位置信息
    const cityInfo = ref<CityInfo>({
        city: '',
        citycode: '',
        province: '',
    })
    const locationInfo = ref({
        latitude: '',
        longitude: ''
    })
    // 定义API Key
    const apiKey = '7527e8d695b957eed8793bb60651869a'
    /**
     *   获取当前城市信息
     */
  async function  getLocation() {
      const res = await axios.get(`https://restapi.amap.com/v3/ip?key=${apiKey}`)
      cityInfo.value.citycode = res.data.adcode
      cityInfo.value.city = res.data.city
      cityInfo.value.province = res.data.province
    }
      return {
        cityInfo,
        locationInfo,
        getLocation
    }
}