import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../views/Home'),
    meta: {title: '主页'},
    children:[
      {
        path:'/',
        component:()=>import('../views/post/index')
      },
      {
        path:'/search',
        component:()=>import('../views/Search')
      }
    ]
  },
  {
    path:'/register',
    name:'register',
    component:()=>import('../views/auth/register'),
    meta:{title:'注册'}
  },
  {
    path: '/login',
    name: 'login',
    component:()=>import('../views/auth/login'),
    meta:{title: '登录'}
  },
  {
    path:'/404',
    name:'404',
    component:()=>import('../views/error/404'),
    meta: {title: '404-NotFound'}
  },
    //发布
  {
    name:'post-create',
    path:'/post/create',
    component:()=>import('../views/post/Create'),
    params:{
      tagName:''
    },
    mata:{title:'信息发布',requireAuth:true}
  },
    //详情
  {
    name:"post-detail",
    path:"/post/:id",
    component:()=>import('../views/post/detail'),
    meta:{title: '详情'}
  },
    //编辑
  {
    name:'topic-edit',
    path:'/topic/edit/:id',
    component:()=>import('../views/post/Edit')
  },
    //标签页
  {
    name:'tag',
    path: '/tag/:name',
    component:()=>import('../views/tag/Tag'),
    meta:{title: '主题列表'}
  },
    //个人中心
  {
    name:'userHome',
    path:'/user/:username/home',
    component:()=>import('../views/User'),
    query:{
      t:Date.now(),
    },
  },
    //设置
  {
    name:'setting',
    path: '/user/:username/setting',
    component:()=>import('../views/Setting'),
    meta: {requireAuth:true}
  },
  {
    path: '*',
    redirect:'/404',
    hidden:true
  },
    //聊天
  {
    name:'chatting',
    path:'/chatting/',
    component:()=>import('../views/chatting/chatting'),
    meta: {requireAuth: true}
  },
    //视频
  {
    name:'video',
    path:'/video',
    component:()=>import('../views/video/index'),
    children: [
      {
        path:'/home',
        component:()=>import('../views/video/home')
      },
      {
        path: "/video",
        component:()=>import('../views/video/video')
      },
      {
        path: "/upload",
        component:()=>import('../views/video/upload') //administer
      }
    ]
  },
    //管理员登录
  {
    name: 'administerLogin',
    path:'/administerLogin',
    component:()=>import('../views/administer/index')
  },
    //管理员操作页面
  {
    name:'admin',
    path: '/admin',
    component:()=>import('../views/administer/admin')

  }
]

//防止路由到同一个地方时系统报错
const originalPush=VueRouter.prototype.push
VueRouter.prototype.push=function push(location){
  return originalPush.call(this,location).catch(err=>err)
}

const router = new VueRouter({
  routes
})

export default router
