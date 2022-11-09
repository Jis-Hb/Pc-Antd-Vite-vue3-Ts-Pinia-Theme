//定义关于counter的store
import { defineStore } from 'pinia'

import { layer } from '@layui/layer-vue'
import { message } from 'ant-design-vue'
import { Login, Register } from '@/Api/User'
import { getToken, setToken, removeToken } from '@/utils/Auth'

//defineStore 是返回一个函数 函数命名最好有use前缀，根据函数来进行下一步操作
const useUser = defineStore('User', {
  state: () => ({
    token: getToken(),
    UserInfo: {},
    RouterList: [
      { title: '首页', key: '/index', closable: false },
      { title: '音乐', key: '/index/music', closable: false },
    ],
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage, //localStorage存储多个key
        paths: ['token'],
        key: 'token',
      },
      {
        storage: localStorage, //localStorage存储多个key
        paths: ['UserInfo'],
        key: 'UserInfo',
      },
      {
        storage: localStorage, //localStorage
        paths: ['RouterList'],
        key: 'RouterList',
      },
    ],
  },
  getters: {},
  actions: {
    Login(User: any) {
      return new Promise((resolve, reject) => {
        Login(User).then((res: any) => {
          console.log(res)
          if (res.code == 0) {
            if (!res.data.is_admin) return message.error('暂无权限，请联系相关人员')
            setToken(res.data.token)
            message.success('登录成功')
            resolve(res)
          } else {
            message.info(res.message)
            removeToken()
            reject(res)
          }
        })
      })
    },
    LogOut() {
      return new Promise<void>((resolve, reject) => {
        removeToken()
        message.success('退出登录')
        resolve()
      })
    },
    Register(User: any) {
      return new Promise((resolve, reject) => {
        Register(User).then((res: any) => {
          if (res.code == 0) {
            message.success('注册成功')
          } else {
            message.info(res.message)
          }
        })
      })
    },
  },
})

export default useUser
