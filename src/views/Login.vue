<template>
  <div class="login-wrap">
    <div class="ms-login" v-if="login === 0">
      <div class="ms-title">储学长的博客</div>
      <el-form :model="loginData" :rules="rules" ref="loginData" label-width="0px" class="ms-content">
        <el-form-item prop="email">
          <el-input v-model="loginData.email" placeholder="email">
            <el-button slot="prepend" icon="el-icon-message"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="loginData.password" @keyup.enter.native="submitForm('loginData')">
            <el-button slot="prepend" icon="el-icon-unlock"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('loginData')">登录</el-button>
        </div>
        <p class="login-tips"><router-link to="/login?login=1">没有账号？去注册</router-link></p>
      </el-form>
    </div>
    <div class="ms-login" v-if="login === 1">
      <div class="ms-title">储学长的博客</div>
      <el-form :model="registerData" :rules="registerRules" ref="registerData" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="registerData.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="registerData.password" @keyup.enter.native="submitForm('registerData')">
            <el-button slot="prepend" icon="el-icon-unlock"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="registerData.email" placeholder="email">
            <el-button slot="prepend" icon="el-icon-message"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('registerData')">注册并登录</el-button>
        </div>
        <p class="login-tips"><router-link to="/login?login=0">已有账号, 去登录</router-link></p>
      </el-form>
    </div>
  </div>
</template>

<script>
// import * as types from '@/vuex/mutation_types'
export default {
  data: function () {
    return {
      login: 0, // 0:登录 1：注册
      loginData: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      registerData: {
        name: '',
        password: '',
        email: ''
      },
      registerRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange'
  },
  created () {
    this.routeChange()
  },
  methods: {
    routeChange: function () {
      var that = this
      that.login = that.$route.query.login === undefined ? 1 : parseInt(that.$route.query.login)// 获取传参的login
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case 'loginData': this.userLogin()
              break
            case 'registerData': this.userRegister()
              break
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    userLogin () {
      this.$store.dispatch('user/userLogin', this.loginData).then(res => {
        if (res && res.token) {
          sessionStorage.setItem('user_data', window.btoa(JSON.stringify(res)))
          // param.loginTime = new Date().getTime()
          // sessionStorage.setItem('evolveManage_userData', window.btoa(JSON.stringify(param)))
          this.$router.push('/')
        } else {
          this.$message({
            type: 'error',
            message: '用戶名或密码不正确'
          })
        }
      })
    },
    userRegister () {
      this.$store.dispatch('user/userRegister', this.registerData).then(res => {
        console.log('ok')
        if (res) {
          // sessionStorage.setItem('user_data', window.btoa(JSON.stringify(res)))
          this.$router.push('/')
        } else {
          this.$message({
            type: 'error',
            message: '注册失败'
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
  .login-wrap{
    position: absolute;
    width:100%;
    height:100%;
    background-image: url(~@/assets/img/blog_bg.jpg);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .ms-title{
    width:100%;
    line-height: 50px;
    text-align: center;
    font-size:20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:350px;
    margin:-190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0,0,0, 0.3);
  }
  .ms-content{
    padding: 30px 30px;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
    margin-bottom: 10px;
  }
  .login-tips{
    font-size:12px;
    line-height:30px;
    color:#fff;
    text-align: right;
    a{
      color:#fff;
    }
  }
</style>
