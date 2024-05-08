<template>
    <section id="author">
        <el-card class="" shadow="never">
            <div slot="header" class="has-text-centered">
                <span class="has-text-weight-bold ">👨‍💻 关于作者</span>
            </div>
            <div class="has-text-centered">
                <p class="is-size-5 mb-5 is-flex columns is-vcentered">
                    <router-link :to="{ path: `/user/${user.username}/home` }">
                        <img :src="user.avatar" class="image is-48x48 ml-3" style="border-radius: 25px">

                    </router-link>
                    <router-link :to="{ path: `/user/${user.username}/home` }">
                        <span class="ml-4 back">{{ user.username }}</span>
                    </router-link>
                </p>
                <div class="columns is-mobile">
                    <div class="column is-half">
                        <code>{{ user.topicCount }}</code>
                        <p>文章</p>
                    </div>
                    <div class="column is-half">
                        <code>{{ user.followerCount }}</code>
                        <p>粉丝</p>
                    </div>
                </div>
                <div>
                    <button
                            v-if="hasFollow"
                            class="button is-success button-center is-fullwidth"
                            @click="handleUnFollow(user.id)"
                    >
                        已关注
                    </button>

                    <button v-if="!hasFollow" class="button is-link button-center is-fullwidth" @click="handleFollow(user.id)">
                        关注
                    </button>
                </div>
            </div>
        </el-card>
    </section>
</template>

<script>
    import { follow, hasFollow, unFollow } from '../../api/follow'
    import { mapGetters } from 'vuex'
    export default {
        name: 'Author',
        props: {
            user: {
                type: Object,
                default: null
            }
        },
        data() {
            return {
                hasFollow: false
            }
        },
        mounted() {
            this.fetchInfo()
        },
        computed: {
            ...mapGetters([
                'token'
            ])
        },
        methods: {
            fetchInfo() {
                if(this.token != null && this.token !== '')
                {
                    hasFollow(this.user.id).then(value => {
                        const { data } = value
                        this.hasFollow=data.hasFollow
                    })
                }
            },
            handleFollow: function(id) {
                if(this.token != null && this.token !== '')
                {
                    follow(id).then(response => {
                        const { data } = response
                        this.$message.success(data)
                        this.hasFollow = !this.hasFollow
                        this.user.followerCount = parseInt(this.user.followerCount) + 1
                    })
                }
                else{
                    this.$message.warning('请先登录')
                }
            },
            handleUnFollow: function(id) {
                unFollow(id).then(response => {
                    this.user.followerCount = parseInt(this.user.followerCount) - 1
                    this.hasFollow = !this.hasFollow
                    const { data } = response
                    this.$message.success(data)
                })
            }
        }
    }
</script>

<style scoped>
    .back:hover{
        color: orange!important;
    }
</style>