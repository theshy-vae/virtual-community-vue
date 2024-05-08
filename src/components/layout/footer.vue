<template>
    <footer class="footer has-text-grey-light has-background-grey-darker" v-if="user.alias!=='谭翔宇'">
        <div class="container">
            <div class="">
                <span>简洁、优雅</span>
            </div>

            <div>
                <span>{{ title }} ALL RIGHTS RESERVED</span>
                <div style="float: right">
                    <template>
                        <b-taglist attached>
                            <b-tag type="is-dark" size="is-normal">Design</b-tag>
                            <router-link to="/administerLogin">
                                <b-tag type="is-info" size="is-normal" >{{ author }}</b-tag>
                            </router-link>
                        </b-taglist>
                    </template>
                </div>
            </div>
        </div>
        <back-top></back-top>
    </footer>
</template>

<script>
    import BackTop from "../BackTop/BackTop";
    import {mapGetters} from "vuex";
    export default {
        name: "Footer",
        components: {
            BackTop
        },
        computed: {
            ...mapGetters(['token', 'user'])
        },
        data() {
            return {
                title: "© " + new Date().getFullYear() + ' 谭翔宇',
                author: '谭翔宇',
            };
        },
    };
</script>

<style scoped>
    footer {
        margin-top: 200px;
        height: 150px;
    }
    footer a{
        color: #bfbfbf;
    }
</style>