
import axios from "axios";
import { ref } from "vue";
import type { CityInfo } from "../type";

// 定义位置信息的类型
interface LocationInfo {
  latitude: number; // 纬度
  longitude: number; // 经度
  address: string; // 地址
}

export default function useCity() {
  // 获取当前位置信息
  const cityInfo = ref<CityInfo>({
    city: '',
    citycode: '',
    province: '',
  })
  const myIP = ref('')
  // 定义API Key
  const ak = 'tFO77sUDV25YzNZqu4yZRRkxhANIPOKo'
  /**
   *   获取当前城市信息
   */
  async function getLocation() {
    await axios.get('https://myip.ipip.net/').then((data) => {
      myIP.value = data.data.slice(6)
      myIP.value = myIP.value.split(' ')[0]
    }).catch((err) => {
      console.log(err)
    })
    const res = await axios.get(`http://journeybook.cn/baiduMap/location/ip?ip=${myIP.value}&ak=${ak}`)
    cityInfo.value.citycode = res.data.adcode
    cityInfo.value.city = res.data.city
    cityInfo.value.province = res.data.province
    console.log(res.data);

  }
  return {
    cityInfo,
    getLocation,
  }
}