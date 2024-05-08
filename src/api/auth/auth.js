import request from '../../utils/request'

//注册
export function userRegister(userDTO) {
    return request({
        url:'/ums/user/register',
        method:'post',
        data:userDTO
    })
}

//用户名密码登录
export function loginAccount(data) {
    return request({
        url:'/ums/user/loginAccount',
        method:'post',
        data
    })
}

//管理员登录
export function adminLogin(data) {
    return request({
        url:'/ums/user/adminLogin',
        method:'post',
        data
    })
}

//邮箱登录
export function loginEmail(data){
    return request({
        url:'/ums/user/loginEmail',
        method:'post',
        data
    })
}

//发送邮箱验证码
export function getEmailCode(email) {
    return request({
        url:'/ums/user/getEmailCode',
        method:'get',
        params:{
            email:email
        }
    })
}

//登录后获取前台用户信息
export function getUserInfo() {
    return request({
        url:'/ums/user/info',
        method:'get'
    })
}

//注销
export function logout() {
    return request({
        url:'/ums/user/logout'
    })
}