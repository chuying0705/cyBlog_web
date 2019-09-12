<template>
  <div class="header-container">
    <el-row>
      <el-col :span="24">
        <div class="header-wrap">
          <el-menu class="header-content"
                   :default-active="activeIndex"
                   mode="horizontal"
                   background-color="rgba(0,0,0,0)"
                   text-color="#fff"
                   active-text-color="#fff" @select="handleSelect">
            <el-menu-item index="index">HOME</el-menu-item>
            <el-submenu index="category">
              <template slot="title">CATEGORY</template>
              <el-menu-item v-for="(item, i) in categories" :key="i" :index="item">{{item}}</el-menu-item>
            </el-submenu>
            <el-menu-item index="about">ABOUT</el-menu-item>
            <el-menu-item index="live">LIVE</el-menu-item>
            <el-submenu index="setting">
              <template slot="title">SETTING</template>
              <el-menu-item index="user">
                <i class="el-icon-user"></i>
                <span slot="title">USER</span>
              </el-menu-item>
              <el-menu-item index="logout">
                <i class="el-icon-switch-button"></i>
                <span slot="title">LOGOUT</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: function () {
    return {
      activeIndex: 'index',
      categories: [ 'a', 'b', 'c', 'd' ]
    }
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    getCategory: function () {
      this.categories = ['1', '2', '3']
    },
    handleSelect: function (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .header-wrap{
    width: 100%;
    height: 60px;
    background-color: rgba(0,0,0,0.4);
    .header-content{
      float: right;
    }
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
    /deep/ .el-submenu__title i {
      color: #fff !important;
    }
    .el-menu-item .is-active{
      background-color: transparent !important;
    }
    /deep/ .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
      min-width: 100% !important;
    }
    .submenu{
      width: 100px;
    }
  }
</style>
