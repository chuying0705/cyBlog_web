<template>
  <div class="footer">
    <div class="fcontainer">
      <p>
        博客已运行<span v-html='longTime'>{{longTime}}</span>
      </p>
      <p>
        托管于 <a href="https://github.com/Aimee1608/myblogvue" target="_blank">GitHub</a>.
        <a href="https://www.aliyun.com/?spm=a2c49.11131515.0.0.5Z9AkR" target="_blank">阿里云</a> 提供静态文件云存储服务.
        <a href="https://tongji.baidu.com/web/welcome/login" target="_blank">百度统计</a> 提供网站统计服务.
        <a href="https://www.cloudxns.net/Order/index.html" target="_blank">CloudXNS</a> 提供 DNS 解析服务
      </p>
      <p>
        © 2019 <a href="#">储学长</a>. 由 <a href="https://cn.vuejs.org/" target="_blank">Vue</a> 强力驱动.
        Theme By <a href="https://element.eleme.cn" target="_blank">ElementUI</a>.
        沪ICP备12345678号-1.
      </p>
      <p>
        <span>Made with</span>
        <svg class="icon fheart" aria-hidden="true">
          <use xlink:href="#icon-xinaixin"></use>
        </svg>
        <span>by SeniorChu</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      longTime: ''
    }
  },
  methods: { // 事件处理器
    runTime: function () { // 运行倒计时
      let that = this
      let oldTime = new Date('2019/09/01 00:00:00')
      setInterval(function () {
        let nowTime = new Date()
        let longTime = nowTime - oldTime
        let days = parseInt(longTime / 1000 / 60 / 60 / 24, 10) // 计算剩余的天数
        let hours = parseInt(longTime / 1000 / 60 / 60 % 24, 10) // 计算剩余的小时
        let minutes = parseInt(longTime / 1000 / 60 % 60, 10)// 计算剩余的分钟
        let seconds = parseInt(longTime / 1000 % 60, 10)// 计算剩余的秒数
        that.longTime = days + '天' + hours + '小时' + minutes + '分' + seconds + '秒'
      }, 1000)
    }
  },
  components: { // 定义组件

  },
  created () { // 生命周期函数
    // 替换底部图片
    let that = this
    that.runTime()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .footer{
    background-color: #232323;
    color: #999;
    font-size: 12px;
    text-align: center;
    line-height: 1.5;
    padding:15px 10px 10px 10px;
    .fcontainer{
      p{
        margin:5px 0;
        z-index: 3;
      }
      a{
        color:#795548;
        z-index: 3;
      }
      a:hover{
        color:#999;
      }

      /*心脏呼吸*/
      .fheart{
        width:25px;
        height:25px;
        margin-top:-10px;
        top:5px;
        position: relative;
        vertical-align: baseline;
        -webkit-animation: heartScale 1.33s ease-in-out infinite;
        animation: heartScale 1.33s ease-in-out infinite;
      }
      @keyframes heartScale {
        0%{transform: scale(1)}
        50%{transform: scale(0.8)}
        100%{transform: scale(1)}
      }
      @-webkit-keyframes heartScale {
        0%{transform: scale(1)}
        50%{transform: scale(0.8)}
        100%{transform: scale(1)}
      }
    }
  }
</style>
