<template>
    <div class="container">
        <div id="tag" class="columns">
            <div class="column is-three-quarters">
                <tagHead :tag="tag" :tagName="tag.name"/>
                <el-card>
                    <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading" element-loading-text="玩命加载中">
                        <el-tab-pane label="最热"  name="hot" >
                            <div v-for="(item, index) in articleList" class="back" :key="index"
                                 @click="getDetail(item.id)"  style="max-height: 290px;overflow: hidden">
                                <div v-if="index >0" ><hr class="mt-0"/></div>
                                <div class="media">
                                    <div class="media-left ">
                                            <img :src="item.avatar" style="border-radius: 30px;" class="image is-48x48">
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
                                                    <span class="mr-2">发布于{{time(item.createTime)}}</span>
                                                </div>
                                                <div v-else>
                                                    回复于{{time(item.modifyTime)}}
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
                            <div v-if="empty" >
                                <el-empty description="空空如也"></el-empty>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="最新"  name="latest" >
                            <div v-for="(item, index) in articleList" class="back" :key="index"
                                 @click="getDetail(item.id)"  style="max-height: 290px;overflow: hidden">
                                <div v-if="index >0" ><hr class="mt-0"/></div>
                                <div class="media">
                                    <div class="media-left ">
                                            <img :src="item.avatar" style="border-radius: 30px;" class="image is-48x48">
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
                                                    <span class="mr-2">发布于{{time(item.createTime)}}</span>
                                                </div>
                                                <div v-else>
                                                    回复于{{time(item.modifyTime)}}
                                                </div>
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
                            <div v-if="empty" >
                                <el-empty description="空空如也"></el-empty>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                    <el-pagination
                            v-show="page.total > 10"
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="page.current"
                            :page-sizes="[5,10,20]"
                            :page-size="page.size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="page.total">
                    </el-pagination>
                </el-card>
            </div>

            <div class="column" @mouseover="updateHover=true" @mouseout="updateHover=false">
                <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <p class="has-text-centered is-size-5">社区资料</p>
                    </div>
                    <div >
                        <p class="is-size-6">{{tag.description}}</p>
                        <button v-if="tag.bigManager===$store.getters.user.username" v-show="updateHover"
                                class="button is-info is-light" style="margin-left: 80%"
                                @click="dialogVisible=true">修改</button>
                    </div>
                </el-card>
                <el-card class="box-card level" shadow="hover" >
                    <div class="level-left">
                        <b-input
                                v-model="searchKey"
                                class="s_input level-left ml-3"
                                placeholder="社区内搜索"
                                @keyup.enter.native="init()"
                                style="width: 200px"
                        />
                        <b-button class="is-info" @click="init()">
                        我搜
                    </b-button>
                    </div>
                </el-card>
                <el-card shadow="hover" class="has-text-centered">
                    <b-button type="is-danger" @click="toCreate" outlined>
                        ✍🏻水贴
                     </b-button>
                </el-card>
            </div>
        </div>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%">
            <span>请输入社区简介</span>
            <el-input type="textarea"
                      autosize
                        v-model="description">

            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdateDescription">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    import {getTopicsByTag, follow, updateTagDescription} from '../../api/tag'
    import {scrollTo} from "../../utils/scroll-to"
    import tagHead from "../post/tagHead";
    import {getTime} from "../../api/time";
    import E from 'wangeditor'

    let editor

    export default {
        name: 'Tag',
        components:{
            tagHead
        },
        data() {
            return {
                follow:false,                           //是否关注本社区
                tagName:'',                             //社区名
                empty:false,                            //帖子是否没有
                activeName: 'hot',                      //查找类型
                articleList: [],                        //请求返回帖子列表
                page: {                                 //分页对象
                    current: 1,
                    size: 10,
                    total: 0,
                    tab: 'hot'
                },
                tag:{},                                  //本社区的信息
                isSubmit:false,                          //关注/取关请求是否正在发送
                searchKey:'',                            //搜索关键字
                updateHover:false,                     //鼠标悬浮到社区资料后显示“修改”按钮
                dialogVisible:false,                     //社区简介输入栏是否可见
                description:'',
                loading:true
            }
        },
        created() {
            this.tagName=this.$route.params.name
        },
        mounted() {
            var that=this
            this.$bus.$on('follow',function () {
                that.init()
            })
            this.$nextTick(()=>{
                this.init()
                window.scrollTo(0,0);
            })
        },
        methods: {
            init() {
                getTopicsByTag(this.page.current, this.page.size, this.tab,this.searchKey,this.tagName).then((response) => {
                    const { data } = response
                    if(data.list.total === 0){
                        this.empty=true
                    }else{
                        this.empty=false
                    }
                    this.page.current = data.current
                    this.page.total = data.total
                    this.page.size = data.size
                    this.articleList = data.list.records
                    this.tag=data.tag
                    this.loading=false
                })
            },
            handleClick(tab) {
                this.page.current = 1
                this.tab=tab.name
                this.init()
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
            //点击图片去相应的社区
            toTag(tagName){
                this.$router.push({path:'/tag/'+tagName})
            },
            time(time){
                return getTime(time)
            },
            //社区内搜索
            search(){
                this.init()
            },
            //修改社区资料
            handleUpdateDescription(){
                updateTagDescription(this.tag.id,this.description).then(res=>{
                    this.tag.description=this.description
                    this.description=''
                    this.dialogVisible=false
                    this.$message.success('修改成功')
                })
            },
            //水贴
            toCreate(){
                if(this.$store.getters.token==''||this.$store.getters.token==null){
                    this.$message.warning('请先登录')
                    return;
                }
                this.$router.push({name:'post-create',query:{tagName:this.tagName}})
            }
        }
    }
</script>

<style scoped>
    #tag {
        min-height: 500px;
    }
    .back:hover{
        background-color: #f6f6f6;
    }
    /*图片展示缩略图样式*/
    .index_container >>> img{
        width:30% !important;
        height: 170px!important;
        object-fit: cover!important;
        margin-right: 10px!important;
    }

</style>