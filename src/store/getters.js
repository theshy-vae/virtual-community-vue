const getters={
    token:state=>state.user.token,  //token
    user:state=>state.user.user,    //用户
    socket:state=>state.user.socket //socket
}

export default getters
