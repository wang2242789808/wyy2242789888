
<template>
  <div>
    <el-card v-for="item in allGoodsList">
      <img src="" alt="" />
      <p class="name">444</p>
      <p class="title">77</p>
      <p><span class="price">77元</span><del class="del">88元</del></p>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ["allGoodsList"],
  name: "",
  components: {},
  data() {
    return {
      data: this.allGoodsList,
    };
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped lang='scss'>
.el-card {
  text-align: center;
  width: 20%;
  img {
    height: 220px;
    width: 200px;
  }
  .title {
    color: rgba(128, 128, 128, 0.756);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 22px 0;
  }
  .price {
    color: #ff6700;
    margin-right: 10px;
  }
  .del {
    color: gray;
  }
}
</style>
