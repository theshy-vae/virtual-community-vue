<template>
    <section style="margin-bottom: 15px">
        <hr />
        <lv-comments-item
                v-for="(comment,index) in comments"
                :key="`comment-${comment.id}`"
                :comment="comment"
                :name="name"
                :bigManager="bigManager"
        />
        <el-pagination
                v-show="page.total > 20"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.current"
                :page-sizes="[15]"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
        </el-pagination>
        <h3 class="title is-5 mt-4">发表评论</h3>
        <lv-comments-form :slug="slug" v-if="token" @loadComments="load"/>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { fetchCommentsByTopicId } from '../../api/comment'
    import LvCommentsForm from './CommentsForm'
    import LvCommentsItem from './CommentsItem'
    export default {
        name: 'LvComments',
        components: {
            LvCommentsForm,
            LvCommentsItem
        },
        data() {
            return {
                comments: [],
                tab:'latest',
                page: {
                    current: 1,
                    size: 15,
                    total: 0,
                    tab: 'latest'
                },
            }
        },
        props: {
            slug: {
                type: String,
                default: null
            },
            name:{
                type: String
            },
            bigManager:{
                type:String
            }
        },
        computed: {
            ...mapGetters([
                'token'
            ])
        },
        async mounted() {
            var that=this
            //点击‘只看楼主’后出发，改tab再发送请求
            this.$bus.$on('only',function () {
                if(that.tab==='latest') that.tab='only'
                else that.tab='latest'
                that.fetchComments()
            })
            //删除评论后触发，重新加载评论
            this.$bus.$on('reload',function () {
                that.fetchComments()
            })
            await this.fetchComments()
        },
        methods: {
            // 初始化
             fetchComments() {
                fetchCommentsByTopicId(this.page.current, this.page.size, this.tab,this.slug).then(response => {
                    const { data } = response
                    this.comments = data.records
                    this.page.current=data.current
                    this.page.size=data.size
                    this.page.total=data.total
                })
            },
            load(topic_id){
              this.fetchComments(topic_id)
            },
            handleSizeChange(pageSize){
                this.page.size=pageSize
                this.fetchComments()
                window.scroll(0,0)
            },
            handleCurrentChange(current){
                this.page.current=current
                this.fetchComments()
                /*scrollTo(0, 800);*/
                window.scroll(0,0)
            },
        }
    }
</script>