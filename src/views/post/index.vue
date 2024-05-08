<template>
    <div>
        <el-card shadow="never">
            <div slot="header" class="clearfix">
                <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading" element-loading-text="玩命加载中">
                    <el-tab-pane label="最新"  name="latest" >
                        <div v-for="(item, index) in articleList" class="back" :key="index"
                                   @click="getDetail(item.id)"  style="overflow: hidden" >
                            <div v-if="index >0" ><hr class="mt-0"/></div>
                            <div class="media">
                                <div class="media-left">
                                    <img :src="item.tag.image" @click.stop="toTag(item.tag.name)" style="border-radius: 5px;width: 60px;height: 60px">
                                </div>
                                <div class="media-content">
                                    <div class="">
                                        <p class="ellipsis is-ellipsis-1">
                                            <span class="is-size-5">{{ item.tag.name }}社区</span>
                                        </p>
                                    </div>
                                    <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                                        <div class="level-left">
                                            <span class="mr-2">关注 {{item.tag.followCount}}</span>
                                            <span>帖子 {{item.tag.topicCount}}</span>
                                        </div>
                                    </nav>
                                </div>
                            </div>

                            <div class="mt-3 mb-3" style="overflow:hidden;text-overflow:ellipsis;display: -webkit-box;
                                                        -webkit-box-orient: vertical;-webkit-line-clamp:5;margin-left: 60px ">
                                {{item.title}}<br/>
                                <div v-html="item.content" class="index_container"></div>
                            </div>
                        </div>
                        <div class="has-text-centered" v-if="empty" style="max-height: 300px;">
                            啥也没有，换个关键词社区
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="最热"  name="hot" >
                        <div v-for="(item, index) in articleList" class="back" :key="index"
                                   @click="getDetail(item.id)"  style="max-height: 290px;overflow: hidden">
                            <div v-if="index >0" ><hr class="mt-0"/></div>
                            <div class="media">
                                <div class="media-left">
                                    <img :src="item.tag.image" @click.stop="toTag(item.tag.name)" style="border-radius: 5px;width: 60px;height: 60px">

                                </div>
                                <div class="media-content">
                                    <div class="">
                                        <p class="ellipsis is-ellipsis-1">
                                            <span class="is-size-5">{{ item.tag.name }}社区</span>
                                        </p>
                                    </div>
                                    <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                                        <div class="level-left">
                                            <span class="mr-2">关注 {{item.tag.followCount}}</span>
                                            <span>帖子 {{item.tag.topicCount}}</span>
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
                        <div class="has-text-centered" v-if="empty" style="max-height: 300px;">
                            啥也没有，换个关键词社区
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
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
</template>

<script>
    import { getList } from '../../api/post'
    import {getToken} from "../../utils/auth";
    export default {
        name: 'TopicList',
        data() {
            return {
                empty:false,
                activeName: 'latest',
                articleList: [],
                page: {
                    current: 1,
                    size: 10,
                    total: 0,
                    tab: 'latest'
                },
                search:'',
                loading:true
            }
        },
        mounted() {
            window.scrollTo(0,0);
            var self=this
            this.bus.$on('reload', function(searchKey){
                self.search=searchKey
                self.init()
            })
            this.init()
        },
        methods: {
            reload(){
                this.$forceUpdate()
            },
            init() {
                getList(this.page.current, this.page.size, this.tab,this.search).then((response) => {
                    const { data } = response
                    if(data.total === 0){
                        this.empty=true
                    }else{
                        this.empty=false
                    }
                    this.page.current = data.current
                    this.page.total = data.total
                    this.page.size = data.size
                    this.articleList = data.records
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
                window.scroll(0,0)
            },
            handleCurrentChange(current){
                this.page.current=current
                this.init()
                /*scrollTo(0, 800);*/
                window.scroll(0,0)
            },
            getDetail(postId){
                this.$router.push('post/'+postId)
            },
            //点击图片去相应的社区
            toTag(tagName){
                this.$router.push({path:'/tag/'+tagName})
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