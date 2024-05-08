import request from "../utils/request";

//发送弹幕
export function sendDanMu(danmu) {
    return request({
        url:'/danmu/sendDM',
        method:'post',
        data:danmu
    })
}

//获取弹幕
export function getDMById(id) {
    return request({
        url:'/danmu/getDMById',
        method:'get',
        params:{
            id
        }
    })
}