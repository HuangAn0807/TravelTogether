import { defineStore } from "pinia";
import { parse, stringify } from 'zipson'
import { ref } from "vue";
export const useUserStore = defineStore("user", () => {
    const token = ref("");
    const userInfo=ref({

    });
    // 设置token
    const setToken = (value:string) => {
        token.value = value
    };
    // 设置用户信息
    const setUserInfo = (value:object) => {
        userInfo.value = value
    };
    return {
        token,
        userInfo,
        setToken,
        setUserInfo
    }
},{
    persist:true
  }
)