<template>
  <FunBar>
    <template #Left>123</template>
    <template #Right>
      <a-button type="primary">Primary</a-button>
    </template>
  </FunBar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FunBar from '@/components/FunBar.vue'
</script>

<style scoped lang="scss"></style>
