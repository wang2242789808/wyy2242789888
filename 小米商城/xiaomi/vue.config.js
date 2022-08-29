
module.exports = {
  devServer:{
    proxy:{
        '':{//匹配所有以'/api'开头的请求路径
            target:'http://101.132.181.9/api',//代理目标的基础路径
            changeOrigin:true, //设置changeOrigin的值为true可以代理反向的地址
            pathRewrite:{'':''}  //重写路径，将api开头的路径改为''
        }
    }
}
}


