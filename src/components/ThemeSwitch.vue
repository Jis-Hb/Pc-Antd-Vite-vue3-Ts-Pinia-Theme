<template>
  <a-switch @change="ThemeChange" v-model:checked="Theme">
    <template #checkedChildren
      ><check-outlined />
      <i class="iconfont icon-yejing"></i>
    </template>
    <template #unCheckedChildren
      ><close-outlined />
      <i class="iconfont icon-weibiaoti-"></i>
    </template>
  </a-switch>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { toggleTheme } from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js'

let Theme = ref<Boolean>(false)

onMounted(() => {
  let LocalTheme = localStorage.getItem('data-theme')
  if (LocalTheme == 'light') {
    toggleTheme({
      scopeName: 'theme-default'
    })
    Theme.value = false
    setTimeout(() => {
      let particlesCanvas = document.querySelector<any>('#tsparticles').firstChild
      particlesCanvas && (particlesCanvas.style.backgroundColor = '#0d47a1')
    }, 0)
  } else if (LocalTheme == 'dark') {
    toggleTheme({
      scopeName: 'theme-dark'
    })
    Theme.value = true
    setTimeout(() => {
      let particlesCanvas = document.querySelector<any>('#tsparticles').firstChild
      particlesCanvas && (particlesCanvas.style.backgroundColor = '#0f0f0f')
    }, 0)
  }
})

const ThemeChange = (e: any) => {
  if (e) {
    toggleTheme({
      scopeName: 'theme-dark'
    })
    window.document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('data-theme', 'dark')
    let particlesCanvas = document.querySelector<any>('#tsparticles').firstChild
    particlesCanvas && (particlesCanvas.style.backgroundColor = '#0f0f0f')
  } else {
    toggleTheme({
      scopeName: 'theme-default'
    })
    window.document.documentElement.setAttribute('data-theme', 'light')
    localStorage.setItem('data-theme', 'light')
    let particlesCanvas = document.querySelector<any>('#tsparticles').firstChild

    particlesCanvas && (particlesCanvas.style.backgroundColor = '#0d47a1')
  }
}
</script>

<style scoped lang="scss"></style>
