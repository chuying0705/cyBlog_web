<template>
  <div class="index-container">
    <div class="wrap">
      <div class="mask">
        <h1>储学长的一亩三分地</h1>
        <!--<h5>--储学长</h5>-->
      </div>
      <Header></Header>
    </div>
    <div class="content-list">
      <div class="infinite-list-wrapper" style="overflow:auto">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled">
          <li v-for="(item, index) in articleList" :key="index" class="list-item">
            <el-card :body-style="{ padding: '0px' }">
              <div class="card-top">
                <el-image class="image" :src="item.img" fit="cover"></el-image>
                <div class="mask-image">{{item.title}}</div>
              </div>
              <div class="card-bottom">
                <p>{{item.desc}}</p>
                <div class="bottom clearfix">
                  <el-image
                    class="avatar"
                    :src="item.authorAvatar"
                    fit="cover"></el-image>
                  <span class="authorName">
                    {{item.authorName}}
                    <el-tag :key="item.from" :type="item.from === 0? 'danger':''" size="mini">
                      {{ item.from === 0? '原创':'转载' }}
                    </el-tag>
                  </span>
                  <time class="time">{{item.createTime}}</time>
                  <div class="count-box">
                    <span><i class="el-icon-view"></i>{{item.readCount}}</span>
                    <span>
                    <!--<i class="el-icon-star-off"></i>-->
                    <svg class="icon fheart" aria-hidden="true">
                      <use xlink:href="#icon-dianzan_active-copy"></use>
                    </svg>
                    {{item.likeCount}}
                  </span>
                  <span>
                    <svg class="icon fheart" aria-hidden="true">
                      <use xlink:href="#icon-pinglun1"></use>
                    </svg>
                    {{item.likeCount}}
                  </span>
                  </div>
                  <el-button type="text" class="button" @click="toArticleDetail">查看详情></el-button>
                </div>
              </div>
            </el-card>
          </li>
        </ul>
        <el-divider class="bottom-line" v-if="loading">加载中...</el-divider>
        <el-divider class="bottom-line" v-if="noMore">没有更多了</el-divider>
      </div>
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
      articleList: [
        {
          title: '这是文章标题',
          desc: '这是文章描述',
          img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          from: 0, // 0:原创，1转载
          authorName: '储学长',
          authorAvatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          createTime: '2019-09-10 13:00', // 创作时间
          readCount: 100,
          likeCount: 80
        },
        {
          title: '这是文章标题',
          desc: '这是文章描述',
          img: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          from: 1, // 0:原创，1转载
          authorName: '储学长',
          authorAvatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          createTime: '2019-09-10 13:00', // 创作时间
          readCount: 100,
          likeCount: 80
        },
        {
          title: '这是文章标题',
          desc: '这是文章描述',
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          from: 0, // 0:原创，1转载
          authorName: '储学长',
          authorAvatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          createTime: '2019-09-10 13:00', // 创作时间
          readCount: 100,
          likeCount: 80
        },
        {
          title: '这是文章标题',
          desc: '这是文章描述',
          img: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          from: 0, // 0:原创，1转载
          authorName: '储学长',
          authorAvatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          createTime: '2019-09-10 13:00', // 创作时间
          readCount: 100,
          likeCount: 80
        }
      ],
      count: 10,
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      // setTimeout(() => {
      //   this.count += 2
      //   this.loading = false
      // }, 2000)
    },
    toArticleDetail () {
      // this.$router.push('/detail')
      let routeUrl = this.$router.resolve({
        path: '/detail'
      })
      window.open(routeUrl.href, '_blank')
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

  .content-list{
    max-width: 880px;
    margin: 0 auto;
    .infinite-list-wrapper{
      .bottom-line{
        /*text-align: center;*/
        margin: 50px 0;
      }
      .list-item{
        width: 100%;
        margin: 40px auto 0;
        .card-top{
          position: relative;
          .mask-image{
            width: 96%;
            height: 20%;
            padding: 2%;
            background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.5));
            position: absolute;
            bottom: 0;
            color: white;
            font-size: 38px;
          }
        }
        .card-bottom{
          padding: 14px;
          >p{
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            line-height: 24px;
          }
          .bottom{
            font-size: 13px;
            color: #999;
            position: relative;
            .avatar{
              width: 40px;
              height: 40px;
              border-radius: 50%;
            }
            .authorName{
              position: absolute;
              top: 4px;
              left: 50px;
              .el-tag--mini {
                height: 18px;
                line-height: 16px;
              }
            }
            .time {
              position: absolute;
              top: 25px;
              left: 50px;
            }
            .count-box{
              position: absolute;
              top: 25px;
              left: 180px;
              > span{
                float: left;
                margin-right: 30px;
              }
            }
          }
        }
      }
    }

    .bottom {
      margin-top: 13px;
      line-height: 12px;
    }

    .button {
      padding: 0;
      float: right;
    }

    .image {
      width: 100%;
      height: 240px;
      display: block;
    }

    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }

    .clearfix:after {
      clear: both
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
