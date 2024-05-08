<template>
    <div>
       <el-container>
           <el-header>
               <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  :router="true">
                   <el-menu-item index="/home" @click="reloadV">视频首页</el-menu-item>
                   <el-menu-item class="searchInput" index="">
                       <el-input @keyup.enter.native="mySearch" v-model="searchKey" placeholder="请输入视频关键字" :span="12">
                           <el-button type="search" @click="mySearch" slot="append" icon="el-icon-search"></el-button>
                       </el-input>
                   </el-menu-item>
               </el-menu>
           </el-header>
           <el-main>
               <router-view></router-view>
           </el-main>

       </el-container>
    </div>

</template>

<script>
    import {getVideoList} from "../../api/video";

    export default {
        data() {
            return {
                activeIndex: '/home',
                videoList:[],
                searchKey:'',
                searchForm: {
                    id:""
                }
            };
        },
        methods: {
            mySearch(){
                this.bus.$emit('reloadVideo',this.searchKey)
                this.searchKey=''
            },
            reloadV(){
                this.bus.$emit('reloadVideo','')
            }
        }
    }
</script>

<style scoped>
    .el-header{
        background-color: white;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    .el-main {
        background-color: white;
        color: #333;
        text-align: center;
        /*min-width: 1280px;*/
    }
    .searchinput{
        width: 25%;
    }
</style>