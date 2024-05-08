<template>
    <div >
        <!--视频专区-->
        <el-card class="box-card" shadow="never">
            <div slot="header" class="is-size-5 has-text-centered">
                <span>视频专区</span>
            </div>
            <div style="display: flex;flex-direction: column;align-items: center" @click="gotoVideo">
                <i class="el-icon-video-camera-solid" style="font-size: 50px"/>
            </div>
        </el-card>
        <!--推荐社区-->
        <login-welcome/>
        <!--创建社区-->
        <Tip/>
        <!--推广-->
        <Promotion/>
    </div>
</template>

<script>
    import LoginWelcome from "./LoginWelcome";
    import Promotion from "./Promotion";
    import Tip from "./Tip";
    export default {
        name: "CardBar",
        components:{LoginWelcome,Promotion,Tip},
        methods:{
            gotoVideo(){
                this.$router.push('/home');
            }
        }

    }
</script>

<style scoped>
    i:hover{
        color: deepskyblue!important;
    }
</style>