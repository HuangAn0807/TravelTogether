
export type Form = {
    avatar?: string,//头像
    nickname: string,//用户名
    introduction: string,//简介
    sex: number,//性别
    birthday: string,//生日
    backgroundImg?: string,//背景图
    journeyBookId: string,//用户id
    provincialCode: string,//省份编码
    cityCode: string,//城市编码
}
type Value = {
    text: string
}[]
export type Select = {
    selectedValues: string[],
    selectedOptions: Value,
    selectedIndexes: number[],
}