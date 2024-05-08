<template>
    <div style="height: 10px;">
        <el-card class="box-card">
            <div slot="header" class="clearfix has-text-centered" style="margin-bottom: -5px;margin-top: -5px">
                <span>😏随便看看</span>
            </div>
            <div v-for="(post,index) in posts" :key="index" class="block mb-2" >
                <router-link :to="{name:'post-detail',params:{id:post.id}}" >
                    <div >
                        {{parseInt(index)+1}}
                        {{post.title}}
                    </div>
                </router-link>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {getRecommendTopics} from "../../api/post";

    export default {
        name: "Recommend",
        data(){
            return{
                posts:[{title:'a'},{title: 'b'}]
            }
        },
        props:{
            topicId:{
                type:String
            }
        },
        created() {
            this.getPosts();
        },
        methods:{
            getPosts(){
                getRecommendTopics(this.topicId).then(value=>{
                    const {data}=value;
                    this.posts=data;
                })
            }
        }
    }
</script>

<style scoped>

</style>