import { defineStore } from "pinia";
import { ref } from "vue";
export type User = {
    id: number,
    journeyBookId: string,
    nickname: string,
    avatar: string,
    birthday: string,//生日
    age: number | undefined,
    backgroundImg: string,//背景图
    phone: string,//手机号
    sex: number,//性别
    introduction: string,//个人简介
    createTime: string,
    provincialCode: string,//省份编码
    cityCode: string //城市编码
    province: string,//ip所在省份,
    fansTotal: number,//粉丝数
    followingTotal: number,//关注数
    collectTotal: number,//收藏数
}
export const useUserStore = defineStore("user", () => {
    const token = ref("");
    const userInfo = ref<User>({
        id: 0,
        age: undefined,
        journeyBookId: "",
        nickname: "",
        avatar: "",
        birthday: "",
        backgroundImg: "",
        phone: "",
        sex: 0,
        introduction: "",
        createTime: "",
        provincialCode: "",
        cityCode: '',
        province: " ",
        fansTotal: 0,
        followingTotal: 0,
        collectTotal: 0,
    });
    const district = ref("")
    const setDistrict = (value: string) => {
        district.value = value
    }
    // 设置token
    const setToken = (value: string) => {
        token.value = value
    };
    // 设置用户信息
    const setUserInfo = (value: any) => {
        userInfo.value = value
    };
    return {
        token,
        userInfo,
        district,
        setDistrict,
        setToken,
        setUserInfo,
    }
}, {
    persist: true
}
)