
<template>
  <div class="box">
    <div class="top">
      <p>
        <i :class="data.icon"></i>
        <span class="myCar">{{ data.title }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
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
.box {
  width: 100%;
  background-color: white;
  .top {
   
    height: 100px;
    line-height: 120px;
    border-bottom: 2px solid rgba(250, 101, 46, 0.8);
    i {
      color: rgb(250, 99, 44);
      font-size: 40px;
    }
    .myCar {
      font-size: 30px;
      margin: 0 15px;
    }
  }
}
</style>
