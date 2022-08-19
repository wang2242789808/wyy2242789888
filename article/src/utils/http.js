//导入axios
import axios from 'axios'

const http=axios.create({
    baseURL:"https://api.imooc-admin.lgdsunday.club/api"
})
http.interceptors.request.use(
  config => {
    config.headers.Authorization=window.sessionStorage.getItem('token')
    return config
  },
  err => {
    console.log(err)
  }
)

http.interceptors.response.use(response => {
  return  response.data 
}, err => {
  console.log(err)
})
export default http