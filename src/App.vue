<template>
  <div>
    <div class="mb-5 ">
      <Header></Header>
    </div>
    <div >
      <router-view :key="$route.path + $route.query.t"/>
    </div>
    <div>
      <Footer></Footer>
    </div>
  </div>
</template>

<style>

</style>
<script>
  import Header from "./components/layout/header";
  import Footer from "./components/layout/footer";
  export default {
    components: {Footer, Header},
  }
</script>

<style>
</style>