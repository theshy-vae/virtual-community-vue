<template>
    <div class="container" style="margin-top: -15px">
        <div class="hero is-info is-small" style="width: 100%">
            <div class="hero-body">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64" >
                            <img style="border-radius: 30px;width: 60px;height: 60px" :src="user.avatar">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="field mt-2">
                            <p class="control is-size-3" >
                                {{name}}
                                <button v-show="name!==$store.getters.user.username" class="button is-success is-small mt-2" @click="toChatting">发消息</button>
                            </p>
                        </div>
                    </div>
                </article>
                <div class="mt-4 mb-3 mt-4 ml-5">
                    <div class="columns container is-mobile">
                        <div @click="showParents" class=" mr-2">
                            <a class="has-text-success " >关注:{{user.followCount}}</a>
                        </div>
                        <div @click="showFollowers" class=" mr-2">
                            <a class="has-text-success" >粉丝:{{user.followerCount}}</a>
                        </div>
                        <div @click="showParentTags" class=" mr-2">
                            <a class="has-text-success " >关注的社区</a>
                        </div>
                        <div @click="showMyTags" class=" mr-2">
                            <a class="has-text-success">创建的社区</a>
                        </div>
                        <div class=" mr-2">
                            <a class="has-text-success mr-3">积分:{{user.score}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns mt-1">
            <div class="column is-three-quarters">
                <el-card class="box-card">
                    <div v-for="(item, index) in posts" class="back" :key="index"
                         @click="getDetail(item.id)"  style="max-height: 290px;overflow: hidden">
                        <div v-if="index >0" ><hr class="mt-0"/></div>
                        <div class="media">
                            <div class="media-left ">
                                <figure >
                                    <img :src="item.avatar" style="border-radius: 25px;width: 48px;height: 48px">
                                </figure>
                            </div>
                            <div class="media-content">
                                <div class="">
                                    <p class="ellipsis is-ellipsis-1">
                                        <span class="is-size-5">{{ item.username }}</span>
                                    </p>
                                </div>
                                <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                                    <div class="level-left">
                                        <div v-if="item.comments==0">
                                            <span class="mr-2">发布于{{post_time(item.createTime)}}</span>
                                        </div>
                                        <div v-else>
                                            回复于{{post_time(item.modifyTime)}}
                                        </div>
                                        <!--<span class="mr-2">关注 {{item.tag.followCount}}</span>
                                        <span>帖子 {{item.tag.topicCount}}</span>-->
                                    </div>
                                </nav>
                            </div>
                        </div>

                        <div class="mt-3 mb-3" style="overflow:hidden;text-overflow:ellipsis;display: -webkit-box;
                                                        -webkit-box-orient: vertical;-webkit-line-clamp:5;margin-left: 60px">
                            {{item.title}}<br/>
                            <div v-html="item.content" class="index_container"></div>
                        </div>
                    </div>
                    <el-pagination
                            background
                            class="mt-5"
                            v-show="page.total > 5"
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page.current"
                            :page-sizes="[5,10,20]"
                            :page-size="page.size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="page.total">
                    </el-pagination>

                    <el-empty v-if="posts.length==0" description="这位老铁还没发过帖子"></el-empty>
                </el-card>
            </div>
            <div class="column">
                <el-card class="box-card">
                    <div slot="header" class="clearfix has-text-centered is-size-5">
                        <span>用户信息</span>
                    </div>
                    <div class="is-size-6 has-text-grey">
                        <span class="mr-1">用户名:</span>{{name}}
                    </div>
                    <div class="is-size-6 has-text-grey">
                        <span class="mr-1">社区龄:</span>{{time}}
                    </div>
                    <div class="is-size-6 has-text-grey">
                        <span class="mr-1">UID:</span>{{user.id}}
                    </div>
                </el-card>
            </div>
        </div>


        <!--关注和粉丝列表-->
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%" >
            <el-table :data="dialogList" style="margin-top: -40px">
                <el-table-column style="height: 30px">
                    <template  slot-scope="scope" >
                        <router-link :to="{path:`/user/${scope.row.username}/home`}">
                            <div style="height: 50px" class="level is-size-5" @click="reload(scope.row.username)">
                                <div class="level-left" >
                                    <img :src="scope.row.avatar" style="width: 48px;height: 48px;border-radius:25px;margin-right: 10px"/>
                                </div>
                                <div class="level-right mt-5" style="margin-right: 4000px">
                                    <span style="margin-bottom: 40px">{{scope.row.username}}</span>
                                </div>
                            </div>
                        </router-link>

                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

        <el-dialog :title="dialogTitle" :visible.sync="dialogTagVisible" width="30%" >
            <el-table :data="dialogList" style="margin-top: -40px">
                <el-table-column style="height: 30px">
                    <template  slot-scope="scope" >
                        <router-link :to="{path:`/tag/${scope.row.name}`}">
                            <div style="height: 50px" class="level is-size-5">
                                <div class="level-left" >
                                    <img :src="scope.row.avatar" style="width: 48px;height: 48px;border-radius:25px;margin-right: 10px"/>
                                </div>
                                <div class="level-right mt-5" style="margin-right: 4000px">
                                    <span style="margin-bottom: 40px">{{scope.row.name}}社区</span>
                                </div>
                            </div>
                        </router-link>

                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

    </div>

</template>

<script>
    import {userInit} from '../api/user'
    import {scrollTo} from "../utils/scroll-to";
    import {mapGetters} from 'vuex'
    import {getTime} from "../api/time";
    export default {
        name: "Vue",
        mounted() {
            window.scrollTo(0,0);
            this.name=this.$route.params.username
            this.dialogList=[]
            this.init();
        },
        computed:{
          ...mapGetters(['token']),
            time(){
                var new_date = new Date(); //新建一个日期对象，默认现在的时间
                var old_date = new Date(`${this.user.create_time}`); //设置过去的一个时间点，"yyyy-MM-dd HH:mm:ss"格式化日期

                var difftime = (new_date - old_date)/1000; //计算时间差,并把毫秒转换成秒

                var days = parseInt(difftime/86400)+1; // 天  24*60*60*1000
                if(days<=30) days=days+'天'
                else if(days<=365){
                    days=parseInt(days)/30
                    days+='月'
                }else {
                    var a =days
                    days=parseInt(days)/365
                    days=  JSON.stringify(days).slice(0,3)+'年'
                }
                return days
            }
        },
        data(){
            return{
                name:'',
                user:{},                        //用户信息
                posts:[],                       //帖子列表
                page: {
                    current: 1,
                    size: 10,
                    total: 0,
                },
                dialogVisible:false,            //关注和粉丝列表是否展示
                dialogTagVisible:false,         //展示关注的社区
                dialogList:[],                  //列表数据
                followerUsers:[],               //粉丝列表
                parentUsers:[],                 //关注列表
                parentTags:[],                  //关注贴社区列表
                dialogTitle:'',                 //列表标题
                myTagList:[]                    //创建的社区
            }
        },
        methods:{
            init(){
                userInit(this.page.current,this.page.size,this.name).then(res=>{
                    const {data} = res
                    this.posts=data.page.records
                    this.user=data.user
                    this.page.current = data.page.current
                    this.page.total = data.page.total
                    this.page.size = data.page.size
                    this.followerUsers=data.followerUsers
                    this.parentUsers=data.parentUsers
                    this.parentTags=data.parentTags
                    this.myTagList=data.myTagList
                })
            },
            handleSizeChange(pageSize){
                this.page.size=pageSize
                this.init()
                scrollTo(0, 800);
            },
            handleCurrentChange(current){
                this.page.current=current
                this.init()
                scrollTo(0, 800);

            },
            getDetail(postId){
                this.$router.push('/post/'+postId)
            },
            post_time(time){
                return getTime(time)
            },
            showParents(){
                this.dialogVisible=true
                this.dialogTitle='我的关注'
                this.dialogList=this.parentUsers
            },
            showFollowers(){
                this.dialogVisible=true
                this.dialogTitle='我的粉丝'
                this.dialogList=this.followerUsers
            },
            showParentTags(){
                this.dialogTagVisible=true
                this.dialogTitle='关注的社区'
                this.dialogList=this.parentTags
            },
            showMyTags(){
                this.dialogTagVisible=true
                this.dialogTitle='创建的社区'
                this.dialogList=this.myTagList
            },
            //跳转到聊天界面
            toChatting(){
                //参数为聊天对方的名字和头像
                this.$router.push({name:'chatting',query:{name:this.name,avatar:this.user.avatar}});
            }
        }
    }
</script>

<style scoped>
    /*图片展示缩略图样式*/
    .index_container >>> img{
        width:30% !important;
        height: 170px!important;
        object-fit: cover!important;
        margin-right: 10px!important;
    }
    .back:hover{
        background-color: #f6f6f6;
    }
</style>