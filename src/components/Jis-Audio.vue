<template>
  <div class="MyAudio">
    <div :class="ShowPlay ? 'BackImg PlayImg' : 'BackImg'"></div>
    <div ref="IconRef" class="Icon" @click="OnPlay">
      <i
        :class="ShowPlay ? 'PlayIcon iconfont icon-zanting' : 'PlayIcon iconfont icon-24gf-play'"
      ></i>
    </div>
    <div class="AudioList">123</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const ShowPlay = ref<Boolean>(false)
const AudioRef = ref<any>(null)
let AudioFlag = ref<Boolean>(false)

const EmployeeWindow = window as any

if (!EmployeeWindow.JisAudio) {
  EmployeeWindow.JisAudio = new Audio()
  EmployeeWindow.JisAudio.src = 'http://www.jisyyds.top:3002/Music.mp3'
  EmployeeWindow.JisAudio.loop = true
  EmployeeWindow.JisAudio.autoplay = true
}
ShowPlay.value = !EmployeeWindow.JisAudio.paused
AudioFlag.value = !EmployeeWindow.JisAudio.paused

onMounted(() => {
  document.addEventListener('click', () => {
    if (!AudioFlag.value) {
      EmployeeWindow.JisAudio.play()
      ShowPlay.value = true
      AudioFlag.value = true
    }
  })
  document.addEventListener('touchend', () => {
    if (!AudioFlag.value) {
      EmployeeWindow.JisAudio.play()
      ShowPlay.value = true
      AudioFlag.value = true
    }
  })
})

const AutoPlay = () => {
  ShowPlay.value = true
  AudioFlag.value = true
}

const OnPlay = () => {
  try {
    if (!ShowPlay.value) {
      EmployeeWindow.JisAudio.play()
      // 播放开始
      ShowPlay.value = true
    } else {
      //  暂停播放
      EmployeeWindow.JisAudio.pause()
      ShowPlay.value = false
    }
  } catch (error) {}
}
</script>

<style scoped lang="scss">
.MyAudio {
  position: relative;
  width: 50px;
  height: 50px;
  margin-left: 20px;
  border-radius: 50%;
  z-index: 999;
  &:hover {
    cursor: pointer;
    .Icon {
      display: block;
      background-color: rgba(105, 100, 100, 0.568) !important;
      border-radius: 50%;

      .PlayIcon {
        display: block;
      }
    }
    .AudioList {
      position: absolute;
      bottom: -20;
      left: -60px;
      width: 150px;
      height: 200px;
      display: block;
    }
  }
  .Icon {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex !important;
    justify-content: center;
    align-items: center;
    z-index: 12;
    .PlayIcon {
      color: #fff;
      display: none;
    }
  }

  .BackImg {
    width: 100%;
    height: 100%;
    background: url('../static/Image/Photo.jpg');
    background-size: 100% 100%;
    transition: all 1s;
    border-radius: 50%;
  }
  .PlayImg {
    animation-duration: 5s;
    animation-name: imageRotate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
  @keyframes imageRotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .AudioList {
    transition: all 0.5s;
    position: absolute;
    bottom: -20;
    left: -60px;
    width: 150px;
    height: 0;
    overflow: hidden;
    border-radius: 8px;
    @include background_color('background_color');
  }
}
</style>
