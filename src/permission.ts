import router from './router'
import { getToken } from '@/utils/Auth'
import { message } from 'ant-design-vue'

router.beforeEach((to, from, next) => {
  if (to.path !== '/') {
    if (getToken() != null && getToken() != '' && getToken() != undefined) {
      next()
    } else {
      next('/')
      message.error('小心被关小黑屋哟')
    }
  } else {
    next()
  }
})
