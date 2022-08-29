
<template>
<div>
   <div class="box">
            <!-- tag标签区域 -->
            <div>
              <el-tag
                v-for="(item, index) in tagList"
                :key="index"
                @click="$router.push(item.path)"
                @close="closeTag(index, item)"
                closable
              >
                {{ item.title }}
              </el-tag>
            </div>
            <!-- 按钮 -->
            <el-popover placement="bottom" width="30" trigger="hover">
              <div class="txt">
                <p @click="closeAll">关闭所有</p>
                <p @click="closeOther">关闭其他</p>
              </div>
              <el-button slot="reference" type="primary"
                >标签选项 <i class="el-icon-arrow-down"></i
              ></el-button>
            </el-popover>
          </div>
</div>
</template>

<script>
export default {
    props:['tagList'],
  name: '',
  components: {},
  data () {
    return {
    }
  },
  created () { },
  mounted () { },
  methods: {
      closeTag(index,item){
          this.$emit('closeTag',{index,item})
      },
      closeAll(){
          this.$emit('closeAll')
      },
      closeOther(){
          this.$emit('closeOther')
      }
  }
}
</script>
<style scoped lang='scss'>
.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .txt {
  width: 100%;
  text-align: center;
  p {
    margin: 10px 0;
    cursor: pointer;
  }
}
}
</style>
