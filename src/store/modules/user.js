import {getUserInfo, loginAccount, logout, loginEmail, adminLogin} from "../../api/auth/auth";
import { setToken, removeToken,Token} from "../../utils/auth";

const state = {
    token: Token(), // token   如果sessionStorage（用户没点记住）有token就取出来，否则从cookie中取出来token（用户点了记住）
    user: "", // 用户对象
    socket:""//socket对象
};

const mutations = {
    SET_TOKEN_STATE: (state, token) => {
        state.token = token;
    },
    SET_USER_STATE: (state, user) => {
        state.user = user;
    },
    SET_SOCKET_STATE:(state,socket)=>{
        state.socket=socket;
    }
};

const actions = {
    // 用户登录
    login: function ({commit}, userInfo) {
        const {name, pass, rememberMe,email,code,type} = userInfo;
        return new Promise((resolve, reject) => {
            if(type===1) {
                loginAccount({username: name.trim(), password: pass, rememberMe: rememberMe, email: email, code: code})
                    .then((response) => {
                        const {data} = response;
                        commit('SET_TOKEN_STATE', data.token)
                        let socket = new WebSocket(process.env.VUE_APP_SOCKET_URL + name)
                        commit('SET_SOCKET_STATE', socket)
                        sessionStorage.setItem('u_token', JSON.stringify(data.token))
                        sessionStorage.setItem('socket', JSON.stringify(socket))
                        if (rememberMe === true) {
                            setToken(data.token);
                        }
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }else{
                loginEmail({username: name.trim(), password: pass, rememberMe: rememberMe,email:email,code:code})
                    .then((response) => {
                        const {data} = response;
                        commit('SET_TOKEN_STATE',data.token)
                        let socket=new WebSocket(process.env.VUE_APP_SOCKET_URL + name)
                        commit('SET_SOCKET_STATE',socket)
                        sessionStorage.setItem('u_token',JSON.stringify(data.token))
                        sessionStorage.setItem('socket',JSON.stringify(socket))
                        if(rememberMe===true){
                            setToken(data.token);
                        }
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
        });
    },
    adminLogin: function({commit},userInfo){
        const {name, pass} = userInfo;
        return new Promise((resolve, reject) => {
            adminLogin({username: name.trim(), password: pass}) .then((response) => {
                const {data} = response;
                console.log(data)
                commit('SET_TOKEN_STATE', data.token)
                sessionStorage.setItem('u_token',JSON.stringify(data.token))
                resolve();

            })
                .catch((error) => {
                    reject(error);
                });

        });
    },
    // 获取用户信息
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getUserInfo()
                .then((response) => {
                    const { data } = response;
                    if (!data) {
                        commit("SET_TOKEN_STATE", "");
                        commit("SET_USER_STATE", "");
                        removeToken();
                        resolve();
                        reject("Verification failed, please Login again.");
                    }
                    commit("SET_USER_STATE", data);
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
    // 注销
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {
            logout(state.token)
                .then((response) => {
                    console.log(response);
                    commit("SET_TOKEN_STATE", "");//删除Vuex中token信息
                    commit("SET_USER_STATE", "");//删除Vuex中用户信息
                    removeToken();//删除Cookie中token信息
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};