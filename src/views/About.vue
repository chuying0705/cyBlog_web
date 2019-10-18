<template>
  <div class="detail-container">
    <div class="wrap">
      <div class="mask">
        <h1>储学长的一亩三分地</h1>
        <!--<h5>--储学长</h5>-->
      </div>
      <Header></Header>
    </div>
    <!--<div class="header-wrap">-->
      <!--<Header></Header>-->
    <!--</div>-->
    <div class="content-container" id="articleDetail">
      <el-card shadow="never" class="introduction">
        <el-avatar :size="100" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        <h4>一枚生活和技术双重bug创造者</h4>
        <h3>关于储学长</h3>
        <p></p>
      </el-card>
      <el-card shadow="never" class="contact-box">
        <h3>联系我</h3>
        <el-row class="contact-icon-box">
          <el-button type="info" circle plain @click="clickContact('github')"><svg class="icon fheart face" aria-hidden="true"><use xlink:href="#icon-github"></use></svg></el-button>
          <el-button type="danger" circle plain @click="clickContact('jianshu')"><svg class="icon fheart face" aria-hidden="true"><use xlink:href="#icon-jianshu"></use></svg></el-button>
          <el-popover
            style="margin: 10px;"
            placement="top"
            trigger="click">
            <el-image style="width: 100px; height: 100px" :src="contact.gongzhonghao.url" fit="fit"></el-image>
            <span style="writing-mode: vertical-rl; margin: 15px 20px">微信扫一扫</span>
            <!--<el-button slot="reference">hover 激活</el-button>-->
            <el-button slot="reference" type="success" circle plain><svg class="icon fheart face" aria-hidden="true"><use xlink:href="#icon-weixingongzhonghao"></use></svg></el-button>
          </el-popover>
          <el-button type="primary" circle plain @click="clickContact('email')"><svg class="icon fheart face" aria-hidden="true"><use xlink:href="#icon-youjian"></use></svg></el-button>
          <el-button type="danger" circle plain @click="clickContact('gitee')" ><svg class="icon fheart face" aria-hidden="true"><use xlink:href="#icon-gitee"></use></svg></el-button>
          <el-button type="success" circle plain @click="clickContact('wechat')"><svg class="icon fheart face" aria-hidden="true"><use xlink:href="#icon-weixin"></use></svg></el-button>
          <el-button type="primary" circle plain @click="clickContact('qq')"><svg class="icon fheart face" aria-hidden="true"><use xlink:href="#icon-qq1"></use></svg></el-button>
          <el-button type="warning" circle plain @click="clickContact('sinaBlog')"><svg class="icon fheart face" aria-hidden="true"><use xlink:href="#icon-weibo"></use></svg></el-button>
        </el-row>
      </el-card>
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
      contact: {
        github: {
          type: 'link',
          url: 'https://github.com/chuying0705'
        },
        jianshu: {
          type: 'link',
          url: 'https://www.jianshu.com/u/2ebfeab07ec4'
        },
        gongzhonghao: {
          type: 'img',
          url: require('../assets/img/qrcode_gzh.jpg')
        },
        email: {
          type: 'email',
          url: '2430648783@qq.com'
        },
        gitee: {
          type: 'link',
          url: 'https://gitee.com/chu_ying'
        },
        wechat: {
          type: 'img',
          url: 'https://gitee.com/chu_ying'
        },
        qq: {
          type: 'img',
          url: 'https://gitee.com/chu_ying'
        },
        sinaBlog: {
          type: 'link',
          url: 'https://www.weibo.com/3636573311/profile?topnav=1&wvr=6&is_all=1#_rnd1571384573478'
        }
      }
    }
  },
  computed: {
  },
  mounted () {
    // this.scroll()
    document.getElementById('articleDetail').scrollIntoView()
  },
  methods: {
    clickContact (type) {
      if (this.contact[type].type === 'link') {
        window.open(this.contact[type].url, '_blank')
      } else if (this.contact[type].type === 'email') {
        window.location.href = `mailto:${this.contact[type].url}?subject=Subject&body=message%20goes%20here`
      }
    },
    scroll () {
      var anchor = document.querySelector('#articleDetail')
      // console.log(anchor,anchor.offsetTop);
      var top = anchor.offsetTop - 60
      document.body.scrollTop = top
      // Firefox
      document.documentElement.scrollTop = top
      // Safari
      window.pageYOffset = top
    },
    load () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .detail-container{
    background-color: #f9f9f9;
    position: relative;
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
    .content-container{
      width: 880px;
      margin: 0px auto;
      padding: 70px 0 20px;
      .introduction{
        text-align: center;
      }
      .contact-box{
        text-align: center;
        .contact-icon-box > button, .contact-icon-box > div{
          margin: 20px 10px;
        }
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
