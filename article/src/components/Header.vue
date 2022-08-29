
<template>
  <div>
    <p>
      <i class="el-icon-s-fold"></i>
      <span
        v-for="(item, index) in tabList"
        :key="index"
        v-show="item.path == $route.path"
        >{{ item.title }}</span
      >
    </p>
  </div>
</template>

<script>
export default {
  props: ["tabList"],
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
p {
  i {
    font-size: 30px;
    vertical-align: middle;
  }
  span {
    color: gray;
    margin-left: 10px;
  }
}
</style>
