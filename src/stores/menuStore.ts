import { defineStore } from "pinia";
import { ref } from "vue";
export const useMenuStore = defineStore("menu", () => {
    // 定义活动菜单
    const active = ref('home')
    // 设置活动菜单
    const setActive = (value:string) => {
            active.value = value
        }
        return {
            active,
            setActive
        }
    } 
)