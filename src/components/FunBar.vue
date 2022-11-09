<template>
  <div class="FunBar">
    <div class="Left">
      <slot name="Left"></slot>
    </div>
    <div class="Right">
      <slot name="Right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style scoped lang="scss">
.FunBar {
  display: flex;
  justify-content: space-between;
}
</style>
