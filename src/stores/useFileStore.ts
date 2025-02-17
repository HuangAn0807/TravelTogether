import { defineStore } from "pinia"
// import type { UploaderFileListItem } from "vant" // 请根据实际路径修改
import { ref } from "vue"
export const useFilelistStore = defineStore("file", () => {
    const fileList = ref([])
    const setFileList = (value: any) => {
        fileList.value = value
    }
    return {
        fileList,
        setFileList
    }
})