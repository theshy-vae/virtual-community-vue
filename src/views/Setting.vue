<template>
    <div class="columns " style="margin-bottom: 200px">
            <el-card  class="column is-6 is-offset-3 " >
            <el-tabs tab-position="left" style="height: 250px;" >
                <el-tab-pane label="个人信息" class="is-size-1-mobile  mt-2">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="username" style="width: 400px">
                            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱" prop="email" style="width: 400px">
                            <el-input type="text" v-model="ruleForm.email"  autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="头像" >
                    <div style="display: flex;flex-direction: column;align-items: center">
                        <div class="is-size-5 has-text-info-dark">点击上传</div>
                        <el-upload
                                class="avatar-uploader"
                                :action="url"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <i class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>

                </el-tab-pane>
                <el-tab-pane label="密码">
                    <el-form :model="passRuleForm" status-icon :rules="rules" ref="passRuleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="新密码" prop="pass" style="width: 400px">
                            <el-input type="password" v-model="passRuleForm.pass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass" style="width: 400px">
                            <el-input type="password" v-model="passRuleForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitPassForm('passRuleForm')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        </div>



</template>

<script>
    import {updateUser, updateUserAvatar} from "../api/user";
    import {updatePass} from "../api/user";
    import {mapGetters} from 'vuex'
    import {removeToken, setToken} from "../utils/auth";

    export default {
        name: "Setting",
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.passRuleForm.checkPass !== '') {
                        this.$refs.passRuleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.passRuleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validatePass3 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }  else {
                    callback();
                }
            };
            return{
                ruleForm:{
                    username:'',
                    email:''
                },
                passRuleForm:{
                    pass:'',
                    checkPass:''
                },
                rules: {
                    username: [
                        {  required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        {
                            type: 'email',
                            message: '请输入正确的邮箱地址',
                            trigger: ['blur', 'change']
                        }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                },
                url:process.env.VUE_APP_SERVER_URL+'/file/upload',
                dialogImageUrl: '',
                dialogVisible: false,
                disabled: false
            }

        },
        mounted() {
            this.ruleForm.username=this.$store.getters.user.username
            this.ruleForm.email=this.$store.getters.user.email
        },
        computed:{
          ...mapGetters(['user'])
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            submitPassForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updatePass(this.passRuleForm).then(res=>{
                            this.$message.success('修改成功')
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        updateUser(this.ruleForm).then(res=>{
                            const {data} = res
                            console.log(res)
                            this.$store.commit('user/SET_TOKEN_STATE',data.token)
                            setToken(data.token)
                            this.$message.success("修改成功")
                            this.$router.push('/')
                        })
                    } else {
                        this.$store.commit('/')
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpg';
                const isJEPG = file.type === 'image/jpeg';
                const isBmp = file.type === 'image/bmp';
                const isPng = file.type === 'image/png';

                const isLt5M = file.size / 1024 / 1024 < 5;

                if (!(isJPG||isBmp||isPng||isJEPG)){
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt5M) {
                    this.$message.error('上传头像图片大小不能超过 5MB!');
                }
                return (isJPG||isBmp||isPng||isJEPG) && isLt5M;
            },
            handleAvatarSuccess(res, file) {
                var url=res.data
                updateUserAvatar(url).then(res=>{
                    this.$message.success('上传成功')
                })
            },
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>