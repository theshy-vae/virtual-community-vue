import request from '../utils/request'

//列表
export function getList(pageNo,size,tab,search) {
    return request({
        url:'/post/list',
        method:'get',
        params:{pageNo:pageNo,size:size,tab:tab,search:search}
    })
}

//发布
export function post(topic){
    return request({
        url:'/post/create',
        method:'post',
        data:topic
    })
}

//帖子详情
export function getTopic(id) {
    return request({
        url:'/post',
        method:'get',
        params:{
            id:id
        }
    })
}

//获取详情页推荐
export function getRecommendTopics(id) {
    return request({
        url:'/post/recommend',
        method:'get',
        params:{
            topicId:id
        }
    })
}

//删除帖子
export function deleteTopic(id) {
    return request({
        url:'/post/delete_post',
        method:'get',
        params:{
            id:id
        }
    })
}

//更新帖子
export function updateTopic(post) {
    return request({
        url:'/post/update_post',
        method:'post',
        data:post
    })
}
