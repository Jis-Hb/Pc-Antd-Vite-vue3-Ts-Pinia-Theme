<template>
  <div class="Option-Input-Box">
    <div class="Option-Label">
      <slot name="Label" />
    </div>
    <input
      @blur="JisBlur"
      @focus="JisFocus"
      @input="JisInput"
      :placeholder="placeholder"
      v-model="modelValue"
      class="Option-Input"
      ref="InputRef"
      :type="JisType"
    />
    <i
      v-if="type == 'password' && !ShowPassword"
      @click="ShowPassChange"
      class="PassIcon iconfont icon-mimaxianshi22pxmoren"
    ></i>
    <i
      @click="ShowPassChange"
      v-if="type == 'password' && ShowPassword"
      class="PassIcon iconfont icon-mimayincang22px"
    ></i>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

const props = defineProps({
  Label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number, Array],
    default: ''
  },
  // 字段不为空时的Label颜色与边框色
  notEmptyColor: {
    type: String,
    default: '#195bff'
  }
})

let Props = ref<any>(props)
const emit = defineEmits(['update:modelValue', 'update:type', 'blur', 'focus'])
let ShowPassword = ref<Boolean>(false)
let JisType = ref(Props.value.type)
watch(
  ShowPassword,
  (PassNewVal, PassOldVal) => {
    if (PassNewVal) {
      JisType.value = 'text'
    } else {
      JisType.value = 'password'
    }
  },
  { deep: true }
)

const JisFocus = (e: any) => {
  emit('focus', e)
  if (e.target.value != '') {
    e.currentTarget.parentElement.style = `overflow:hidden;`
    e.currentTarget.previousElementSibling.style = `background-color:${Props.value.notEmptyColor};color:#fff;border-radius:0;`
    // e.currentTarget.previousElementSibling.firstElementChild.style = 'color:#fff;'
  } else {
    e.currentTarget.previousElementSibling.style =
      ' @include background_color("background_2color");transform: translate(-7px, -7px);box-shadow: 15px 10px 10px #edf0f1;'
    e.currentTarget.parentElement.style = ''
    // e.currentTarget.previousElementSibling.firstElementChild.style = ''
  }
}
const JisBlur = (e: any) => {
  emit('blur', e)
  if (e.target.value != '') {
    e.currentTarget.parentElement.style = `overflow:hidden;`
    e.currentTarget.previousElementSibling.style = `background-color:${Props.value.notEmptyColor};color:#fff;border-radius:0;`
    // e.currentTarget.previousElementSibling.firstElementChild.style = 'color:#fff;'
  } else {
    e.currentTarget.previousElementSibling.style = ''
    e.currentTarget.parentElement.style = ''
    // e.currentTarget.previousElementSibling.firstElementChild.style = ''
  }
  // return (e.currentTarget.previousElementSibling.style =
  //   'background-color:#195bff;color:#fff;transform: translate(-7px, -7px);box-shadow: 0px 0px 10px #0d47a1;')
}

const JisInput = (e: any) => {
  emit('update:modelValue', e.target.value)
}
const ShowPassChange = (e: any) => {
  ShowPassword.value = !ShowPassword.value
}
</script>

<style scoped lang="scss">
.Option-Input-Box {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 35px;
  // margin-bottom: 20px;
  border-radius: 20px;
  @include background_color('background_2color');

  .Option-Label {
    position: relative;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    width: 40px;
    height: 100%;
    @include background_color('background_2color');
    border-radius: 10px;
    @include themeify {
      box-shadow: 5px 0px 10px themed('background_color') !important;
    }
  }

  .Option-Input {
    flex: 1;
    width: 100%;
    height: 100%;
    border: none;
    box-sizing: border-box;
    @include background_color('background_2color');

    border-radius: 20px;
    padding: 0 10px;
    font-size: 12px;
    letter-spacing: 1px;
    @include font_color('text-color');
    &::-webkit-input-placeholder {
      @include font_color('text-color');
    }
  }
  .PassIcon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translate(0, -50%);
    color: #195bff;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
