<template>
    <div>
        <article class="media">
            <figure class="media-left image is-48x48">
                <img :src="comment.avatar" style="border-radius: 25px;width: 48px;height: 48px">
            </figure>
            <div class="media-content">
                    <div class="content">
                            <div>
                                <router-link :to="{ path: `/user/${comment.username}/home` }">
                                    <span class="is-size-5 has-text-black-ter toHome">{{ comment.username }}</span>
                                </router-link>
                                <span v-if="comment.username == bigManager" class="tag ml-1" style="background-color: deepskyblue;color: white">
                                社区管理员
                            </span>
                                <span v-else-if="comment.username == name" class="tag ml-1" style="border-color: deepskyblue;color: deepskyblue">
                                楼主
                            </span>
                                <span class="tag ml-1" v-if="user.score<=5" style="background-color:#C4F2AA;color: white">初入茅庐</span>
                                <span class="tag ml-1" v-if="user.socre>5&&user.socre<=10" style="background-color:#1F6BC8;color: white">社区</span>
                                <span class="tag ml-1" v-if="user.score>10" style="background-color:#EAB30F;color: white">社区大神</span>
                        </div>
                        <div class="has-text-grey is-size-6">
                            <span>第{{comment.floor}}楼</span>
                            <span class="is-mobile  ml-2">{{time(comment.createTime)}}</span>
                        </div>
                    </div>
            </div>
        </article>
        <div>
            <div style="margin-left: 60px" v-html="comment.content" class="has-text-black is-size-6 "></div>
            <div v-if="comment.username==$store.getters.user.username || $store.getters.user.username==bigManager"
                 class="button level-right is-danger is-outlined " style="width: 60px;margin-left: 900px"
                 @click="dialogVisible=true">删除
            </div>
        </div>
        <hr/>

        <el-dialog
                title="提示"
                center
                :visible.sync="dialogVisible"
                width="20%">
            <span>你确定要删除吗</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary"  @click="deleteComment">确 定</el-button>
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
    import {getTime} from "../../api/time";
    import {deleteComment} from "../../api/comment";
    import {getUserById} from "../../api/user";
    export default {
        name: 'LvCommentsItem',
        created() {
            this.getUserInfo()
        },
        mounted() {
            console.log(this.user.score)
        },
        data(){
            return{
                dialogVisible:false,
                user:{}
            }
        },
        props: {
            comment: {
                type: Object,
                required: true
            },
            name:{
                required: true
            },
            bigManager:{
                required:true
            }
        },
        methods:{
            time(time){
                return getTime(time)
            },
            deleteComment(){
                this.dialogVisible = false
                deleteComment(this.comment.id).then(res=>{
                    this.$bus.$emit('reload')
                    this.$message.success('删除成功')
                })
            },
            getUserInfo(){
                getUserById(this.comment.userId).then(res=>{
                    this.user=res.data
                    console.log(this.user)
                    console.log('fen:'+this.user.score)
                })
            }
        },

    }
</script>

<style scoped>
    .toHome:hover{
        color: orange!important;
    }
</style>
