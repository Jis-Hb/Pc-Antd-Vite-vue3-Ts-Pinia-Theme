import { createApp } from 'vue'
import router from '@/router/index'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
import App from './App.vue'

import Particles from 'particles.vue3'

import LayUi from '@layui/layui-vue'
import '@layui/layui-vue/lib/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'

import '@/static/Font/iconfont.css'
import '@/static/Css/reset.css'

import './permission'

const pinia = createPinia()

pinia.use(piniaPluginPersist)

createApp(App)
  .use(router)
  .use(pinia)
  .use(LayUi)
  .use(ElementPlus)
  .use(Particles)
  .use(Antd)
  .mount('#app')
