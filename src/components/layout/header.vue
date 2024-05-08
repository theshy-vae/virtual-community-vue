<template>
    <header class="header has-background-white has-text-black" v-if="user.alias!=='谭翔宇'">
        <b-navbar
                class="container is-white"
                :fixed-top="true"
        >
            <template slot="brand">
                <b-navbar-item tag="div" @click="toIndex" class="back">
                    <img :src="tiebaImg" alt="logo">
                    <span class="ml-2">虚拟社区</span>
                </b-navbar-item>

                <b-navbar-item tag="div">
                    <b-field position="is-centered" style="margin-left: 320px">
                        <b-input
                                v-model="searchKey"
                                placeholder="搜索"
                                rounded
                                clearable
                                @keyup.enter.native="search()"
                                style="width: 300px"
                        />
                        <p class="control">
                            <b-button
                                    class="is-info"
                                    @click="search()"
                            >我搜
                            </b-button>
                        </p>
                    </b-field>
                </b-navbar-item>



            </template>

            <template slot="end" style="margin-right: -10px">

                <b-navbar-item tag="div">
                    <b-switch
                            v-model="darkMode"
                            passive-type="is-warning"
                            type="is-dark"
                    >
                        {{ darkMode ? "夜" : "日" }}
                    </b-switch>
                </b-navbar-item>
                <img v-if="!(token == null || token === '')" :src="user.avatar" class="image is-48x48" style="border-radius: 25px"/>
                <b-navbar-item
                        v-if="token == null || token === ''"
                        tag="div"
                >
                    <div class="buttons">
                        <b-button type="is-danger" tag="router-link" :to="{ path: '/login' }" outlined>
                            登录
                        </b-button>
                    </div>
                </b-navbar-item>

                <b-navbar-dropdown
                        v-if="!(token == null || token === '')"
                        :label="user.username"
                >
                    <b-navbar-item
                            tag="router-link"
                            :to="{ path: `/user/${user.username}/home` }"
                    >
                        🧘 个人中心
                    </b-navbar-item>
                    <hr class="dropdown-divider">
                    <b-navbar-item
                            tag="router-link"
                            :to="{ path: `/user/${user.username}/setting` }"
                    >
                        ⚙ 设置中心
                    </b-navbar-item>
                    <hr class="dropdown-divider">
                    <b-navbar-item
                            tag="a"
                            @click="logout"
                    > 👋 退出登录
                    </b-navbar-item>
                </b-navbar-dropdown>
            </template>
        </b-navbar>
    </header>
</template>

<script>
    import { disable as disableDarkMode, enable as enableDarkMode } from 'darkreader'
    import {getDarkMode, getToken, setDarkMode} from '../../utils/auth'
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                show:true,
                name1:this.$store.getters.user.username,
                logoUrl: require('../../assets/logo.png'),
                tiebaImg: require('../../assets/logo.png'),
                searchKey: '',
                darkMode: false
            }
        },
        mounted() {
            if(this.user.alias==='谭翔宇') this.show=false
            console.log(this.user.alias)
            console.log(this.user)
            console.log(this.token)
        },
        computed: {
            ...mapGetters(['token', 'user'])
        },
        watch: {
            // 监听Theme模式
            darkMode(val) {
                if (val) {
                    enableDarkMode({})
                } else {
                    disableDarkMode()
                }
                setDarkMode(this.darkMode)
            }
        },
        created() {
            // 获取cookie中的夜间还是白天模式
            this.darkMode = getDarkMode()
            if (this.darkMode) {
                enableDarkMode({})
            } else {
                disableDarkMode()
            }
        },
        methods: {
            async logout() {
                this.$store.dispatch('user/logout').then(() => {
                    this.$message.info('退出登录成功')
                    setTimeout(() => {
                        this.$router.push({ path: this.redirect || '/' })
                    }, 500)
                })
            },
            search() {
                this.$router.push('/')
                this.bus.$emit('reload',this.searchKey)
                this.searchKey=''
            },
            toIndex(){
                this.$store.commit('setSearch','');//在vuex中存储关键词
                this.$router.push('/')//跳转到首页展示内容
                this.bus.$emit('reload','')//触发搜索事件
            }
        }
    }
</script>

<style scoped>
    input {
        width: 80%;
        height: 86%;
    }
    .back:hover{
        background-color: #f2f5f6;
    }
</style>