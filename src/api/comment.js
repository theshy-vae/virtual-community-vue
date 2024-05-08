import request from '../utils/request'

//列出评论
export function fetchCommentsByTopicId(current,size, tab,topic_id) {
    return request({
        url:'/comment/get_comments',
        method:'get',
        params:{
            current,
            size,
            tab,
            topic_id
        }
    })
}

//评论
export function pushComment(data) {
    return request({
        url:'/comment/add_comment',
        method:'post',
        data:data
    })
}

//删除评论
export function deleteComment(commentId) {
    return request({
        url:'/comment/delete_comment',
        method:'get',
        params:{
            commentId
        }
    })
}