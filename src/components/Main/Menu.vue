<template>
  <div class="Menu" :style="!ByOverShrink ? '' : 'padding:10px 0 ;'">
    <div class="Menu-Header" :style="!ByOverShrink ? 'padding:20px;' : 'padding:10px 0 ;'">
      <div class="User" :style="!ByOverShrink ? '' : 'justify-content: center;'">
        <a-badge :count="null">
          <a-avatar
            :src="User.UserInfo.Photo"
            shape="square"
            :size="{ xs: 40, sm: 40, md: 60, lg: 60, xl: 60, xxl: 60 }"
          >
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </a-badge>
        <div class="Label_Name" v-if="!ByOverShrink && !MenuOverShrink">
          {{ User.UserInfo.nick_name }}
        </div>
      </div>
    </div>

    <div class="Menu-Content">
      <a-menu
        :openKeys="state.openKeys"
        :selectedKeys="[route.path]"
        mode="inline"
        :inline-collapsed="state.collapsed"
        @click="MenuClick"
        @openChange="onOpenChange"
      >
        <template v-for="item in Menu" :key="item.key">
          <template v-if="!item.children">
            <a-menu-item :key="item.key">
              <template #icon>
                <i :class="'iconfont MenuIcon ' + item.icon"></i>
              </template>
              {{ item.title }}
            </a-menu-item>
          </template>
          <template v-else>
            <a-sub-menu :key="item.key">
              <template #icon>
                <i :class="'iconfont MenuIcon ' + item.icon"></i>
              </template>
              <template #title>{{ item.title }}</template>
              <template v-for="TowItem in item.children" :key="item.key">
                <template v-if="!item.children">
                  <a-menu-item :key="item.key">
                    <template #icon>
                      <i :class="'iconfont MenuIcon ' + TowItem.icon"></i>
                    </template>
                    {{ TowItem.title }}
                  </a-menu-item>
                </template>
                <template v-else>
                  <a-sub-menu :key="TowItem.key">
                    <template #icon>
                      <i :class="'iconfont MenuIcon ' + TowItem.icon"></i>
                    </template>
                    <template #title>{{ TowItem.title }}</template>
                    <template v-for="TreeItem in TowItem.children" :key="TreeItem.key">
                      <template v-if="!TreeItem.children">
                        <a-menu-item :key="TreeItem.key">
                          <template #icon>
                            <i :class="'iconfont MenuIcon ' + TreeItem.icon"></i>
                          </template>
                          {{ TreeItem.title }}
                        </a-menu-item>
                      </template>
                    </template>
                  </a-sub-menu>
                </template>
              </template>
            </a-sub-menu>
          </template>
        </template>
      </a-menu>
    </div>
    <div class="Menu-Bottom">
      <div class="Bottom-item" @click="LogOut">
        <i class="BottomFont iconfont icon-tuichu"></i>
        <span class="Bottom-title" v-if="!ByOverShrink && !MenuOverShrink">退出登录</span>
      </div>
    </div>
  </div>
  <div
    :class="!ByOverShrink && !MenuOverShrink ? 'FloatMenu' : 'FloatMenuOpen'"
    @click="MenuShrink"
  >
    <i v-if="!ByOverShrink" class="MenuIcon iconfont icon-caidanzuo"></i>
    <i v-else class="MenuIcon iconfont icon-caidandakai"></i>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onMounted } from 'vue'
import useUser from '@/stores/user'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const User = ref<any>(useUser())

const Menu = reactive<any>([
  {
    key: '/index',
    title: '首页',
    icon: 'icon-shouye'
  },
  {
    key: '/index/music',
    title: '音乐',
    icon: 'icon-014-music'
  }
])

const props = defineProps({
  ByOverShrink: {
    type: Boolean,
    default: false
  },
  MenuOverShrink: {
    type: Boolean,
    default: false
  }
})
let Props = ref<any>(props)
const emit = defineEmits(['shrink', 'update:OverShrink'])

const state = reactive({
  collapsed: false,
  selectedKeys: [],
  openKeys: [],
  preOpenKeys: []
})

const LogOut = () => {
  User.value.LogOut().then(() => {
    router.push('/')
  })
}

watch(
  () => state.openKeys,
  (_val, oldVal) => {
    state.preOpenKeys = oldVal
  }
)
const toggleCollapsed = () => {
  state.collapsed = !state.collapsed

  // state.openKeys = state.collapsed ? [] : state.preOpenKeys
  console.log(state.openKeys)
}

const MenuClick = (e) => {
  let Items = null
  Menu.forEach((OneItem, OneIndex) => {
    if (e.key == OneItem.key) return (Items = OneItem)
    if (!OneItem.children) return
    OneItem.children.forEach((TwoItem, TwoIndex) => {
      if (e.key == TwoItem.key) return (Items = TwoItem)
      if (!TwoItem.children) return
      TwoItem.children.forEach((TerItem, TerIndex) => {
        if (e.key == TerItem.key) return (Items = TerItem)
      })
    })
  })
  router.push(Items.key)
  let Flag = false
  User.value.$patch((state) => {
    state.RouterList.forEach((item) => {})
    for (let i = 0; i < state.RouterList.length; i++) {
      if (state.RouterList[i].key == Items.key) {
        Flag = false
        return false
      } else {
        Flag = true
      }
    }
    if (Flag) {
      state.RouterList.push({
        title: Items.title,
        key: Items.key
      })
    }
  })
}

const onOpenChange = (keys) => {
  state.openKeys = keys
  sessionStorage.setItem('openKeys', JSON.stringify(keys))
}
const MenuShrink = () => {
  emit('shrink')
}

onMounted(() => {
  const openKey = sessionStorage.getItem('openKeys')
  if (openKey) {
    state.openKeys = JSON.parse(openKey)
  }
})
</script>

<style scoped lang="scss">
:deep(.ant-menu-inline) {
  border-right: none !important;
}
:deep(.ant-menu-vertical) {
  border-right: none !important;
}
:deep(.ant-menu.ant-menu-inline-collapsed > .ant-menu-item) {
  padding: 0 calc(50% - 25px / 2);
}
:deep(.ant-menu-submenu-title) {
  @include font_color('text-color');
}
:deep(.ant-menu-item-selected) {
  @include background_color('background_1color');
}
:deep(.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected) {
  @include themeify {
    background-color: themed('params_color') !important;
    transition: all 0.5s;
  }
}
.Menu {
  display: flex;
  flex-direction: column;
  height: 100%;

  @include font_color('text-color');
  .Menu-Header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 10px;
    .User {
      display: flex;
      align-items: center;
      .Label_Name {
        margin-left: 20px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  .Menu-Content {
    flex: 1;
    overflow: scroll;
    padding-bottom: 20px;
    .Content-MenuIcon {
      font-size: 25px;
    }
  }
  .Menu-Bottom {
    padding: 0 24px;
    .Bottom-item {
      display: flex;
      align-items: center;
      height: 50px;
      cursor: pointer;
      .BottomFont {
        font-size: 25px;
      }
      .Bottom-title {
        flex: auto;
        min-width: 0;
        text-overflow: ellipsis;
        font-weight: bold;
        font-size: 15px;
        margin-left: 10px;
      }
    }
  }
}
.FloatMenu {
  position: absolute;
  top: 25px;
  right: 0;
  height: 50px;
  width: 40px;
  border-radius: 30px 0 0px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @include background_color('background_1color');
}
.MenuIcon {
  font-size: 20px;
  @include font_color('text-color');
}
.FloatMenuOpen {
  position: absolute;
  top: 25px;
  right: -40px;
  height: 50px;
  width: 40px;
  border-radius: 0 30px 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @include background_color('background_color');
  .MenuIcon {
    font-size: 20px;
    @include font_color('text-color');
  }
}
</style>
