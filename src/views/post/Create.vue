<template>
    <div class="container">
        <div class="columns">
            <div class="column is-full">
                <el-card
                        class="box-card"
                        shadow="never"
                >
                    <div slot="header" class="clearfix">
                        <span><i class="fa fa fa-book is-size-5">{{ruleForm.tag}}社区</i></span>
                    </div>
                    <div>
                        <el-form
                                ref="ruleForm"tag
                                :model="ruleForm"
                                :rules="rules"
                                class="demo-ruleForm"
                        >
                            <el-form-item prop="title">
                                <el-input
                                        v-model="ruleForm.title"
                                        placeholder="标题"
                                />
                            </el-form-item>

                            <!--Markdown-->
                            <div id="vditor" />


                            <el-form-item class="mt-3">
                                <el-button
                                        type="primary"
                                        @click="submitForm('ruleForm')"
                                >发布
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </div>
        </div>
    </div>

</template>

<script>
    import { post } from '../../api/post'
    import E from 'wangeditor'
    import Vditor from 'vditor'
    import 'vditor/dist/index.css'

    let editor
    export default {
        name: 'TopicPost',
        data() {
            return {
                contentEditor: {},
                ruleForm: {
                    title: '', // 标题
                    tag: '', // 社区名
                    content: '' // 内容
                },
                rules: {
                    title: [
                        { required: true, message: '请输入标题', trigger: 'blur' },
                        {
                            min: 1,
                            max: 20,
                            message: '长度在 1 到 20 个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.ruleForm.tag=this.$route.query.tagName
            editor = new E('#vditor')
            editor.config.uploadImgServer=process.env.VUE_APP_SERVER_URL+'/file/editor/upload'
            editor.config.uploadFileName="file"  //让上传的参数名和后台接收的参数名一致
            editor.config.placeholder='请输入正文(不超过1000字)'
            editor.create()
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.ruleForm.content=editor.txt.html()
                        let obj=document.getElementById("vditor")
                        let imgs=obj.getElementsByTagName("img")
                        if(this.ruleForm.content===''){
                            this.$message.warning("请输入内容")
                            return false
                        }else if(editor.txt.text().length>=1000){
                            this.$message.warning('字数不能超过1000')
                            return false
                        }else if(imgs.length>3){
                            this.$message.warning('图片不能超过三张')
                            return false
                        }
                        console.log(this.ruleForm)
                        post(this.ruleForm).then((response) => {
                            const { data } = response
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'post-detail',
                                    params: { id: data.id }
                                })
                            }, 800)
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })

            },
        }
    }
</script>

<style>
</style>