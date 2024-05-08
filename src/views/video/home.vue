<template>
    <div>
        <div style="height: 100%; width: 100%" v-if="!empty">
            <el-row :gutter="24">
                <!--轮播图-->
                <el-col :span="24" v-if="isShow">
                    <el-carousel :interval="4000"  height="400px" arrow="always" style="width: 80%;margin-left: 150px">
                        <el-carousel-item v-for="item in videoHotList" :key="item.id">
                            <router-link :to="{path:'/video',query: { id:item.id,url:item.path }}">
                                <div style="position: relative">
                                    <img :src=item.img_path style="height: 100%; width: 100% ">
                                </div>
                            </router-link>
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
            <div style="margin-right: 4%;">
                <el-row>
                    <el-col :span="5" v-for="item in videoList" :key="item.id" :offset="1"  style="width: 400px;height: 210px;margin-top: 100px;margin-right: 40px;">
                        <router-link :to="{path:'/video',query: { id:item.id,url:item.path }} ">
                            <el-card :body-style="{ padding: '0px' }" shadow="hover" style="border-radius: 20px">
                                <img :src=item.img_path class="image"  style="width: 400px;height: 200px">
                                <p style="font-size: 20px;height: 60px">{{ item.name }}</p>
                                <i class="el-icon-video-play mr-2">{{item.count}}</i>
                                <i class="el-icon-chat-square">{{item.danmuCount}}</i>
                            </el-card>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div v-if="empty" >
            <el-empty description="没有合适的视频"></el-empty>
        </div>
    </div>


</template>

<script>
    import {getHotList, getVideoList, getVideoListByName} from "../../api/video";

    export default {
        data(){
            return {
                videoList:[],
                videoHotList:[],
                search:'',
                empty:false,
                isShow:true
            }
        },
        methods:{
            reloadVideo(){
                this.$forceUpdate()
            },
            getHotList(){
                getHotList().then(res=>{
                    console.log(res.data)
                    this.videoHotList=res.data
                })
            },
            getList(){
                getVideoList(this.search).then(res=>{
                    const {data} = res
                    this.videoList=data
                    console.log(data)
                })
            },
            getListByName(){
                console.log("关键字："+this.search)
                getVideoListByName(this.search).then(res=>{
                    console.log(res.data.length)
                    if(res.data.length===0) this.empty=true
                    else {
                        this.empty=false
                        const {data} = res
                        this.videoList=data
                    }

                })
            },
        },
        created() {
            this.getListByName('')
        },
        mounted() {
            this.$forceUpdate()
            var self=this
            this.bus.$on('reloadVideo', function(searchKey){
                this.isShow=false
                console.log(this.isShow)
                self.search=searchKey
                self.getListByName()
            })
            this.getHotList()
        }
    }
</script>

<style scoped lang="less">
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    /*轮播图样式*/
       .el-col {
           border-radius: 4px;
       }

    /deep/ .el-carousel__button { /*指示器按钮*/
    width: 10px;
        height: 10px;
        border: none;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.2);
    }
    /deep/ .is-active .el-carousel__button {/*指示器激活按钮*/
    background: #3f8ec8;
    }
    /*以上为轮播图样式*/

    /*视频框架样式*/
      .smallVideo {
          margin: auto;
      }
    .video {
        margin-left: 120px;
    }

    .image {
        width: 100%;
        display: block;
    }
</style>