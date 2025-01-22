
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

  /**
   *   获取当前城市信息
   */
  async function getLocation() {
    await axios.get('https://myip.ipip.net/').then((data) => {
      myIP.value = data.data.slice(6)
      myIP.value = myIP.value.split(' ')[0]
      // 获取当前省份和城市
      cityInfo.value.province = data.data.slice(28).split('国 ')[0].slice(0, 4)
      cityInfo.value.city = data.data.slice(28).split(`${cityInfo.value.province} `)[0].slice(4, 8)
    }).catch((err) => {
      console.log(err)
    })

  }
  return {
    cityInfo,
    getLocation,
  }
}