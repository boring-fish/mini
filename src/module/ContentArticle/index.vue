<template>
  <div id="article">
    <!-- <status-btn @querydata='querydataFn($event)'></status-btn> -->
    <div id="statusBtn">
      <blockquote class="layui-elem-quote news_search">
        <form class="layui-form">
          <div class="layui-form-item">
            <label class="layui-form-label">活动名称</label>
            <div class="layui-input-block">
              <select name="activeName">
                <option value>
                  全部活动
                </option>
                <option
                  v-for="(item, index) in selectList.activeName"
                  :key="index"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">产品名称</label>
            <div class="layui-input-block">
              <select name="productName">
                <option value>
                  全部产品
                </option>
                <option
                  v-for="(item, index) in selectList.productName"
                  :key="index"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">活动时间</label>
            <div class="layui-input-block">
              <select name="time">
                <option value>
                  全部时间
                </option>
                <option
                  v-for="(item, index) in selectList.time"
                  :key="index"
                  :value="item"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>

          <div class="layui-form-item">
            <label class="layui-form-label">订单状态</label>
            <div class="layui-input-block">
              <select name="status">
                <option value>
                  全部订单状态
                </option>
                <option
                  v-for="(item, index) in statusList"
                  :key="index"
                  :value="item.value"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- <div class="layui-form-item">
          <label class="layui-form-label">时间区域</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="starttime"
              placeholder="请输入"
              class="layui-input inputline"
              id="starttime"
            />
            <span>——</span>
            <input
              type="text"
              name="endtime"
              placeholder="请输入"
              autocomplete="off"
              class="layui-input inputline"
              id="endtime"
            />
          </div>
          </div>-->
          <div class="layui-form-item">
            <div class="layui-input-block">
              <input
                type="button"
                class="layui-btn"
                value="查询"
                @click="query()"
              >
            </div>
          </div>
        </form>
        <!-- <div class="layui-inline">
        <a class="layui-btn layui-btn-normal newsAdd_btn">添加文章</a>
        </div>-->
      </blockquote>
    </div>
    <div class="layui-form news_list">
      <table-data
        :btn-ststus="status"
        :reloading="reloadings"
        @detailtabcont="detailtabconts"
      />
    </div>
  </div>
</template>
<script
  type="text/javascript"
  src="../../../static/layui/laydate/laydate.js"
></script>

<script>
import $ from "jquery";
// 头部按钮
import StatusBtn from "@/components/StatusBtn";
// 列表数据
import TableData from "@/components/TableData";
export default {
  props: ["reloading"],
  data() {
    return {
      status: {
        time: "",
        activeName: "",
        status: "",
        productName: ""
      },
      // laydate: window.laydate,
      selectList: [],
      statusList: [
        { value: 0, name: "取消报名" },
        { value: 1, name: "报名成功" },
        // { value: 2, name: "已中奖" },
        { value: 3, name: "未中奖" },
        { value: 4, name: "一等奖" },
        { value: 5, name: "二等奖" },
        { value: 6, name: "三等奖" },
        { value: 7, name: "已过期" }
      ],
      reloadings: false
    };
  },

  watch: {
    //监听value的变化，进行相应的操作即可
    reloading: function(a, b) {
      this.reloadings = this.reloading;
    }
  },

  components: {
    StatusBtn,
    TableData
  },
  mounted() {
    this.reloadings = this.reloading;
    this.initselect();
  },
  methods: {
    initselect() {
      let that = this;
      let token = that.$cookies.get("token");
      this.axios
        .get("/release/filterList")
        .then(function(res) {
          that.selectList = res.data;
        })
        .catch(function(error) {
          if (error.response.status == "401") {
            that.$cookies.remove("token");
            that.$router.push("/Login");
          }
        });
    },
    query() {
      this.status = {
        time: $("select[name='time']").val(),
        activeName: $("select[name='activeName']").val(),
        status: $("select[name='status']").val(),
        productName: $("select[name='productName']").val()
      };
    },
    detailtabconts(data) {
      this.$emit("detailtabcont", data);
    }
  }
};
</script>

<style scoped>
.layui-form-item {
  width: 33%;
}
.layui-input {
  display: block;
  width: 80%;
  padding-left: 10px;
}
.inputline {
  display: inline-block;
}
.layui-form {
  display: flex;
  flex-wrap: wrap;
}
.layui-input-block select {
  display: block !important;
}
</style>
