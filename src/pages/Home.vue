<template>
  <div class="Home">
    <div class="State_Container">
      <div class="State_Box" v-for="(item, index) in StateBox" :key="index">
        <div class="State_Box_Top">{{ item.label }}</div>
        <div class="State_Box_Info">
          <div class="State_Box_Info_Count">
            {{ item.Count }}
            <span>{{ item.Text }}</span>
          </div>
          <div class="State_Box_Info_Icon"></div>
        </div>
      </div>
    </div>
    <div class="Charts_Max_Box">
      <div id="User_Charts" class="User_Charts"></div>
      <div id="Music_Charts" class="Music_Charts"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, nextTick, onMounted } from 'vue'
import { EChartsOption, init } from 'echarts'
import UserOption from '@/Echarts/User'
import MusicOption from '@/Echarts/Music'

let UserChart = reactive<any>(null)
let MusicChart = reactive<any>(null)

const StateBox = reactive<any>([
  {
    label: '总用户',
    Count: '115',
    Text: '人',
  },
  {
    label: '访问量',
    Count: '4433',
    Text: '次',
  },
  {
    label: '收藏次数',
    Count: '534',
    Text: '次',
  },
  {
    label: '总音乐',
    Count: '53',
    Text: '首',
  },
])

onMounted(() => {
  UserCharts()
  MusicCharts()

  let Timer = null
  window.addEventListener('resize', () => {
    if (Timer) {
      clearTimeout(Timer)
    }
    Timer = setTimeout(() => {
      UserChart.resize()
      MusicChart.resize()
      console.log('dwadaw')
    }, 200)
  })

  window.addEventListener('ChartsResize', function () {
    setTimeout(() => {
      UserChart.resize()
      MusicChart.resize()
    }, 1000)
  })
})

const UserCharts = () => {
  // 获取dom，断言HTMLElement类型，否则会报错
  const chartEle: HTMLElement = document.getElementById('User_Charts') as HTMLElement
  UserChart = init(chartEle)
  const option: any = UserOption
  option && UserChart.setOption(option)
}

const MusicCharts = () => {
  const chartEle: HTMLElement = document.getElementById('Music_Charts') as HTMLElement
  MusicChart = init(chartEle)
  const option: any = MusicOption
  option && MusicChart.setOption(option)
}
</script>

<style lang="scss" scoped>
.Home {
  .State_Container {
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(auto-fill, auto);
    gap: 20px;
    justify-items: center;
    align-items: center;
    @media screen and (max-width: 800px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }

    .State_Box {
      width: 100%;
      border-radius: 8px;
      padding: 20px;
      @include background_color('background_color');
      @include font_color('text-color');
      &:hover {
        @include themeify {
          box-shadow: 0 0 30px themed('background_color') !important;
        }
      }
      cursor: pointer;
      .State_Box_Top {
        font-size: 18px;
      }
      .State_Box_Info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        .State_Box_Info_Count {
          font-size: 24px;
          font-weight: bold;
          span {
            font-size: 16px;
          }
        }
      }
    }
  }
  .Charts_Max_Box {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    // display: grid;
    // grid-auto-flow: column;
    // grid-template-columns: repeat(2, 1fr);
    // gap: 20px;
    // justify-items: center;
    // align-items: center;
    // margin-top: 20px;
    @media screen and (max-width: 1000px) {
      flex-direction: column;
      // grid-auto-flow: row;
      // grid-template-columns: repeat(1, 1fr) !important;
      // grid-template-rows: repeat(1, 1fr) !important;
      .User_Charts {
        margin-bottom: 20px;
      }
    }
    .User_Charts {
      margin-right: 20px;
    }
    .User_Charts,
    .Music_Charts {
      width: 100%;
      height: 400px;
      border-radius: 8px;
      padding: 10px;
      @include background_color('background_color');
      @include font_color('text-color');
    }
  }
}
</style>
