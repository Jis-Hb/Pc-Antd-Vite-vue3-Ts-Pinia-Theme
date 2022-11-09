import { axios } from '@/server/axiox'

//登录
export const Login = (data: any) => {
  return axios({
    url: '/users/login',
    method: 'post',
    data
  })
}

// 注册
export const Register = (data: any) => {
  return axios({
    url: '/users/register',
    method: 'post',
    data
  })
}

export const UserInfo = () => {
  return axios({
    url: '/users/GetUserInfo',
    method: 'get'
  })
}
