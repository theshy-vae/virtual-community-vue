<template>
    <div>
        <div class="barrage" style="width: 70%;float: left">
            <video
                    :src="url"
                    controls="controls"
                    autoplay
                    id="myvideo"
                    ref="myvideo"
                    @timeupdate="videoTimeUpdate()"
                    @pause="myPause()"
                    @play="myPlay()"
            >

            </video>

            <canvas id="myCanvas">

            </canvas>

            <div style="max-height: 100px;overflow: no-content">
                <el-form v-model="sendform" :inline="true" ref="SendFormRef" style="max-height: 10px;overflow: no-content">
                    <el-form-item>
                        <i class="el-icon-video-play mr-2">{{video.count}}</i>
                        <i class="el-icon-chat-square" style="margin-right: 200px">{{video.danmuCount}}</i>
                    </el-form-item>
                    <el-form-item>
                        <el-color-picker v-model="sendform.color" size="medium"></el-color-picker>
                    </el-form-item>
                    <el-form-item prop="danmu">
                        <el-input v-model="sendform.danmu" @keyup.enter.native="sendMD" style="width: 600px" placeholer="发送弹幕">
                            <el-button slot="append" @click="sendMD">发送</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item v-model="sendform.time"></el-form-item>
                    <el-form-item v-model="sendform.username"></el-form-item>

                </el-form>
            </div>

        </div>
        <div style="width: 29%;float:right;max-height: 600px;overflow: auto">
                    <el-table
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                prop="time"
                                label="时间"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="username"
                                label="发送人"
                                width="80">
                        </el-table-column>
                        <el-table-column
                                prop="danmu"
                                label="弹幕"
                                width="300">
                        </el-table-column>
                    </el-table>
        </div>
    </div>

</template>

<script>
    import {getDMById, sendDanMu, sendDdanMu, sendDM} from "../../api/danmu";
    import barrageEffect from "./Barrage";
    import {getVideoById, increaseCount} from "../../api/video";

    export default {
        data() {
            return {
                video:{},
                id:"",
                url:"",
                tableData:[
                ],
                sendform:{
                    id:"",
                    username:"",
                    danmu:"",
                    time:"0.00",
                    color:"#F7F0F0",
                    isuse:"0"
                },
                barrage:null,
                canvasWidth:0,
                canvasHeight:0,
                lastTime:0
            };
        },
        methods: {
            myPause(){
                this.barrage.clickStop=false
            },
            myPlay(){
                this.barrage.clickStop=true
                this.barrage.drawBarrage()
            },
            init(){
                const fonSize=20
                const highwayAmount=4
                this.barrage=new barrageEffect.Barrage('myCanvas',this.canvasWidth,this.canvasHeight,highwayAmount,fonSize)
            },
            //获取当前视频时间点赋值给弹幕
            getVideoTime(){
                const video =document.getElementById("myvideo")
                this.sendform.time=video.currentTime.toFixed(2)

            },
            //视频时间发生变化
            videoTimeUpdate(){
                setTimeout(()=>{
                    let video=document.getElementById("myvideo")
                    if(video) this.addTestToBarrage(video.currentTime)
                },500)

            },
            //将弹幕列表中的弹幕插入发送弹幕列表
            addTestToBarrage(currentTime){
                //当前时间小于上一次调用该函数的时间
                if(currentTime<this.lastTime){
                    this.tableData.forEach((val)=>{
                        val.isuse="0"
                    })
                    this.barrage.barrageList=[]
                }
                this.lastTime=currentTime
                for(let i=0;i<this.tableData.length;i++){
                    if(parseInt(this.tableData[i].time)===parseInt(currentTime)&&this.tableData[i].isuse==="0"){
                        this.barrage.addTest(this.tableData[i].danmu,this.tableData[i].color)
                        this.tableData[i].isuse="1"
                    }
                }
            },
            setCanvas(){
                let canvasStyle = document.getElementById('myCanvas')
                this.canvasHeight = canvasStyle.offsetHeight
                this.canvasWidth = canvasStyle.offsetWidth
                this.init()
            },
            getVideoURL(){
                this.id=this.$route.query.id
                this.url=this.$route.query.url
                console.log(this.$route.query.url)
                //增加播放量
                increaseCount(this.id)
                getVideoById(this.id).then(res=>{
                    this.video=res.data
                })
                console.log(this.id)
            },
            sendMD(){
                if(this.sendform.danmu==="") this.$message.warning("请输入内容")
                else{
                    this.getVideoTime()
                    this.sendform.username=this.$store.getters.user.username
                    this.sendform.id=this.id
                    console.log(this.sendform.danmu)
                    sendDanMu(this.sendform).then(()=>{
                        getDMById(this.id).then((value => {
                            this.tableData=value.data
                            this.sendform.danmu=""
                            this.$message.success("发送成功")
                        }))
                        getVideoById(this.id).then(res=>{
                            this.video=res.data
                        })
                    })
                }
            },
            getDM(){
                getDMById(this.id).then((value => {
                    this.tableData=value.data
                }))
            }
        },
        created() {
            this.getVideoURL()
            this.getDM();
            console.log(this.url)
        },
        mounted() {
            this.setCanvas()
            window.scrollTo(0,0);
        }
    };
</script>

<style scoped lang="less">
    #myvideo {
        width: 85%;
        margin-left: 10%;
    }

    h2 {
        margin-left: 10%;
    }

    .el-form {
        margin-left: 10%;
    }

    .el-collapse {
        width: 70%;
    }
    // 画板
    .barrage{
        width: 100vw;
        height: 80vh;
        position: relative;
        #myCanvas{
            position: absolute;
            z-index: 2;
            width: 85%;
            margin-left: 12.6%;
            top:0px;
            left: 0;
            height: 40%;
        }
    }

    .el-collapse-item__content {
        height: 400px;
    }

</style>
