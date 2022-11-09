<template>
  <div class="Login-Container">
    <div class="Login-particles">
      <Particles
        id="tsparticles"
        class="login-partic"
        :particlesInit="particlesInit"
        :particlesLoaded="particlesLoaded"
        :options="Options" />
    </div>
    <div class="Position-Box">
      <div class="Switch">
        <ThemeSwitch></ThemeSwitch>
      </div>
      <Jis-Audio></Jis-Audio>
    </div>

    <div class="Login-Box">
      <div class="Login-Box-Title">{{ UserBoxType ? 'Login to the' : 'Registered' }}</div>
      <div class="Login-Box-Switch" @click="ChangeOption">
        {{ UserBoxType ? '注册' : '登录' }}
      </div>
      <a-form :model="UserForm" name="horizontal_login" layout="vertical">
        <div class="Login-Box-Content" v-if="UserBoxType">
          <a-form-item v-bind="validateInfos.user_name">
            <Jis-Input
              notEmptyColor="#fcfcfd"
              placeholder="UserName"
              v-model="UserForm.user_name"
              @blur="validate('user_name', { trigger: 'blur' }).catch(() => {})">
              <template #Label>
                <lay-icon type="layui-icon-user" color="#195bff"></lay-icon>
              </template>
            </Jis-Input>
          </a-form-item>
          <a-form-item v-bind="validateInfos.password">
            <Jis-Input
              notEmptyColor="#fcfcfd"
              type="password"
              placeholder="Password"
              v-model="UserForm.password"
              @keyup.enter.native="Submit('Login')">
              <template #Label>
                <lay-icon type="layui-icon-face-smile" color="#195bff"></lay-icon>
              </template>
            </Jis-Input>
          </a-form-item>

          <div class="Submit" @click="Submit('Login')">Login</div>
        </div>
        <div class="Login-Box-Content" v-else>
          <a-form-item v-bind="validateInfos.user_name">
            <Jis-Input notEmptyColor="#fcfcfd" placeholder="UserName" v-model="UserForm.user_name">
              <template #Label>
                <lay-icon type="layui-icon-user" color="#195bff"></lay-icon>
              </template>
            </Jis-Input>
          </a-form-item>

          <a-form-item v-bind="validateInfos.password">
            <Jis-Input
              notEmptyColor="#fcfcfd"
              type="password"
              placeholder="Password"
              v-model="UserForm.password"
              @keyup.enter.native="Submit('Register')">
              <template #Label>
                <lay-icon type="layui-icon-face-smile" color="#195bff"></lay-icon>
              </template>
            </Jis-Input>
          </a-form-item>

          <div class="Submit" @click="Submit('Register')">registered</div>
        </div>
      </a-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import JisInput from '@/components/Jis-Input.vue'
import ThemeSwitch from '@/components/ThemeSwitch.vue'
import JisAudio from '@/components/Jis-Audio.vue'
import { ref, reactive, toRefs, computed, watch, onMounted } from 'vue'
import { UserInfo } from '@/Api/User'
import { storeToRefs } from 'pinia'
import useUser from '@/stores/user'
import { loadFull } from 'tsparticles'
import options from '@/utils/particles'
import { Form, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'

const useForm = Form.useForm
let UserBoxType = ref<Boolean>(true)
let Options = ref<any>(options)
let IconRef = ref<any>(null)
const router = useRouter()
const User = useUser()

let UserForm = reactive<any>({
  user_name: '',
  password: '',
})
const rulesRef = reactive({
  password: [
    {
      required: true,
      message: '请输入密码',
    },
    {
      min: 3,
      message: '请输入最少三位数',
      trigger: 'blur',
    },
  ],
  user_name: [
    {
      required: true,
      message: '请输入用户名',
    },
    {
      trigger: 'blur',
    },
  ],
})
const { resetFields, validate, validateInfos } = useForm(UserForm, rulesRef)

const particlesInit = async (engine: any) => {
  await loadFull(engine)
}

const particlesLoaded = async (container: any) => {}

const Submit = (Type: any) => {
  validate()
    .then(() => {
      if (Type == 'Login') {
        User.Login(UserForm).then((res: any) => {
          UserInfo().then((res: any) => {
            User.UserInfo = res.data

            router.push('/index')
          })
        })
      } else {
        User.Register(UserForm)
      }
    })
    .catch(() => {
      message.error('请填写基本信息')
    })
}

const ChangeOption = () => {
  UserBoxType.value = !UserBoxType.value
  for (const key in UserForm) {
    UserForm[key] = ''
  }
}
</script>

<style scoped lang="scss">
::v-deep .ant-switch-checked {
  @include background_color('background_color');
}
@mixin BtnCartoon {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px #a9c2ff;
}
.Login-Container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  .Login-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .Position-Box {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .Login-Box {
    position: relative;
    box-sizing: border-box;
    width: 400px;
    border-radius: 23px;
    background-color: #fff;
    @include background_color('background_color');
    @include themeify {
      box-shadow: 10px 10px 1px themed('background_2color') !important;
    }
    @media screen and (max-width: 600px) {
      width: 80vw;
    }
    .Login-Box-Title {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      top: 0;
      height: 40px;
      width: 100%;
      font-weight: bold;
      border-radius: 23px;
      @include background_color('background_color');
      @include font_color('text-color');

      z-index: 2;
    }

    .Login-Box-Switch {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      position: absolute;
      right: 10px;
      top: -15px;
      width: 70px;
      color: #fff;
      border-radius: 5px 5px 0 0;
      padding: 5px;
      background-color: #195bff;
      cursor: pointer;
      padding-top: 15px;
      transition: all 0.5s;
      animation-duration: 5s;
      animation-name: prompt;
      &:hover {
        transform: translateY(-15px);
        padding-top: 8px;
      }
      @keyframes prompt {
        0% {
          transform: translateY(-5px);
          padding-top: 12px;
        }
        10% {
          transform: translateY(-15px);
          padding-top: 8px;
        }
        20% {
          transform: translateY(-5px);
          padding-top: 12px;
        }
        30% {
          transform: translateY(-15px);
          padding-top: 8px;
        }
        40% {
          transform: translateY(-5px);
          padding-top: 12px;
        }
        50% {
          transform: translateY(-15px);
          padding-top: 8px;
        }
        60% {
          transform: translateY(0px);
        }
      }
    }
    .Login-Box-Content {
      padding: 15px;
      // .Option-Input-Box {
      //   display: flex;
      //   justify-content: space-between;
      //   width: 100%;
      //   height: 35px;
      //   margin-bottom: 20px;
      //   border-radius: 20px;
      //   background-color: #f4f7f8;
      //   .Option-Label {
      //     position: relative;
      //     left: 0;
      //     display: flex;
      //     justify-content: center;
      //     align-items: center;
      //     transition: all 0.2s;
      //     width: 40px;
      //     height: 100%;
      //     box-shadow: 5px 0px 10px #edf0f1;
      //     background-color: #f4f7f8;
      //     border-radius: 10px;
      //   }

      //   .Option-Input {
      //     flex: 1;
      //     width: 100%;
      //     height: 100%;
      //     border: none;
      //     box-sizing: border-box;
      //     background-color: #f4f7f8;
      //     border-radius: 20px;
      //     padding: 0 10px;
      //     font-size: 12px;
      //     letter-spacing: 1px;
      //     &::-webkit-input-placeholder {
      //       color: #a4adb5;
      //     }
      //   }
      // }
      .Submit {
        transition: 0.3s all;
        box-sizing: border-box;
        width: 100%;
        height: 30px;
        color: #fff;
        background-color: #195bff;
        border-radius: 15px;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        letter-spacing: 2px;
        &:hover {
          @include BtnCartoon;
        }
      }
    }
  }
}
</style>
