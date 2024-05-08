import request from '../utils/request'

//用户主页
export function userInit(pageNo,size,username) {
    return request({
        url:'/ums/user/init',
        method:'get',
        params:{
            pageNo:pageNo,
            size:size,
            username:username
        }
    })

}

//修改个人信息
export function updateUser(form) {
    return request({
        url:'/ums/user/update',
        method:'post',
        data:form
    })
}

//修改密码
export function updatePass(form) {
    return request({
        url:'/ums/user/updatePass',
        method:'post',
        data:form
    })
}

//查找用户
export function searchUser(pageNo,pageSize,search) {
    return request({
        url:'/ums/user/search',
        method:'get',
        params:{
            pageNo,
            pageSize,
            search
        }
    })
}

//更新用户头像
export function updateUserAvatar(url) {
    return request({
        url:'/ums/user/uploadAvatar',
        method:'get',
        params:{
            url
        }
    })
}

export function uploadImg(url,formData) {
    return request({
        url:url,
        contentType: false,
        processData: false,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        file:formData
    })
}

//获取用户信息
export function getUserById(id) {
    return request({
        url:'/ums/user/getUserById',
        method:'get',
        params:{
            id
        }
    })
}

//获取用户列表
export function getUserList(key) {
    return request({
        url:'/ums/user/getUserList',
        method:'get',
        params:{
            key
        }
    })
}

//根据id删除用户
export function deleteUserByid(id) {
    return request({
        url:'/ums/user/deleteUserById',
        method:'get',
        params:{
            id
        }
    })
}