<template>
    <section class="container">
        <div class="columns">
            <div class="column is-full">
                <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span><i class="fa fa fa-book">编辑</i></span>
                    </div>
                    <div>
                        <el-form :model="topic" ref="topic" class="demo-topic">
                            <el-form-item prop="title">
                                <el-input
                                        v-model="topic.title"
                                        placeholder="输入新的主题名称"
                                ></el-input>
                            </el-form-item>

                            <!--Markdown-->
                            <div id="editor"></div>
                            <el-form-item class="mt-3">
                                <el-button type="primary" @click="handleUpdate()"
                                >更新
                                </el-button>
                                <el-button @click="resetForm('topic')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </div>
        </div>
    </section>
</template>

<script>
    import { getTopic, updateTopic } from "../../api/post";
    import E from 'wangeditor'
    let editor
    export default {
        name: "TopicEdit",
        components: {},
        data() {
            return {
                topic: {},
                tag: '',
            };
        },
        created() {
            this.fetchTopic();
        },
        methods: {
            fetchTopic() {
                getTopic(this.$route.params.id).then((value) => {
                    this.topic = value.data.topic;
                    this.tag = value.data.tag
                    editor=new E('#editor')
                    editor.config.uploadImgServer=process.env.VUE_APP_SERVER_URL+'/file/editor/upload'
                    editor.config.uploadFileName="file"  //让上传的参数名和后台接收的参数名一致
                    editor.create()
                    editor.txt.html(this.topic.content)
                });
            },
            handleUpdate: function () {
                this.topic.content = editor.txt.html()
                updateTopic(this.topic).then((response) => {
                    const { data } = response;
                    console.log(data);
                    this.$message.success("更新成功")
                    setTimeout(() => {
                        this.$router.push({
                            name: "post-detail",
                            params: { id: data },
                        });
                    }, 800);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.contentEditor.setValue("");
                this.tags = "";
            },
        },
    };
</script>

<style>
    .vditor-reset pre > code {
        font-size: 100%;
    }
</style>