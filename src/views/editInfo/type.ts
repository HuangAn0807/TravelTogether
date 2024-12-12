import type { UploaderFileListItem } from 'vant';
export type Form = {
    avatar:UploaderFileListItem[],//头像
    username: string,//用户名
    id:string,//id
    intro:string,//简介
    sex:string,//性别
    birthday:string[],//生日
    area:string[],//地区
    bgImg:UploaderFileListItem[],//背景图
}
type Value = {
    text:string
}[]
export type Select = {
    selectedValues:string[],
    selectedOptions:Value,
    selectedIndexes:number[],
}