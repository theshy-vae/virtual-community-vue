<template>
    <el-card class="box-card" shadow="never">
        <div slot="header" class="has-text-centered is-size-5">
            <span>进社区</span>
        </div>
        <div class="is-flex" style="flex-wrap: wrap">
            <div  v-for="(hotTag,index) in hotTags" :key="index" style="width: 40%;height:100px;padding-top:10px;margin-left: 20px;margin-bottom: 10px" class="back">
                <router-link :to="'/tag/'+hotTag.name">
                    <div class="is-flex" style="flex-direction: column;align-items: center" >
                        <div class="is-size-6">
                            {{hotTag.name}}社区
                        </div>
                        <div class="image is-48x48">
                            <img class="is-64x64" :src="hotTag.image">
                        </div>
                    </div>
                </router-link>
            </div>
        </div>

    </el-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {hotTag} from "../../api/tag";

    export default {
        name: "LoginWelcome",
        data(){
          return{
              hotTags:[]
          }
        },
        computed:{
            ...mapGetters(['token'])
        },
        mounted() {
            this.init()
        },
        methods:{
            init(){
                hotTag().then(res=>{
                    const {data}=res
                    this.hotTags=data
                })
            }
        }
    }
</script>

<style scoped>
    .back:hover{
        background-color: beige!important;
    }
</style>