import { ref,watch } from 'vue'
import axios from 'axios'
import type {ScenicSpotInfo} from '../type'
/**
 * 
 * @returns 返回景点信息数组，以及搜索景点的方法，以及将下滑获取的景点信息添加到数组中的方法
 */
export default function useSearchAttractions() {
    // 景点列表
    const pois = ref<ScenicSpotInfo[]>([])
    // 城市景点数量
    const cityPoisCount = ref(0)
    /**
     * 搜索城市景点
     * @param city 城市名称
     * @param num 页数
     *  
     */
    const searchAttractions = async (city: string,num:number = 1) => {
        const params = ref({
            key: '7527e8d695b957eed8793bb60651869a',
            keywords: city ,
            types: '旅游景点|公园广场|公园|动物园|植物园|水族馆|城市广场|公园内部设施|风景名胜|世界遗产|国家级景点|省级景点|纪念馆|寺庙道观|教堂|回教寺|海滩|观景点|红色景区',
            extensions: 'all',
            page_size:'20',
            page_index:`${num}`
          })
          try {
            const response = await axios.get('https://restapi.amap.com/v3/place/text',{params:params.value});
            const data = response.data;
            cityPoisCount.value = data.count
            if (data.status === '1' && data.info === 'OK') {
              if(pois.value.length===0){
                pois.value = data.pois;
              }else{
                pushPois(data.pois)
              }  
            } else {
              console.error('搜索失败：', data.info);
            }
          } catch (error) {
            console.error('请求失败：', error);
          }
         
    }
    /**
     * 
     * @param poi 将下滑获取的景点信息添加到数组中
     */
    const pushPois = (poi:ScenicSpotInfo[]) => {
      poi.forEach(element => {
        pois.value.push(element)
      });
       
    }
    return {
        pois,
        cityPoisCount,
        searchAttractions,
        pushPois
      }
}