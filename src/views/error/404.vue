<template>
    <div>
        <img    style="width: 100%"
                src="https://yufengling.oss-cn-shenzhen.aliyuncs.com/images/2021/09/28/dec22af50ac84ff1ba7bded9357da318jpeg"/>
        <p class="" style="position: absolute;top: 20%;left: 36%;color: white;font-size: 30px">
            您所寻找的页面不存在， {{ times }} 秒后，将返回首页!
        </p>
    </div>
</template>

<script>
    export default {
        name: "404",
        data() {
            return {
                times: 5
            }
        },
        created() {
            this.goHome()
        },
        methods: {
            goHome: function () {
                this.timer = setInterval(() => {
                    this.times--
                    if (this.times === 0) {
                        clearInterval(this.timer)
                        this.$router.push({path: '/'});
                    }
                }, 1000)
            }
        }
    }
</script>

<style scoped>
</style>