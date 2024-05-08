import request from '../utils/request'

//社区初始化
export function getTopicsByTag(current, size, tab,search,tagName) {
    return request({
        url:'/tag/list',
        method:'get',
        params:{
            current,
            size,
            tab,
            search,
            tagName
        }
    })
}

//用户是否关注此社区
export function isFollow(userId,tagName){
    return request({
        url:'/tag/noToken_list',
        method:'get',
        params:{
            userId,
            tagName
        }
    })
}

//关注/取关
export function follow(follow,tagName) {
    return request({
        url:'/tag/follow',
        method:'get',
        params:{
            follow,
            tagName
        }
    })
}

//返回热门贴社区
export function hotTag() {
    return request({
        url:'/tag/hot',
        method:'get'
    })
}

//搜索社区
export function searchTags(pageNo,pageSize,search) {
    return request({
        url:'/tag/search',
        method:'get',
        params:{
            pageNo,
            pageSize,
            search
        }
    })
}

//创建社区
export function createTag(name,description,avatar) {
    return request({
        url:'/tag/create',
        params:{
            name,
            description,
            avatar
        }
    })
}

//取消上传的头像
export function deleteTagAvatar(oldUrl) {
    return request({
        url:'/tag/deleteAvatar',
        params:{
            oldUrl
        }
    })
}

//删除社区
export function deleteTag(tagId) {
    return request({
        url:'/tag/deleteTag',
        params:{
            tagId
        }
    })
}

//更新社区头像
export function updateAvatar(tag) {
    return request({
        url:'/tag/updateAvatar',
        method:'post',
        data:tag
    })
}

//修改社区资料
export function updateTagDescription(tagId,description) {
    return request({
        url:'/tag/updateDescription',
        method:'get',
        params:{
            tagId,
            description
        }
    })
}

//获取社区列表
export function getTagList(key) {
    return request({
        url:'/tag/getTagList',
        method:'get',
        params:{
            key
        }
    })
}



