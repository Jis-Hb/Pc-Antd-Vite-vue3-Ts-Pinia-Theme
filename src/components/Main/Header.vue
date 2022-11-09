<template>
  <div class="Header">
    <div class="left">首页</div>
    <div class="right">
      <ThemeSwitch></ThemeSwitch>
      <Jis-Audio></Jis-Audio>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import JisAudio from '@/components/Jis-Audio.vue'
import { ref } from 'vue'
</script>

<style scoped lang="scss">
.Header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @include font_color('text-color');
  .left {
    font-size: 20px;
    font-weight: bold;
  }
  .right {
    display: flex;
    align-items: center;
  }
}
</style>
