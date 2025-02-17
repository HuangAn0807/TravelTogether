
import axios from "axios";
import { ref } from "vue";
import type { CityInfo } from "../views/location/type";

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
      cityInfo.value.province = data.data.split('：')[2].split(' ')[1]
      cityInfo.value.city = data.data.split('：')[2].split(' ')[2]
    }).catch((err) => {
      console.log(err)
    })

  }
  /**
   * 
   * @param location 经纬度
   */
  async function getPlace(location: string) {
    const res = await axios.get(`https://restapi.amap.com/v3/geocode/regeo?location=${location}&key=7527e8d695b957eed8793bb60651869a&radius=300`)
    console.log(res.data);

  }
  /**
   * 
   * @param code 城市编码
   * @returns 城市信息
   */
  async function getCity(code: string) {
    const res = await axios.get(`https://restapi.amap.com/v3/config/district?keywords=${code}&subdistrict=0&key=7527e8d695b957eed8793bb60651869a`)
    return res.data.districts[0].name;

  }
  return {
    cityInfo,
    getLocation,
    getPlace,
    getCity
  }
}