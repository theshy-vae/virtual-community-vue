import Cookies from 'js-cookie'
import el from "element-ui/src/locale/lang/el";

const uToken = 'u_token'
const darkMode = 'dark_mode';

//获取Token
export function Token() {
    if(getToken()!=null){
        return getToken()
    }else{
        return JSON.parse(sessionStorage.getItem('u_token'))
    }
}

// 从localstorage获取Token
export function getToken() {
    return Cookies.get(uToken);
}

// 设置Token，1天,与后端同步
export function setToken(token) {
    return Cookies.set(uToken, token, {expires: 1})
}

// 删除Token
export function removeToken() {
    return Cookies.remove(uToken)
}

export function removeAll() {
    return Cookies.Cookies.removeAll()
}

export function setDarkMode(mode) {
    return Cookies.set(darkMode, mode, {expires: 365})
}

export function getDarkMode() {
    return !(undefined === Cookies.get(darkMode) || 'false' === Cookies.get(darkMode));
}