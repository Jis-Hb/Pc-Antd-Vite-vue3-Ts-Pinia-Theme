<script setup lang="ts">
let DataTheme = localStorage.getItem('data-theme')
if (DataTheme) {
  window.document.documentElement.setAttribute('data-theme', DataTheme)
} else {
  window.document.documentElement.setAttribute('data-theme', 'light')
}
window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
}
</script>

<template>
  <router-view />
  <!-- <router-view #="{ Component, route }">
    <component :is="Component" :key="route.path"></component>
  </router-view> -->
  <!-- <audio
    id="AudioId"
    src="http://www.jisyyds.top:3002/Music.mp3"
    ref="AudioRef"
    controls
    autoplay
    hidden="true"
    :loop="true"
    @play="AutoPlay"
  ></audio> -->
</template>

<style lang="scss">
::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3); */
  border-radius: 10px;
  @include background_color('background_2color');
}

::-webkit-scrollbar {
  width: 5px;
  height: 0;
  @include background_color('background_color');
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3); */
  @include background_color('background_color');
}
</style>
