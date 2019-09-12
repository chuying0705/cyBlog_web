<template>
  <div class="index-container">
    <div class="wrap">
      <div class="mask">
        <h1>储学长的一亩三分地</h1>
        <!--<h5>--储学长</h5>-->
      </div>
      <Header></Header>
    </div>
    <Footer></Footer>
    <el-backtop target="#app" :bottom="100" ></el-backtop>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'HelloWorld',
  components: {
    Header,
    Footer
  },
  data: function () {
    return {
    }
  },
  computed: {
  },
  methods: {
    load () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .wrap{
    width: 100%;
    height: 400px;
    background-image: url(~@/assets/img/blog_bg.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    .mask{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0,0,0,0.1);
      display: flex;
      justify-content: center;
      align-items: center;
      color: white !important;
      h1{
        font-size: 60px;
      }
    }
  }
  .el-backtop {
    position: fixed;
    right: 20px;
    bottom: 120px;
    background-color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #409eff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
    cursor: pointer;
    z-index: 5;
  }
</style>
