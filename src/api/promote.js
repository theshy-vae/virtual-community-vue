import request from '../utils/request'

export function getList(key) {
    return request({
        url:'/promotion/all',
        method:'get',
        params:{
            key
        }
    })
}

//删除推广
export function deleteP(id) {
    return request({
        url:'/promotion/deleteP',
        method:'get',
        params:{
            id
        }
    })
}

//创建推广
export function createPromotion(data) {
    return request({
        url:'/promotion/createPromotion',
        method:'post',
        data
    })
}