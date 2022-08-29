// 首先引入Mock
const Mock = require('mockjs');

// 设置拦截ajax请求的相应时间
Mock.setup({
    timeout: '200-600'
});

Mock.mock('/api/list',{
    "data":[
        {
            title: "图书管理",
            icon: "el-icon-s-shop",
            path: "/book",
          },
          {
            title: "后台系统",
            icon: "el-icon-s-data",
            path: "/back",
          },
          {
            title: "国际化",
            icon: "el-icon-s-flag",
            path: "/inta",
          },
          {
            title: "基础表格",
            icon: "el-icon-menu",
            path: "/table",
          },
          {
            title: "tab选项卡",
            icon: "el-icon-setting",
            path: "/tab",
          },
    ]
})