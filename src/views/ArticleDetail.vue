<template>
  <div class="detail-container">
    <div class="header-wrap">
      <Header></Header>
    </div>
    <div class="content-container">
      <div class="content-wrap">
        <div class="title-box">
          <h1>{{article.title}}</h1>
          <div class="desc-wrap">
            <el-tag type="info" size="mini">
              {{article.category}}
            </el-tag>
            <el-tag class="desc-item" v-for="(item,i) in article.tag" :key="i" type="info" size="mini">
              {{item}}
            </el-tag>
          </div>
          <div class="desc-wrap">
            <el-tag :key="article.from" :type="article.from === 0? 'danger':''" size="mini">
              {{ article.from === 0? '原创':'转载' }}
            </el-tag>
            <time class="desc-item">{{article.createTime}}</time>
            <span class="desc-item">字数: {{article.content.length}}</span>
            <span class="desc-item">阅读: {{article.readCount}}</span>
          </div>
        </div>
        <div class="markdown-body" v-html="content"></div>
        <div class="count-box">
          <div><el-button size="small" circle><svg class="icon fheart" aria-hidden="true"><use xlink:href="#icon-dianzan_active-copy"></use></svg></el-button> {{article.likeCount}}人点赞</div>
          <div><el-button size="small" circle icon="el-icon-star-off"></el-button> {{article.likeCount}}人收藏</div>
          <div><el-button size="small" circle icon="el-icon-share"></el-button> {{article.likeCount}}人分享</div>
        </div>
        <el-divider class="line"><i class="el-icon-moon-night"></i></el-divider>
        <div class="bottom clearfix">
          <el-image class="avatar" :src="article.authorAvatar" fit="cover"></el-image>
          <span class="authorName">
          {{article.authorName}}
          <el-tag :key="article.from" :type="article.from === 0? 'danger':''" size="mini">
            {{ article.from === 0? '原创':'转载' }}
          </el-tag>
        </span>
          <time class="time">{{article.createTime}}</time>
          <el-button class="praise" plain size="small" type="primary" round>赞赏</el-button>
        </div>
      </div>
      <div class="comment-wrap">
        <div class="comment-box">
          <el-row>
            <el-col :span="2" class="avatar-box">
              <el-image class="avatar" :src="article.authorAvatar" fit="cover"></el-image>
            </el-col>
            <el-col :span="22">
              <el-input
                class="textarea-input"
                type="textarea"
                :rows="4"
                placeholder="请输入评论"
                v-model="input_comment">
              </el-input>
              <el-row class="comment-btn" type="flex" justify="space-between">
                <el-col :span="6">
                  <el-popover
                    placement="bottom-start"
                    width="400"
                    trigger="hover">
                    <emotion @emotion="handleEmotion" :height="200" ></emotion>
                    <svg class="icon fheart face" slot="reference" aria-hidden="true"><use xlink:href="#icon-xiaolian1"></use></svg>
                  </el-popover>
                </el-col>
                <el-col :span="4">
                  <el-button plain size="small" type="primary" round @click="submitComment">发布</el-button>
                  <el-button plain size="small" type="info" round>取消</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="comment-list">
            <p>全部评论</p>
            <div class="commit-item" v-for="(item,i) in comments" :key="i">
              <el-row>
                <el-col :span="2" class="avatar-box">
                  <el-image class="avatar" :src="article.authorAvatar" fit="cover"></el-image>
                </el-col>
                <el-col :span="22">
                  <el-row class="desc-box">
                    <p class="comment-name">{{item.comment_name}}</p>
                    <p class="comment-time">{{item.comment_time}}</p>
                    <p class="comment-content" v-html="item.comment_content"></p>
                    <div class="comment-op">
                      <span><svg class="icon fheart" aria-hidden="true"><use xlink:href="#icon-dianzan_active-copy"></use></svg>赞{{item.comment_like}}</span>
                      <span @click="showInput(i)"><svg class="icon fheart" aria-hidden="true"><use xlink:href="#icon-pinglun2"></use></svg>回复</span>
                    </div>
                  </el-row>
                  <!--回复-->
                  <el-row class="reply-wrap" v-for="(reply, j) in item.reply" :key="j">
                    <el-divider class="line"></el-divider>
                    <div class="reply-user">
                      <el-image class="avatar" :src="article.authorAvatar" fit="cover"></el-image>
                      <p class="reply-name">{{reply.reply_from}}</p>
                      <p class="reply-time">{{reply.reply_time}}</p>
                    </div>
                    <p class="reply-content">{{reply.reply_content}}</p>
                    <div class="reply-op">
                      <span @click="showInput(i)"><svg class="icon fheart" aria-hidden="true"><use xlink:href="#icon-pinglun2"></use></svg>回复</span>
                    </div>
                  </el-row>
                  <!--输入框-->
                  <div class="input-box" v-show="item.showInput">
                    <el-input
                      class="textarea-input"
                      type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      :ref="'input' + i"
                      v-model="input_comment">
                    </el-input>
                    <el-row class="comment-btn" type="flex" justify="space-between">
                      <el-col :span="6">
                        <!--<el-button size="small" plain type="primary" circle></el-button>-->
                        <svg class="icon fheart face" aria-hidden="true"><use xlink:href="#icon-xiaolian1"></use></svg>
                      </el-col>
                      <el-col :span="4">
                        <el-button plain size="small" type="primary" round>发布</el-button>
                        <el-button plain size="small" type="info" round @click="closeInput(i)">取消</el-button>
                      </el-col>
                    </el-row>
                  </div>
                  <el-divider class="line" v-if="i < comments.length - 1 "></el-divider>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    <el-backtop target="#app" :bottom="100" ></el-backtop>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/xcode.css'
import 'github-markdown-css'
import Emotion from '@/components/Emotion/index'
export default {
  name: 'HelloWorld',
  components: {
    Header,
    Footer,
    Emotion
  },
  data: function () {
    return {
      article: {
        title: '这是文章标题',
        from: 0, // 0:原创，1转载
        createTime: '2019-09-10 13:00', // 创作时间
        updatedAt: '2019-09-10 13:00', // 创作时间
        readCount: 100,
        likeCount: 80,
        category: '技术',
        content: '# cyblog_web\n' +
        '\n' +
        '## Project setup\n' +
        '```\n' +
        'npm install\n' +
        '```\n' +
        '\n' +
        '### Compiles and hot-reloads for development\n' +
        '```\n' +
        'npm run serve\n' +
        '```\n' +
        '\n' +
        '### Compiles and minifies for production\n' +
        '```\n' +
        'npm run build\n' +
        '```\n' +
        '\n' +
        '### Run your tests\n' +
        '```\n' +
        'npm run test\n' +
        '```\n' +
        '\n' +
        '### Lints and fixes files\n' +
        '```\n' +
        'npm run lint\n' +
        '```\n' +
        '\n' +
        '### Customize configuration\n' +
        'See [Configuration Reference](https://cli.vuejs.org/config/).\n',
        content_type: 'md',
        tag: ['js', 'vue'],
        authorName: '储学长',
        authorAvatar: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
      },
      content: '',
      input_comment: '', // 评论
      comments: [
        {
          'comment_like': 100,
          '_id': '5d6de12885d0a539e03344f4',
          'comment_from': '5d40072fadc0743f907ed0af',
          'comment_name': '愤怒的小小颖',
          'comment_avatar': 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          'comment_time': '2019-09-03 03:42:32',
          'comment_content': `这四评论测试1 链接:https://element.eleme.cn/#/zh-CN/component/message-box <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif" align="face">`,
          'reply': [],
          'updatedAt': '2019-09-03T07:18:59.320+0000'
        },
        {
          'comment_like': 100,
          '_id': '5d6de12885d0a539e03344f4',
          'comment_from': '5d40072fadc0743f907ed0af',
          'comment_name': '愤怒的小小颖',
          'comment_avatar': 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          'comment_time': '2019-09-03 03:42:32',
          'comment_content': '这四评论测试1 链接:https://element.eleme.cn/#/zh-CN/component/message-box\n' +
          '这四评论测试1 链接:https://element.eleme.cn/#/zh-CN/component/message-box这四评论测试1 链接:https://element.eleme.cn/#/zh-CN/component/message-box这四评论测试1 链接:https://element.eleme.cn/#/zh-CN/component/message-box',
          'reply': [
            {
              '_id': '5d6e14c9ae3e991cfc94f472',
              'reply_from': '5d40072fadc0743f907ed0af',
              'reply_to': '5d40072fadc0743f907ed0af',
              'reply_content': '这是回复7',
              'reply_time': '2019-09-03 07:22:49'
            },
            {
              '_id': '5d6e14ceae3e991cfc94f473',
              'reply_from': '5d40072fadc0743f907ed0af',
              'reply_to': '5d40072fadc0743f907ed0af',
              'reply_content': '这是回复7',
              'reply_time': '2019-09-03T07:22:54.717+0000'
            }
          ],
          'updatedAt': '2019-09-03T07:18:59.320+0000'
        }
      ],
      emotionContent: ''
    }
  },
  computed: {
  },
  mounted () {
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      }
    })
    this.content = marked(this.article.content)
  },
  methods: {
    load () {
    },
    showInput (i) {
      this.$set(this.comments[i], 'showInput', true)
      console.log(this.$refs['input' + i])
      this.$nextTick(() => {
        this.$refs[ 'input' + i ][0].focus()
      })
    },
    closeInput (i) {
      this.$set(this.comments[i], 'showInput', false)
    },
    handleEmotion (i) {
      this.input_comment += i
      // console.log(this.emotionContent)
      // this.input_comment = this.emotionContent.replace(/#[\u4E00-\u9FA5]{1,3};/gi, this.emotion)
    },
    // 将匹配结果替换表情图片
    emotion (res) {
      let word = res.replace(/#|;/gi, '')
      const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
      let index = list.indexOf(word)
      return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="face">`
    },
    submitComment () {
      let comment = this.input_comment.replace(/#[\u4E00-\u9FA5]{1,3};/gi, this.emotion)
      console.log(comment)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .detail-container{
    background-color: #f9f9f9;
    position: relative;
    .header-wrap{
      width: 100%;
      height: 60px;
      /*background-color: #333;*/
      position: fixed;
      top: 0;
    }
    .content-container{
      width: 880px;
      margin: 0px auto;
      padding: 70px 0 20px;
      .content-wrap{
        min-height: calc(100vh - 252px);
        border-radius: 5px;
        background-color: white;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        padding: 24px;
        .title-box{
          text-align: center;
          h1{
            font-size: 30px;
            margin-bottom: 15px;
          }
          .desc-wrap{
            font-size: 13px;
            color: #999;
            margin: 5px;
            .desc-item{
              margin-left: 10px;
            }
          }
        }
        .line{
          margin: 30px 0;
        }
        .count-box{
          font-size: 16px;
          color: #999;
          display: flex;
          justify-content: flex-start;
          margin-top: 30px;
          >div{
            margin-right: 30px;
          }
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
          .praise{
            position: absolute;
            top: 5px;
            right: 0px;
          }
        }
      }

      .comment-wrap{
        border-radius: 5px;
        background-color: white;
        box-shadow: 0 1px 3px rgba(26,26,26,.1);
        padding: 24px;
        margin-top: 10px;

        .comment-box{
          .avatar-box{
            width: 7%;
          }
          .avatar{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 1px solid #999;
          }
          .comment-btn{
            margin-top: 10px;
            .face{
              width: 35px;
              height: 35px;
              &:hover {
                cursor: pointer;
              }
            }
          }
          .comment-list{
            >p {
              padding: 0px 10px;
              /*background-color: #ecf8ff;*/
              /*border-radius: 4px;*/
              border-left: 4px solid #50bfff;
              margin: 20px 0;
              font-size: 18px;
            }

            .desc-box{
              .comment-time{
                color: #999;
                font-size: 13px;
              }
              .comment-content{
                color: #333;
                font-size: 16px;
                margin: 10px 0 12px;
              }
              .comment-op{
                >span{
                  margin-right: 50px;
                  color: #999;
                  font-size: 14px;
                  svg{
                    margin: 0 5px;
                  }
                  &:hover {
                    color: #666;
                    cursor: pointer;
                  }
                }
                margin: 10px 0;
              }
            }
            .reply-wrap{
              .reply-user{
                position: relative;
                .reply-name{
                  font-size: 14px;
                  color: #404040;
                  position: absolute;
                  top: 5px;
                  left: 50px;
                }
                .reply-time{
                  color: #969696;
                  font-size: 13px;
                  position: absolute;
                  top: 22px;
                  left: 50px;
                }
              }
              .reply-content{
                color: #333;
                font-size: 16px;
                margin: 10px 0 12px;
              }
              .reply-op{
                >span{
                  margin-right: 50px;
                  color: #999;
                  font-size: 14px;
                  svg{
                    margin: 0 5px;
                  }
                  &:hover {
                    color: #666;
                    cursor: pointer;
                  }
                }
                margin: 10px 0;
              }
            }
            /*.line{*/
              /*margin: 20px 0;*/
            /*}*/
          }
          .input-box{
            margin-top: 10px;
          }
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
