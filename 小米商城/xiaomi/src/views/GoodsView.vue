<template>
  <div class="content-box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>全部商品</el-breadcrumb-item>
      <el-breadcrumb-item>分类</el-breadcrumb-item>
    </el-breadcrumb>
    <ul class="tab-box">
      <li class="cate">分类</li>
      <li>
        <span @click="changwGoods('all', -1)" :class="{ active: active == -1 }"
          >全部</span
        >
      </li>
      <li
        v-for="(item, index) in allGoods"
        :key="index"
        :class="{ active: active == index }"
      >
        <span @click="changwGoods(item.category_name, index)">{{
          item.category_name
        }}</span>
      </li>
    </ul>

    <div class="box">
      <div class="bottom-box">
        <el-card v-for="(item, i) in allGood" :key="i">
          <img
            :src="item.product_picture"
            alt=""
            @click="
              $router.push({ name: 'detail', params: { id: item.product_id } })
            "
          />
          <p class="name">{{ item.product_name }}</p>
          <p class="title">{{ item.product_title }}</p>
          <p>
            <span class="price">{{ item.product_selling_price }}元</span
            ><del class="del">{{ item.product_price }}元</del>
          </p>
        </el-card>
      </div>
      <div class="page" v-if="active == -1">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  components: {},
  data() {
    return {
      active: -1,
      allGoods: [],
      allGoodsList: [],
      cateList: [],
      currentPage: 1,
      pageSize: 15,
      total: 0,
    };
  },
  computed: {
    allGood() {
      return this.allGoodsList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
  },
  created() {
    this.getAllProduct();
    this.getAllGoods();
    this.changwGoods("all", -1);
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(val) {
        console.log(val);
        if (val.query.search != undefined) {
          axios
            .post("product/getProductBySearch", {
              currentPage: 1,
              pageSize: 15,
              search: val.query.search,
            })
            .then((res) => {
              console.log(res);
              this.allGoodsList = res.data.Product;
              this.total = res.data.total;
            });
        }
      },
    },
  },
  mounted() {},
  methods: {
    // 获取分类名
    getAllGoods() {
      axios.post("product/getCategory").then((res) => {
        // console.log(res);
        this.allGoods = res.data.category;
      });
    },
    changwGoods(val, index) {
      // console.log(val, index);
      this.active = index;
      if (index == -1) {
        this.getAllProduct();
      } else {
        axios
          .post("product/getPromoProduct", {
            categoryName: val,
          })
          .then((res) => {
            this.allGoodsList = res.data.Product;
          });
      }
    },
    getAllProduct() {
      if (this.$route.query.search == undefined) {
        // 获取全部分类数据
        axios
          .post("product/getAllProduct", {
            currentPage: this.currentPage,
            pageSize: this.pageSize,
          })
          .then((res) => {
            // console.log(res);
            this.allGoodsList = res.data.Product;
            this.total = res.data.total;
          });
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getAllProduct();
    },
  },
};
</script>
<style scoped lang="scss">
.el-breadcrumb {
  width: 80%;
  margin: 2% 0 2% 10%;
  font-size: 18px;
}
.el-card:hover {
  box-shadow: 0 16px 32px 0 rgba(34, 37, 43, 0.375);
  transform: translate(0, -5px);
  transition-delay: 0s !important;
}
.active {
  color: #3f8ef7;
  cursor: pointer;
}
.cate {
  font-weight: 600;
}
.page {
  text-align: center;
  margin: 10px 0;
}
.el-card {
  text-align: center;

  .title {
    color: rgba(128, 128, 128, 0.756);
    margin: 22px 0;
  }
  .name,
  .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .price {
    color: #ff6700;
    margin-right: 10px;
  }
  .del {
    color: gray;
  }
}
.box {
  width: 100% !important;
  background-color: #f5f5f5;
}
.bottom-box {
  width: 90%;
  margin-left: 5%;
  min-height: 650px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .el-card {
    width: 22%;
    height: 385px;
    margin: 10px 10px 0 0;
    img {
      text-align: center;
    }
  }
}
.tab-box {
  width: 80%;
  margin: 1% 0 1% 10%;
  display: flex;
  justify-content: flex-start;
  li {
    width: 80px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-top: 1px solid #ddd;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    font-size: 17px;
  }
  li:hover {
    color: #3f8ef7;
    cursor: pointer;
  }
}
</style>
