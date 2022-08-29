
<template>
  <div>
    <div class="box">
      <ul>
        <li>
          <i class="el-icon-document-checked"></i><span>7天无理由退换货</span>
        </li>
        <li>
          <i class="el-icon-document-checked"></i><span>满99元全场免邮</span>
        </li>
        <li>
          <i class="el-icon-document-checked"></i><span>100%品质保证</span>
        </li>
      </ul>
      <p><img src="/1.png" alt="" /></p>
      <p>
        <span class="active">首页</span>&emsp;|&emsp;<span class="active"
          >全部商品</span
        >&emsp;|&emsp;<span class="active">关于我们</span>
      </p>
      <p>商城版权所有 <i class="el-icon-bangzhu"></i> 2012-2021</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.active:hover {
  color: white;
  cursor: pointer;
}
p {
  text-align: center;
  margin: 20px 0;
  color: rgba(255, 255, 255, 0.4);
  font-size: 18px;
}
.box {
  width: 100%;
  height: 360px;
  background-color: #2f2f2f;
  color: white;
  margin-top: 50px;
 
  ul {
    width: 100%;
    height: 150px;
    line-height: 150px;
    display: flex;
    justify-content: space-around;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.055);
    li {
      font-size: 20px;
      i {
        font-size: 30px;
        vertical-align: middle;
      }
      span {
        margin-left: 10px;
      }
    }
  }
}
</style>
