<template>
  <a-layout style="width: 100%; height: 100%">
    <a-layout-sider
      :width="MenuWidth"
      class="a-layout-sider"
      v-model:collapsed="MenuOverShrink"
      :collapsedWidth="collapseWidth"
      :trigger="null"
      collapsible
    >
      <Menu @shrink="shrink" :ByOverShrink="OverShrink" :MenuOverShrink="MenuOverShrink"></Menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="a-layout-header">
        <Header></Header>
      </a-layout-header>
      <div class="Tabs" style="padding: 0 20px"></div>
      <a-layout-content class="a-layout-content">
        <a-tabs
          size="small"
          hideAdd
          :activeKey="route.path"
          type="editable-card"
          animated
          tabPosition="top"
          tabBarGutter="5px"
          @edit="onEdit"
          @change="TabsChange"
        >
          <a-tab-pane
            v-for="pane in panes"
            :key="pane.key"
            :tab="pane.title"
            :closable="pane.closable"
          >
            <router-view />
          </a-tab-pane>
        </a-tabs>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Menu from './Menu.vue'
import { ref, computed, onMounted, nextTick } from 'vue'
import useUser from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const User = useUser()
let MenuWidth = ref<string>('270')
let OverShrink = ref<any>(false)
let MenuOverShrink = ref<any>(false)
let collapseWidth = ref<number>(80)

const panes = computed(() => User.RouterList)
console.log(panes.value)

onMounted(() => {
  MenuOnresize()
  var timer = null
  window.addEventListener(
    'resize',
    () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(MenuOnresize, 300)
    },
    false
  )
})

const remove = (targetKey: string) => {
  User.$patch((state) => {
    state.RouterList.forEach((item, index) => {
      if (targetKey == item.key) {
        state.RouterList.splice(index, 1)
        router.push(state.RouterList[index - 1].key)
      }
    })
  })
}

const onEdit = (targetKey: string | MouseEvent, action: string) => {
  if (action === 'add') {
  } else {
    remove(targetKey as string)
  }
}
const TabsChange = (e) => {
  router.push(e)
}

const shrink = async () => {
  let BodyWidth = document.body.clientWidth

  if (BodyWidth <= 600) {
    if (!OverShrink.value) {
      collapseWidth.value = 0
      OverShrink.value = true
      MenuOverShrink.value = true
    } else {
      collapseWidth.value = 80
      OverShrink.value = false
      MenuOverShrink.value = true
    }
  } else {
    if (!OverShrink.value) {
      OverShrink.value = true
      MenuOverShrink.value = true
    } else {
      OverShrink.value = false
      MenuOverShrink.value = false
    }
  }
  await nextTick()
  window.dispatchEvent(new CustomEvent('ChartsResize'))
}

const MenuOnresize = () => {
  let BodyWidth = document.body.clientWidth
  if (BodyWidth <= 800) {
    OverShrink.value = true
    MenuOverShrink.value = true
  }
  if (BodyWidth <= 800) {
    collapseWidth.value = 0
    OverShrink.value = true
    MenuOverShrink.value = true
  }
  if (BodyWidth >= 800) {
    collapseWidth.value = 80
    OverShrink.value = true

    MenuOverShrink.value = true
  }
  if (BodyWidth >= 1200) {
    collapseWidth.value = 80
    OverShrink.value = false
    MenuOverShrink.value = false
  }
  window.dispatchEvent(new CustomEvent('ChartsResize'))
}
</script>

<style scoped lang="scss">
:deep(.a-layout-content) {
  padding: 0 40px !important;
}
:deep(.ant-tabs-tab-remove) {
  color: none !important;
}
.a-layout-sider {
  @include background_color('background_color');
}
.a-layout-header {
  @include background_color('background_1color');
}
.a-layout-content {
  @include background_color('background_1color');
  padding: 20px 50px;
  overflow: scroll;
  @media screen and (max-width: 1000px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    padding: 20px 20px !important;
  }
}
</style>
