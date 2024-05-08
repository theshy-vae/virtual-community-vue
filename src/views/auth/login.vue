<template>
    <div class="py-6">
        <div class="column is-4 is-offset-4" >
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane  label="账号密码登录" name="first" style="height: 350px">
                    <div>
                      <el-form
                          v-loading="loading"
                          :model="ruleForm"
                          status-icon
                          :rules="rules"
                          ref="ruleForm"
                          class="demo-ruleForm px-6"
                          @submit.native.prevent
                      >
                        <el-form-item  prop="name" class="mt-6">
                          <el-input  prefix-icon="el-icon-user-solid" v-model="ruleForm.name"  ></el-input>
                        </el-form-item>

                        <el-form-item  prop="pass" class="mt-2">
                          <el-input prefix-icon="el-icon-key" type="password" v-model="ruleForm.pass" autocomplete="off" ></el-input>
                        </el-form-item>

                        <el-form-item label="记住" prop="delivery" style="">
                          <el-switch v-model="ruleForm.rememberMe"></el-switch>
                        </el-form-item>

                        <el-form-item>
                          <button  class="button is-medium is-fullwidth is-info" @click="submitByAccount()">登录</button>
                        </el-form-item>
                        <router-link  :to="{ path: '/register' }">
                          <div>没有账号？点我注册</div>
                        </router-link>

                      </el-form>
                    </div>
                </el-tab-pane>
              <el-tab-pane label="邮箱登录" name="second" style="height: 350px">
                <div>
                  <el-form
                      v-loading="loading"
                      :model="ruleForm"
                      status-icon
                      :rules="rules"
                      ref="ruleForm"
                      class="demo-ruleForm px-6"
                      @submit.native.prevent
                  >
                    <el-form-item  prop="email" class="mt-6">
                      <el-input  prefix-icon="el-icon-message" v-model="ruleForm.email"  ></el-input>
                    </el-form-item>

                    <el-form-item  prop="code" class="mt-2">
                      <el-input prefix-icon="el-icon-key" style="width:300px;margin-right: 10px" type="password" v-model="ruleForm.code" autocomplete="off" ></el-input>
                      <el-button type="primary" @click="getEmailCode" >获取验证码</el-button>
                    </el-form-item>

                    <el-form-item label="记住" prop="delivery" style="">
                      <el-switch v-model="ruleForm.rememberMe"></el-switch>
                    </el-form-item>

                    <el-form-item>
                      <button  class="button is-medium is-fullwidth is-info"  @click="submitByEmail()">登录</button>
                    </el-form-item>
                    <router-link  :to="{ path: '/register' }">
                      <div>没有账号？点我注册</div>
                    </router-link>

                  </el-form>
                </div>
              </el-tab-pane>
            </el-tabs>

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
                        { required: true, message: "请输入账号", trigger: "blur" },
                        {
                            min: 2,
                            max: 15,
                            message: "长度在 2 到 15 个字符",
                            trigger: "blur",
                        },
                    ],
                    pass: [
                        { required: true, message: "请输入密码", trigger: "blur" },
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
                            .dispatch("user/login", this.ruleForm)
                            .then(() => {
                                this.$message({
                                    message: "登录成功",
                                    type: "success",
                                    duration: 2000,
                                });
                                setTimeout(() => {
                                    this.loading = false;
                                    //this.$router.push({ path: this.redirect || "/" });
                                    this.$router.push("/");
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
            submitByEmail(){
              this.ruleForm.type=2;
              this.submitForm('ruleForm')
            },
            submitByAccount(){
                this.ruleForm.type=1;
                this.submitForm('ruleForm');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getEmailCode(){
              if(!this.ruleForm.email){
                  this.$message.warning("请输入邮箱");
              }
              if(!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(this.ruleForm.email)){
                  this.$message.warning("邮箱不合法");
              }
              getEmailCode(this.ruleForm.email).then(res=>{
                  this.$message.success("发送成功")
              })
            }
        },
        mounted() {
               this.ruleForm.name=this.$route.params.username
                this.ruleForm.pass=this.$route.params.password
          console.log(this.$route.params.username)
        }
};
</script>

<style scoped>
</style>