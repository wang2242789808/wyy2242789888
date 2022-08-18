
<template>
  <div>
    <el-menu
      :collapse="isCollapse"
      :collapse-transition="false"
      router
      class="el-menu-vertical-demo"
      text-color="#333"
    >
      <el-menu-item
        :index="item.path"
        v-for="(item, i) in tabList"
        :key="i"
        @click="changeTab(i, item)"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ["tabList", "isCollapse"],
  name: "",
  components: {},
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeTab(i, item) {
      this.$emit("changeTab", i, item);
    },
  },
};
</script>
<style scoped lang='scss'>
</style>
