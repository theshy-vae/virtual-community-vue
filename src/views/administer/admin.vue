<template>
    <el-card style="width: 80%;margin-left: 150px">
        <el-button type="warning" class="mb-4" @click="goIndex">
            返回首页
        </el-button>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-input style="width: 300px" @keyup.enter.native="getUserList" v-model="searchKey" placeholder="请输入视频关键字" :span="12">
                <el-button type="search" @click="mySearch" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button
                    v-show="mode>=2"
                    type="success" plain
                    style="width: 80px;height: 40px;margin-left: 20px"
                    @click.native.prevent="createMore"
                    size="small">
                新增
            </el-button>
            <el-tab-pane label="用户管理" name="first">
                <el-table
                        :data="userList"
                        style="width: 100%"
                        max-height="500px">
                    <el-table-column
                            prop="username"
                            label="用户名"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="邮箱"
                            width="300px">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="120">
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="deleteUser(scope.row)"
                                    size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="社区管理" name="second">
                <el-table
                        :data="tagList"
                        style="width: 100%"
                        max-height="500px">
                    <el-table-column
                            prop="name"
                            label="社区名称"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="描述"
                            width="300px">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="120">
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="deleteTag(scope.row)"
                                    size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="推广管理" name="third">
                <el-table
                        :data="pList"
                        style="width: 100%"
                        max-height="500px">
                    <el-table-column
                            prop="title"
                            label="链接名称"
                            width="120px">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="描述"
                            width="300px">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="300px">
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="deleteP(scope.row)"
                                    size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="视频管理" name="fourth">
                <el-table
                        :data="videoList"
                        style="width: 100%"
                        max-height="500px">
                    <el-table-column
                            prop="name"
                            label="视频名称"
                            width="120px">
                    </el-table-column>
                    <el-table-column
                            prop="count"
                            label="播放量"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="300px">
                        <template slot-scope="scope">
                            <el-button
                                    @click.native.prevent="deleteVideo(scope.row)"
                                    size="small">
                                移除
                            </el-button>

                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <el-dialog  title="新增推广" :visible.sync="dialogFormVisible" width="400px" class="has-text-centered">
            <el-input type="text" placeholder="请输入推广名称"
                      v-model="promotion.title" class="mb-3" style="width: 300px"></el-input>
            <el-input type="text" placeholder="请输入推广描述"
                      v-model="promotion.description" class="mb-3"  style="width: 300px"></el-input>
            <el-input type="text" placeholder="请输入推广链接地址"
                      v-model="promotion.link" class="mb-3"  style="width: 300px"></el-input>
            <button class="button is-info is-fullwidth" style="width: 300px;margin-left: 30px;margin-top: 5px" @click="create">创建</button>
        </el-dialog>
        <el-dialog  title="新增视频" :visible.sync="dialogFormVisibleVideo" width="400px" class="has-text-centered">
            <el-input type="text" placeholder="请输入视频标题"
                      v-model="video.name" class="mb-3" style="width: 300px"></el-input>
            <el-upload
                    ref="imgUpload"
                    class="upload-demo"
                    multiple
                    :limit="1"
                    :action="imgUploadUrl"
                    :on-preview="handlePreviewImg"
                    :on-remove="handleRemoveImg"
                    :on-success="handlerSuccessImg"
                    list-type="picture">
                <el-button size="small" type="primary">点击上传封面</el-button>
                <div slot="tip" class="el-upload__tip">只能上传图片，且不超过3MB</div>
            </el-upload>
            <el-upload
                    ref="videoUpload"
                    class="upload-demo"
                    multiple
                    :limit="1"
                    :action="videoUploadUrl"
                    :on-preview="handlePreviewVideo"
                    :on-remove="handleRemoveVideo"
                    :on-success="handlerSuccessVideo"
                    >
                <el-button size="small" type="primary">点击上传视频</el-button>
                <div slot="tip" class="el-upload__tip">仅支持MP4格式视频，最大不能超过1GB</div>
            </el-upload>

            <button class="button is-info is-fullwidth" style="width: 300px;margin-left: 30px;margin-top: 5px" @click="createVideo">创建</button>
        </el-dialog>
    </el-card>

</template>

<script>
    import {deleteUserByid, getUserList} from "../../api/user";
    import {deleteTag, deleteTagAvatar, getTagList} from "../../api/tag";
    import {createVideo, deleteVideo, getVideoList, getVideoListByName} from "../../api/video";
    import {createPromotion, deleteP, getList} from "../../api/promote";

    export default {
        data() {
            return {
                mode:0,
                activeName: 'first',
                searchKey:'',
                userList: [],
                tagList:[],
                pList:[],
                videoSearchKey:'',
                videoList:[],
                promotion:{},
                dialogFormVisible:false,
                dialogFormVisibleVideo:false,
                video:{},
                imgUploadUrl:process.env.VUE_APP_SERVER_URL+'/file/imgUpload',
                videoUploadUrl:process.env.VUE_APP_SERVER_URL+'/file/videoUpload',
                loading:false,
                fileList:[],
        };
        },
        methods: {
            handleClick(tab, event) {
                this.mode=tab.index
            },
            mySearch(){
                console.log(this.mode)
                if(this.mode==='0') this.getUserList()
                else if(this.mode==='1') this.getTagList()
                else if(this.mode==='2') this.getPList()
                else if(this.mode==='3') this.getVideoList()
            },
            deleteUser(row) {
                deleteUserByid(row.id).then(res=>{
                    this.$message.success("删除成功")
                    this.getUserList()
                })
            },
            getUserList(){
                getUserList(this.searchKey).then(res=>{
                    console.log(res)
                    this.userList=res.data
                })
            },
            deleteTag(row){
                deleteTag(row.id).then(res=>{
                    this.$message.success("删除成功")
                    this.getTagList()
                })
            },
            getTagList(){
                getTagList(this.searchKey).then(res=>{
                    console.log(res)
                    this.tagList=res.data
                })
            },
            getPList(){
                getList(this.searchKey).then(res=>{
                    this.pList=res.data
                })
            },
            deleteP(row){
                deleteP(row.id).then(res=>{
                    this.$message.success("删除成功")
                    this.getPList()
                })
            },
            createP(){
                this.dialogFormVisible=true
            },
            create(){
                createPromotion(this.promotion).then(res=>{
                    this.$message.success("添加成功")
                    this.dialogFormVisible=false
                    this.getPList()
                })
            },
            getVideoList(){
                getVideoListByName(this.searchKey).then(res=>{
                    this.videoList=res.data
                })
            },
            deleteVideo(row){
                deleteVideo(row.id).then(res=>{
                    this.getVideoList()
                    this.$message.success("删除成功")
                })
            },
            handleRemoveImg(file) {
                //取消上传的文件路径
                var oldUrl=file.response.data
                deleteTagAvatar(oldUrl)
            },
            handlePreviewImg(file) {
                console.log('sb');
            },
            handlerSuccessImg(res){
                this.video.img_path=res.data
            },
            handleRemoveVideo(file) {
                //取消上传的文件路径
                var oldUrl=file.response.data
                deleteTagAvatar(oldUrl)
            },
            handlePreviewVideo(file) {
                this.loading=true
            },
            handlerSuccessVideo(res){
                this.loading=false
                this.video.path=res.data
            },
            showVideoDialog(){
                this.dialogFormVisibleVideo=true
            },
            createVideo(){
                createVideo(this.video).then(res=>{
                    this.$message.success("添加成功")
                    this.$refs['imgUpload'].clearFiles();
                    this.$refs['videoUpload'].clearFiles();
                    this.video={}
                    this.getVideoList()
                    this.dialogFormVisibleVideo=false
                })
            },
            createMore(){
                if(this.mode==='2') this.createP()
                else if(this.mode==='3') this.showVideoDialog()
            },
            goIndex(){
                this.$store.dispatch('user/logout').then(() => {
                    setTimeout(() => {
                        this.$router.push('/' )
                    }, 500)
                })
            }
        },
        mounted() {
            this.getUserList()
            this.getTagList()
            this.getPList()
            this.getVideoList()
        }
    };
</script>

<style scoped>
</style>