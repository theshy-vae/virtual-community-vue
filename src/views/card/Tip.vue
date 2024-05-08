<template>
    <div>
        <el-card class="box-card" shadow="never">
            <div slot="header" class="is-size-5 has-text-centered">
                <span>创建社区</span>
            </div>
            <div style="display: flex;flex-direction: column;align-items: center" @click="show">
                <i class="el-icon-circle-plus-outline" style="font-size: 50px"/>
            </div>
        </el-card>

        <el-dialog  title="创建社区" :visible.sync="dialogFormVisible" width="400px" class="has-text-centered">
            <el-input type="text" placeholder="请输入社区名(默认会加上'社区')"
                      v-model="tag.name" class="mb-3" style="width: 300px"></el-input>
            <el-input type="text" placeholder="请输入社区介绍"
                      v-model="tag.description" class="mb-3"  style="width: 300px"></el-input>
            <el-upload
                    class="upload-demo"
                    multiple
                    :limit="1"
                    :action="url"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :on-success="handlerSuccess"
                    :file-list="fileList"
                    list-type="picture">
                <el-button size="small" type="primary">点击上传头像</el-button>
                <div slot="tip" class="el-upload__tip">只能上传图片，且不超过3MB</div>
            </el-upload>
            <button class="button is-info is-fullwidth" style="width: 300px;margin-left: 30px;margin-top: 5px" @click="create">创建</button>
        </el-dialog>
    </div>

</template>

<script>
    import {createTag, deleteTagAvatar} from '../../api/tag'

    export default {
        name: "Tip",
        data() {
            return {
                dialogFormVisible: false,
                formLabelWidth: '120px',
                tag:{
                    name:'',
                    description:'',
                    avatar:''
                },
                url:process.env.VUE_APP_SERVER_URL+'/file/upload',
                fileList:[],
                uploadNum:'1',
                //社区头像访问路径
            };
        },
        methods:{
            show(){
                this.dialogFormVisible=true
            },
            create(){
                if(this.$store.getters.token ==''||this.$store.getters.token==null){
                    this.$message.warning('请登陆后再创建')
                    return;
                }
                if(this.tag.name===''){
                    this.$message.warning('请输入社区名')
                    return;
                }
                if(this.tag.description===''){
                    this.$message.warning('请填写社区简介')
                    return;
                }
                if(this.tag.avatar===''){
                    this.$message.warning('请上传头像')
                    return;
                }
                createTag(this.tag.name,this.tag.description,this.tag.avatar).then(res=>{
                    this.fileList=[]
                    this.dialogFormVisible=false
                    this.$message.success('创建成功')
                })
            },
            handleRemove(file) {
                //取消上传的文件路径
                var oldUrl=file.response.data
                deleteTagAvatar(oldUrl)
            },
            handlePreview(file) {
                console.log('sb');
            },
            handlerSuccess(res){
                this.tag.avatar=res.data
            }
        }

    }
</script>

<style scoped>
    i:hover{
        color: deepskyblue!important;
    }
</style>