import axios from 'axios'

const baseURL1 = 'http://123.207.32.32:8000/api/v2';
const baseURL2 = 'http://106.54.54.237:8000/api/v1'

export function request(config) {
  //创建 axios 实例
  const instance = axios.create({
    baseURL: baseURL1 || baseURL2,
    timeout: 5000
  })

  //请求拦截
  // instance.interceptors.request.use(config => {
  //   return config
  // }, err => {
  //   console.log(err)
  // })

  //响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    return res.err
  })

  return instance(config)
}