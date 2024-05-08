<template>
    <div class="py-6">
        <div class="column is-4 is-offset-4" >
            <el-card>
                <div slot="header" class="clearfix">
                    <div style="text-align: center;font-size:20px;color: darkorange">管理员登录</div>
                </div>
                <el-form
                        v-loading="loading"
                        :model="ruleForm"
                        status-icon
                        :rules="rules"
                        ref="ruleForm"
                        class="demo-ruleForm px-6"
                        @submit.native.prevent
                >
                    <el-form-item  prop="name">
                        <el-input  prefix-icon="el-icon-user-solid" v-model="ruleForm.name"  ></el-input>
                    </el-form-item>
                    <el-form-item  prop="pass" class="mt-2">
                        <el-input prefix-icon="el-icon-key" type="password" v-model="ruleForm.pass" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <button  class="button is-medium is-fullwidth is-info" style="background-color: darkorange" @click="submitForm('ruleForm')">登录</button>
                    </el-form-item>
                </el-form>
            </el-card>

        </div>
    </div>
</template>

<script>
    import {getEmailCode} from "../../api/auth/auth"


    export default {
        name: "login",
        data() {
            return {
                activeName: 'first',
                redirect: undefined,
                loading: false,
                ruleForm: {
                    name: "",
                    pass: "",
                    email:"",
                    code:"",
                    rememberMe: true,
                    type:1
                },
                rules: {
                    name: [
                        { required: true, message: "请输入账号", trigger: "change" },
                        {
                            min: 2,
                            max: 15,
                            message: "长度在 2 到 15 个字符",
                            trigger: "blur",
                        },
                    ],
                    pass: [
                        { required: true, message: "请输入密码", trigger: "change" },
                        {
                            min: 5,
                            max: 20,
                            message: "长度在 5 到 20 个字符",
                            trigger: "blur",
                        },
                    ],
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.$store
                            .dispatch("user/adminLogin", this.ruleForm)
                            .then(() => {
                                this.$message({
                                    message: "登录成功",
                                    type: "success",
                                    duration: 2000,
                                });
                                setTimeout(() => {
                                    this.loading = false;
                                    //this.$router.push({ path: this.redirect || "/" });
                                    this.$router.push("/admin");
                                }, 0.1 * 1000);
                            })
                            .catch(() => {
                                this.loading = false;
                            });
                    } else {
                        return false;
                    }
                });
            },

        },
    };
</script>

<style scoped>
</style>