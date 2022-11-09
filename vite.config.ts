import { defineConfig } from 'vite'
import { resolve } from 'path'
import {
  themePreprocessorPlugin,
  themePreprocessorHmrPlugin
} from '@zougt/vite-plugin-theme-preprocessor'
import Components from 'unplugin-vue-components/vite' // 按需加载自定义组件
import { ElementPlusResolver, LayuiVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    themePreprocessorPlugin({
      // 使用Less
      less: {
        // 此处配置自己的主题文件
        multipleScopeVars: [
          {
            scopeName: 'theme-default',
            path: resolve('src/assets/AntdTheme/default.less')
          },
          {
            scopeName: 'theme-dark',
            path: resolve('src/assets/AntdTheme/dark.less')
          }
        ],
        defaultScopeName: 'theme-default', // 默认取 multipleScopeVars[0].scopeName
        extract: false // 在生产模式是否抽取独立的主题css文件
      }
    }),
    themePreprocessorHmrPlugin(),
    Components({
      dts: true,
      dirs: ['src/components'], // 按需加载的文件夹
      resolvers: [ElementPlusResolver(), LayuiVueResolver()] // ElementPlus按需加载
    }),
    AutoImport({
      resolvers: [ElementPlusResolver(), LayuiVueResolver()],
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      dts: false,
      imports: [
        'vue',
        'vue-router',
        {
          './src/utils/env': ['apiBase']
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 全局的scss ，跨域放多个，例如：主题的变量，和一些混合等
        additionalData: `@import "./src/assets/scss/theme.scss";`
      },
      less: {
        javascriptEnabled: true
      }
    }
  }
})
