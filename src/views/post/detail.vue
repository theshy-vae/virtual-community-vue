<template>
    <div class="container">
        <div class="columns">
            <!--文章详情-->
            <div class="column is-three-quarters">
                <!--主题-->
                <el-card
                        class="box-card"
                        shadow="never"
                >
                    <div slot="header" class="level">
                        <div class="level-left ml-2">
                            <p class="is-size-4 has-text-weight-bold">{{ topic.title }}</p>
                        </div>
                        <div class="level-right">
                            <button class="button is-info  is-outlined mr-2" @click="only">只看楼主</button>
                            <button class="button is-info  is-outlined" @click="toComment">回复</button>
                        </div>
                    </div>
                    <div class="media">
                        <div class="media-left ">
                            <figure class="image is-48x48">
                                <img :src="topicUser.avatar" style="border-radius: 25px;width: 48px;height: 48px">
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="">
                                <p class="ellipsis is-ellipsis-1">
                                    <router-link :to="{path:`/user/${topicUser.username}/home`}">
                                        <span class="is-size-5 has-text-black-ter toHome">{{ topicUser.username }}</span>
                                    </router-link>
                                    <span class="tag ml-1" style="background-color: deepskyblue;color: white" v-if="tag.bigManager==topicUser.username ">
                                        社区管理员
                                    </span>
                                    <span v-else class="tag ml-1" style="border-color: deepskyblue;color: deepskyblue">
                                        楼主
                                    </span>
                                    <span class="tag ml-1" v-if="topicUser.score<=5" style="background-color:#C4F2AA;color: white">
                                        初入茅庐
                                    </span>
                                    <span class="tag ml-1" v-if="topicUser.score>5&&topicUser.score<=10" style="background-color:#1F6BC8;color: white">
                                        崭露头角
                                    </span>
                                    <span class="tag ml-1" v-if="topicUser.score>10" style="background-color:#EAB30F;color: white">
                                        社区大神
                                    </span>
                                </p>
                            </div>
                            <nav class="level has-text-grey is-mobile  is-size-6 mt-2">
                                <div class="level-left">
                                    <div>
                                        <span>第一楼</span>
                                        <span class="ml-2">{{time(topic.createTime)}}</span>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                    <!--Markdown-->
                    <div id="preview" v-html="topic.content" style="min-height: 0px;margin-left: 60px" class="mt-2 has-text-black is-size-6"/>

                    <!--评论-->
                    <nav class="level has-text-grey  mt-6">
                        <div class="level-left">
                            <p class="level-item">
                                <b-taglist>
                                    <router-link
                                            :to="{ name: 'tag', params: { name: tag.name } }"
                                    >
                                        <b-tag type="is-info is-light mr-1">
                                            {{ tag.name }}社区
                                        </b-tag>
                                    </router-link>
                                </b-taglist>
                            </p>
                        </div>
                        <div
                                v-if="token && user.id === topicUser.id"
                                class="level-right"
                        >
                            <router-link
                                    class="level-item"
                                    :to="{name:'topic-edit',params: {id:topic.id}}"
                            >
                                <span class="button is-success is-outlined">编辑</span>
                            </router-link>
                            <a class="level-item">
              <span
                      class="button is-success is-outlined"
                      @click="open"
              >删除</span>
                            </a>
                        </div>
                    </nav>
                    <Comments :slug="topic.id" :name="topicUser.username" :bigManager="tag.bigManager"/>
                </el-card>
            </div>

            <div class="column" >
                <!--作者-->
                <Author
                        v-if="flag"
                        :user="topicUser"
                />
                <!--推荐-->
                <recommend
                        v-if="flag"
                        :topic-id="topic.id"
                />
            </div>
        </div>
    </div>

</template>

<script>
    import {deleteTopic, /*deleteTopic, */getTopic} from '../../api/post'
    import {getTime} from "../../api/time";
    import { mapGetters } from 'vuex'
    import Author from "./Author";
    import Recommend from "./Recommend";
    import Comments from "../../components/Comments/Comments";
    import Vditor from 'vditor'
    import 'vditor/dist/index.css'
    export default {
        name: 'TopicDetail',
        components: { Author,Recommend,Comments},
        computed: {
            ...mapGetters([
                'token','user'
            ])
        },
        data() {
            return {
                flag: false,
                topic: {
                    content: '',
                    id: this.$route.params.id
                },
                tag: '',
                topicUser: {}
            }
        },
        mounted() {
            this.fetchTopic()
            window.scrollTo(0,0);
            console.log(this.$store.getters.user)
        },
        methods: {
            // 初始化
            async fetchTopic() {
                getTopic(this.$route.params.id).then(response => {
                    const { data } = response
                    this.topic = data.topic
                    this.tag = data.tag
                    this.topicUser = data.user
                    this.flag = true
                })
            },
            open() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteTopic(this.topic.id)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.$router.push({path:'/'})
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //评论
            toComment(){
                window.scrollTo(0,100000000000);
            },
            //计算发布时间与当前时间的间隔
            time(time){
                return getTime(time)
            },
            only(){
                this.$bus.$emit('only')
            }
        },

    }
</script>

<style>
    #preview {
        min-height: 300px;
    }
    .toHome:hover{
        color: orange!important;
    }
</style>