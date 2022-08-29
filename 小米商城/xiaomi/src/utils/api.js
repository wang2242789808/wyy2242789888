import http from './http'

// 首页轮播图
const getImgs=()=>{
    let data=http.post('/api/resources/carousel')
    return data
}


export {getImgs}