//导入axios
import axios from 'axios'
// 配置请求的基准URL地址
const http=axios.create({
    baseURL:'http://vue.mengxuegu.com/pro-api',
    timeout:3000,
})
// axios设置请求拦截器,设置响应头token
http.interceptors.request.use(
  config => {
    config.headers.token = window.sessionStorage.getItem('token') //每次发送请求之前自动将在session中的token提取出来当做响应头header
    return config
  },
  err => {
    console.log(err)
  }
)
//axios设置响应拦截器
http.interceptors.response.use(response => {
  return  response.data //拦截处理响应结果，直接返回需要的数据
}, err => {
  console.log(err)
})
export default http
// //把axios注册到Vue
// Vue.prototype.$http = axios
// //关闭vue在console中的默认提示
// Vue.config.productionTip = false