import request from '../utils/request'

//视频列表
export function getVideoList(search) {
    return request({
        url:'/video/list',
        method:'get',
    })

}
//搜索视频
export function getVideoListByName(search) {
    return request({
        url:'/video/listByName',
        method:'get',
        params:{
            search
        }
    })
}

//搜索视频
export function getVideoById(id) {
    return request({
        url:'/video/getVideoById',
        method:'get',
        params:{
            id
        }
    })
}

//增加视频播放量
export function increaseCount(id) {
    return request({
        url:'/video/increaseCount',
        method:'get',
        params:{
            id
        }
    })
}

//获取四个最热视频
export function getHotList() {
    return request({
        url:'/video/getHotList',
        method:'get',
    })
}

//删除视频
export function deleteVideo(id) {
    return request({
        url:'/video/deleteVideo',
        method:'get',
        params:{
            id
        }
    })
}

//删除视频
export function createVideo(data) {
    return request({
        url:'/video/createVideo',
        method:'post',
        data
    })
}





