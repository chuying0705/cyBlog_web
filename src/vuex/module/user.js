// import * as types from '../mutation_types'
import axios from 'axios'
// import qs from 'qs'
// import { Message } from 'element-ui'
// axios设有全局拦截,无需拦截则使用axios实例
const axiosInstance = axios.create({})
let base = ''

export default {
  namespaced: true,
  state: {
    // 首页数据
    userData: '',
    userList: []
  },
  mutations: {
    // 处理状态
    // [types.SET_USER_ROLE] (state, data) {
    //   state.userData = data
    // },
    // [types.SET_USER_LIST] (state, data) {
    //   state.userList = data
    // }
  },
  actions: {
    userLogin (context, params) {
      let param = {
        email: params.email,
        password: params.password
      }
      return new Promise(resolve => {
        axiosInstance({
          method: 'post',
          url: `${base}/user/login`,
          data: param
        }).then(res => {
          resolve(res.data)
        })
          .catch((error) => {
            resolve(error)
            console.log(error)
          })
      })
    },
    userRegister (context, params) {
      let param = {
        name: params.username,
        email: params.email,
        password: params.password
      }
      console.log(param)
      return new Promise(resolve => {
        axiosInstance({
          method: 'post',
          url: `${base}/user/register`,
          data: param
        }).then(res => {
          resolve(res.data)
        })
          .catch((error) => {
            resolve(error)
            console.log(error)
          })
      })
    }
  }
}
