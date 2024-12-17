import { defineStore } from "pinia"
import { ref, watch } from "vue"
export const useSearchHistoryStore = defineStore("searchHistory", () => {
    const searchHistoryList = ref<string[]>([])
   /**
    * 将搜索的值添加到搜索历史中
    * @param value 搜索的值
    */
    const setSearchHistoryList = (value: string) => {
        if (searchHistoryList.value.indexOf(value) === -1) {
            searchHistoryList.value.push(value)
        }
    }
  /**
   * 删除单个搜索历史
   * @param index 删除值对应的下标
   */
    const deleteSearchHistory = (index:number) => {
        searchHistoryList.value.splice(index, 1);
    }
   /**
    * 清空搜索历史
    */
    const clearSearchHistoryList = () => {
        searchHistoryList.value.length = 0
    }
    return {
        searchHistoryList,
        setSearchHistoryList,
        clearSearchHistoryList,
        deleteSearchHistory
    }
},{
    persist:true
  }
)