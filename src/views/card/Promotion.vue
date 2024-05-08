<template>
    <el-card class="box-card" shadow="never">
        <div slot="header">
            <span>🚀推广</span>
        </div>
        <div>
            <div v-for="(item,index) in list" :key="index" class="block" >
                <a :href="item.link" target="_blank">
                    <p style="font-size:15px;font-weight: bold">
                        {{item.title}}<p/><br/>
                    <p style="margin-top: -10px">
                        {{item.description}}
                    </p>
                </a>
                <el-divider v-if="item.index!=list.length-1"></el-divider>
            </div>
        </div>
    </el-card>
</template>

<script>
    import {getList} from "../../api/promote";

    export default {
        name: "Promotion",
        data(){
            return{
                list:[]
            }
        },
        created() {
          this.fetchList();
        },
        methods:{
            fetchList(){
                getList("").then((res)=>{
                    this.list=res.data;
                })
            }
        }
    }
</script>

<style scoped>

</style>