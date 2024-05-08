<template>
    <article class="media">
        <div class="media-content">
            <form @submit.prevent="onSubmit">
                <b-field>
                    <div id="editor" style=""></div>
                </b-field>
                <nav class="level">
                    <div class="level-right">
                        <b-button
                                type="is-primary"
                                native-type="submit"
                                class="level-item"
                                :disabled="isLoading"
                        >
                            评论
                        </b-button>
                    </div>
                </nav>
            </form>
        </div>
    </article>
</template>

<script>
    import { pushComment } from '../../api/comment'
    import E from 'wangeditor'
    let editor
    export default {
        name: 'LvCommentsForm',
        data() {
            return {
                commentText: '',
                isLoading: false
            }
        },
        props: {
            slug: {
                type: String,
                default: null
            }
        },
        mounted() {
            editor = new E('#editor')
            editor.config.zIndex=2
            editor.config.placeholder='请输入你的评论'
            editor.config.uploadImgServer=
                process.env.VUE_APP_SERVER_URL+'/file/editor/upload'//文件上传后端接口
            editor.config.uploadFileName="file"  //让上传的参数名和后台接收的参数名一致
            editor.create()
        },
        methods: {
            async onSubmit() {
                this.isLoading = true
                this.commentText=editor.txt.html()
                try {
                    if(this.commentText===''){
                        this.$message.error('评论不能为空')
                        return false
                    }
                    let postData = {}
                    console.log(this.commentText)
                    postData['content'] = this.commentText
                    postData['topic_id'] = this.slug
                    pushComment(postData)
                    this.$message.success('评论成功')
                    this.commentText=''
                    setTimeout(()=>{
                        this.$emit('loadComments', this.slug)
                    },100)

                } catch (e) {
                    this.$buefy.toast.open({
                        message: `Cannot comment this story. ${e}`,
                        type: 'is-danger'
                    })
                } finally {
                    this.isLoading = false
                    editor.txt.clear()
                }
            }
        }
    }
</script>

<style>
    .w-e-text-container{
        height: 200px !important;/*!important是重点，因为原div是行内样式设置的高度300px*/
    }
</style>