<template>
    <div class="hero is-link is-small mb-4" style="width: 100%">
        <div class="hero-body">
            <article class="media">
                <figure class="media-left">
                    <p class="image is-64x64" >
                        <img style="border-radius: 30px;width: 60px;height: 60px" :src="tag.image" @click="handleUpdateAvatar">
                    </p>
                </figure>
                <div class="media-content">
                    <div class="field ">
                        <p class="control is-size-4 " style="margin-top: -5px">
                            {{tag.name}}社区
                        </p>
                        <span class="has-text-grey-lighter mr-3 is-size-6">关注 {{tag.followCount}}</span>
                        <span class="has-text-grey-lighter mr-3 is-size-6">帖子 {{tag.topicCount}}</span>
                        <router-link :to="{path:`/user/${tag.bigManager}/home`}">
                            <p class="has-text-grey-lighter  is-size-6" v-if="tag.bigManager">{{tag.bigManager}} <span class="tag">社区管理员</span> </p>
                        </router-link>
                        <p class="has-text-grey-lighter  is-size-6" v-if="!tag.bigManager">本社区暂无社区主</p>
                    </div>
                </div>
                <div class="media-right">
                    <button class="button is-rounded is-medium is-danger mt-3 mr-2" v-if="tag.bigManager ===
                        $store.getters.user.username" @click="dialogVisible = true">
                        删除此社区
                    </button>
                    <button :class="['button is-rounded is-medium mt-3',isSubmit===true?'is-loading':'']" >
                        <span v-show="!$store.getters.token" @click="$message.warning('请先登录')">关注</span>
                        <span v-show="follow === false" @click="handleFollow">关注</span>
                        <span v-show="follow === true"  @click="handleFollow">取关</span>
                    </button>
                </div>
            </article>
        </div>
        <el-dialog
                title="警告"
                :visible.sync="dialogVisible"
                width="30%">
            <span>你即将删除此社区，并删除所有帖子，你确定吗</span>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleDelete">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
                center
                title="上传"
                :visible.sync="dialogVisible_avatar"
                width="30%">
                <div>
                    <el-upload
                            class="upload-demo"
                            multiple
                            :limit="1"
                            :action="url"
                            :on-remove="handleRemove"
                            :on-success="handlerSuccess"
                            :file-list="fileList"
                            list-type="picture">
                        <div style="display: flex;flex-direction: column;align-items: center;margin-left: 115px">
                            <el-button size="small" type="primary" style="">点击上传头像</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传图片，且不超过3MB</div>
                        </div>
                    </el-upload>
                </div>
                <button class="button is-info is-fullwidth" style="width: 300px;margin-left: 50px;margin-top: 5px" @click="update">创建</button>
        </el-dialog>
    </div>
</template>

<script>
    import {deleteTag, deleteTagAvatar, follow, isFollow, updateAvatar} from '../../api/tag'
    export default {
        name: "tagHead",
        props:['tag','tagName'],
        data(){
            return{
                follow:'',
                tag_name:this.tagName,
                isSubmit:false,
                dialogVisible: false,
                dialogVisible_avatar:false,
                url:process.env.VUE_APP_SERVER_URL+'/file/upload',
                fileList:[],
                //image是一个临时变量，保存图片上传后返回的新图片地址
                image:''
            }
        },
        mounted() {
            if(this.$store.getters.token){
                setTimeout(()=>{
                    this.init()
                },500)
            }
        },
        methods:{
            init(){
                isFollow(this.$store.getters.user.id,this.tagName).then(res=>{
                    this.follow=res.data
                })
            },
            //关注社区或取关社区
            handleFollow(){
                this.isSubmit=true
                follow(this.follow,this.tagName).then(res=>{
                    this.follow=!this.follow
                    this.$bus.$emit('follow')
                    this.init()
                    this.isSubmit=false
                })
            },
            //删除此社区
            handleDelete(){
                this.dialogVisible = false
                deleteTag(this.tag.id).then(res=>{
                    this.$message.success('删除成功')
                    this.$router.push('/')
                })
            },
            //更新图片
            handleUpdateAvatar(){
                if(this.tag.bigManager===this.$store.getters.user.username){
                    this.dialogVisible_avatar=true
                }
            },
            handleRemove(file) {
                //取消上传的文件路径
                var oldUrl=file.response.data
                deleteTagAvatar(oldUrl)
            },
            //上传后获得新图片路径并赋值给avatar
            handlerSuccess(res){
                this.image=res.data
            },
            //点击创建后更新数据库
            update(){
                this.fileList=[]
                this.tag.image=this.image
                console.log(this.tag)
                this.dialogVisible_avatar=false
                updateAvatar(this.tag)
            }
        }
    }
</script>

<style scoped>

</style>