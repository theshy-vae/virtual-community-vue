<template>
  <div class="container" >
    <div  style="display: flex;justify-content: space-around" v-if="isShow">
      <div  style="width: 47%;height: 200px" class="message is-info " >
          <div style="display: flex;flex-direction: column;align-items: center">
              <div class="is-size-4 message-header has-text-centered" style="width: 100%">相关的社区</div>
            <div style="display: flex;justify-content: center" class="message-body" >
              <div v-for="(tag,index) in tagList" :key="index"  style="width:120px;margin-left: 20px;margin-right:20px;
              flex-direction:column;align-items: center;padding-bottom: 10px" class="is-flex back">
                <router-link :to="'/tag/'+tag.name" class="has-text-centered">
                  <div class="is-size-5 ml-1" >{{tag.name}}社区</div>
                  <img :src="tag.image"  style="width: 60px;height: 60px">
                </router-link>
              </div>
            </div>
            <div v-show="tagPage.total==0"  style="font-size: 20px;margin-top: 15px">没有类似的社区</div>
            <el-pagination
                    v-show="tagPage.total>4"
                    small
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :current-page="tagPage.current"
                    :page-sizes="[4]"
                    :page-size="tagPage.size"
                    :total="tagPage.total">
            </el-pagination>
          </div>
      </div>

      <div  style="width: 47%;height: 200px" class="message is-info">
          <div style="display: flex;flex-direction: column;align-items: center">
            <div class="is-size-4 message-header" style="width: 100%">相关的人</div>
            <div style="display: flex;justify-content: center"  class="message-body">
              <div v-for="(user,index) in userList" :key="index" style="width:120px;margin-left: 20px;margin-right:20px;
              flex-direction:column;align-items: center;padding-bottom: 10px" class="is-flex back">
                <router-link :to="`/user/${user.username}/home`" class="has-text-centered">
                  <div class="is-size-5 ml-1" >{{user.username}}</div>
                  <img :src="user.avatar"  style="width: 60px;height: 60px">
                </router-link>
              </div>
            </div>
            <div v-show="userPage.total==0" style="margin-top: 12px;font-size: 20px">没有类似的人</div>
            <el-pagination
                    v-show="userPage.total>4"
                    small
                    layout="prev, pager, next"
                    @current-change="handleUserCurrentChange"
                    :current-page="userPage.current"
                    :page-sizes="[4]"
                    :page-size="userPage.size"
                    :total="userPage.total">
            </el-pagination>
          </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-three-quarters">
        <RouterView></RouterView>
      </div>
      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
import {getBillboard} from "../api/billboard";
import PostList from './post/index'
import CardBar from "./card/CardBar";
import {searchTags} from "../api/tag";
import {searchUser} from "../api/user";

export default {
  name: 'Home',
  components:{CardBar,PostList},
  data(){
    return{
      search:'',
      tagPage:{
        current:1,
        size:4,
        total:0
      },
      userPage:{
        current:1,
        size:4,
        total:0
      },
      tagList:[],
      userList:[],
      isShow:false,
      flag:false
    }
  },
  mounted() {
    var self=this
    this.bus.$on('reload', function(searchKey){
      if(searchKey!=''){
        self.search=searchKey
        self.initTags(searchKey)
        self.initUsers(searchKey)
        self.isShow=true
      }else {
        self.isShow=false
      }
    })
  },
  methods:{
    //搜索与关键词有关系的社区
    initTags(searchKey){
      searchTags(this.tagPage.current,this.tagPage.size,searchKey).then(res=>{
        const { data } = res
        this.tagList=data.records
        this.tagPage.current = data.current
        this.tagPage.total = data.total
        this.tagPage.size = data.size
      })
    },
    //搜索与关键词有关的用户
    initUsers(searchKey){
      searchUser(this.userPage.current,this.userPage.size,searchKey).then(res=>{
        const {data} =res
        this.userList=data.records
        this.userPage.current = data.current
        this.userPage.total = data.total
        this.userPage.size = data.size
        if(this.userPage.total==0) this.flag=true
        else this.flag=false
      })
    },
    handleCurrentChange(current){
      this.tagPage.current=current
      this.initTags(this.search)
      /*scrollTo(0, 800);*/
      window.scroll(0,0)
    },
    handleUserCurrentChange(current){
      this.userPage.current=current
      this.initUsers(this.search)
      /*scrollTo(0, 800);*/
      window.scroll(0,0)
    }

  }
}
</script>

<style scoped>
  a{
    text-decoration: none!important;
    color: black!important;
  }
  a:hover{
    color: deepskyblue!important;
  }
  .back:hover{
    background-color: beige!important;
  }
</style>
