<template>
    <div class="columns py-6">
        <div class="column is-4 is-offset-4">
            <el-card shadow="never">
                <div slot="header" class="has-text-centered has-text-weight-bold">
                    新用户入驻
                </div>
                <div>
                    <el-form
                            ref="ruleForm"
                            v-loading="loading"
                            :model="ruleForm"
                            status-icon
                            :rules="rules"
                            class="demo-ruleForm px-6"
                    >
                        <el-form-item  prop="name">
                            <el-input prefix-icon="el-icon-user-solid" placeholder="用户名" v-model="ruleForm.name" />
                        </el-form-item>

                        <el-form-item prop="pass">
                            <el-input
                                    prefix-icon="el-icon-key"
                                    v-model="ruleForm.pass"
                                    type="password"
                                    placeholder="密码"
                                    autocomplete="off"
                            />
                        </el-form-item>

                        <el-form-item  prop="checkPass">
                            <el-input
                                    prefix-icon="el-icon-key"
                                    v-model="ruleForm.checkPass"
                                    type="password"
                                    placeholder="确认密码"
                                    autocomplete="off"
                            />
                        </el-form-item>

                        <el-form-item  prop="email">
                            <el-input v-model="ruleForm.email"
                                      prefix-icon="el-icon-message"
                                      placeholder="邮箱"
                                      autocomplete="off" />
                        </el-form-item>

                        <el-form-item>
                            <button class="button is-medium is-info is-fullwidth" type="primary" @click="submitForm('ruleForm')">立即注册</button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import { userRegister } from '../../api/auth/auth'
    export default {
        name: 'Register',
        data() {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                loading: false,
                ruleForm: {
                    name: '',
                    pass: '',
                    checkPass: '',
                    email: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入账号', trigger: 'blur' },
                        {
                            min: 2,
                            max: 10,
                            message: '长度在 2 到 10 个字符',
                            trigger: 'blur'
                        }
                    ],
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {
                            min: 5,
                            max: 20,
                            message: '长度在 5 到 20 个字符',
                            trigger: 'blur'
                        }
                    ],
                    checkPass: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        {
                            type: 'email',
                            message: '请输入正确的邮箱地址',
                            trigger: ['blur', 'change']
                        }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        userRegister(this.ruleForm)
                            .then((value) => {
                                const { code, message } = value
                                    this.$message({
                                        message: '账号注册成功',
                                        type: 'success'
                                    })
                                    /*setTimeout(() => {
                                        this.loading = false
                                        this.$router.push('/login')
                                    }, 0.1 * 1000)*/
                                    this.loading = false
                                    this.$router.push({
                                        name:'login',
                                        params:{
                                            username:this.ruleForm.name,
                                            password:this.ruleForm.pass
                                        }
                                    })
                            })
                            .catch(() => {
                                this.loading = false
                            })
                    } else {
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
            }
        }
    }
</script>

<style scoped>
</style>