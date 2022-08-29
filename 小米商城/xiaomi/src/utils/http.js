import axios from 'axios'
// import { Message } from 'element-ui' //在js文件中，需单独引入提示

//axios常用封装有哪些？
const http=axios.create({
    // baseURL:'/api', //根路径
    baseURL:'http://101.132.181.9/api',
    timeout:5000, //超时时间
})

//请求拦截器-接口请求的前置拦截，主要放一些请求头协议
http.interceptors.request.use(config=>{
    //放请求头协议
    let token=localStorage.getItem('token')
    if(token){
        config.headers.Authorization=token
    }
   
    return config

    },error=>{
        //用pormise把失败的结果导出去，
         Promise.reject(error)
    }
)


//响应拦截器-接口的响应结果，主要放一些常见错误代码处理
http.interceptors.response.use(res=>{
   
    return res
    },error=>{
         //用pormise把失败的结果导出去，
         Promise.reject(error)
    }
)

export default http