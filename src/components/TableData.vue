<template>
  <div id="tableData">
    <div :class="$options.name">
      <button
        class="layui-btn layui-btn-mini"
        @click="exportExcel"
      >
        导出表格
      </button>
    </div>
    <!-- <div style="overflow-x: auto; overflow-y: auto; height: 900px; width:200px;">

    </div>-->
    <table class="layui-table">
      <colgroup>
        <!-- <col width="8%">
        <col>
        <col width="8%">
        <col width="8%">
        <col width="8%">
        <col width="8%">
        <col width="8%">
        <col width="8%">
        <col width="8%">
        <col width="8%">
         <col width="8%">
        <col width="200">-->
      </colgroup>
      <thead>
        <tr>
          <!-- <th>
            <div @click="allChecked(AllcheckClick.flag)" v-show="AllcheckClick.flag" class="layui-unselect layui-form-checkbox layui-form-checked" lay-skin="primary"><i class="layui-icon"></i></div>
            <div @click="allChecked(AllcheckClick.flag)" v-show="!AllcheckClick.flag" class="layui-unselect layui-form-checkbox" lay-skin="primary"><i class="layui-icon"></i></div>
          </th>-->
          <th
            v-for="(table, index) in tableData.headTh"
            :key="index"
            style="text-align:center;"
          >
            {{ table }}
          </th>
        </tr>
      </thead>
    </table>
    <table class="layui-table layui-tables">
      <tbody class="news_content">
        <tr
          v-for="(tabcont, indexs) in moreDel"
          :key="indexs"
        >
          <!-- <td>
            <div @click="CheckClick(indexs)" v-show="tabcont.checked" class="layui-unselect layui-form-checkbox layui-form-checked" lay-skin="primary"><i class="layui-icon"></i></div>
            <div @click="CheckClick(indexs)" v-show="!tabcont.checked" class="layui-unselect layui-form-checkbox" lay-skin="primary"><i class="layui-icon"></i></div>
          </td>-->
          <td class="tdlength">
            {{ tabcont.id }}
          </td>
          <td class="tdlength">
            {{ tabcont.name }}
          </td>
          <td class="tdlength">
            {{ tabcont.tel }}
          </td>
          <td class="tdlength">
            {{ tabcont.activeName }}
          </td>
          <td class="tdlength">
            {{ tabcont.productName }}
          </td>
          <td class="tdlength">
            {{ tabcont.time }}
          </td>
          <!-- <td>{{tabcont.terminal}}</td> -->
          <td class="tdlength">
            {{ tabcont.region }}
          </td>
          <td class="tdlength">
            {{ tabcont.city }}
          </td>
          <td class="tdlength">
            {{ tabcont.distributor }}
          </td>
          <td class="tdlength">
            <a class="news_collect">
              <!-- <i class="layui-icon"></i>
              <i class="iconfont icon-star"></i>-->
              <!-- <span v-show="tabcont.status == 0">取消报名</span>
              <span v-show="tabcont.status == 1">报名成功</span>
              <span v-show="tabcont.status == 2">已中奖</span>
              <span v-show="tabcont.status == 3">未中奖</span> -->
              <span>{{
                tabcont.status >= 3
                  ? tabcont.status > 5
                    ? tabcont.status == 6
                      ? "三等奖"
                      : "已过期"
                    : tabcont.status == 5
                      ? "二等奖"
                      : tabcont.status == 4
                        ? "一等奖"
                        : "未中奖"
                  : tabcont.status > 1
                    ? "已中奖"
                    : tabcont.status == 1
                      ? "报名成功"
                      : "取消报名"
              }}</span>
            </a>
          </td>
          <td class="btn tdlength">
            <!-- <a class="layui-btn layui-btn-normal layui-btn-mini news_collect">
              <span v-show="tabcont.status==2" @click="isCollection(tabcont)">已中奖</span>
              <span v-show="tabcont.status!=2" @click="isCollection(tabcont)">未中奖</span>
            </a>-->
            <a class="layui-btn layui-btn-normal layui-btn-mini news_collect">
              <span @click="isShow(tabcont)">修改订单状态</span>
            </a>
            <a class="layui-btn layui-btn-normal layui-btn-mini news_collect">
              <span @click="detail(tabcont)">详情</span>
              <!-- <span v-show="tabcont.status==0" @click="isShow(tabcont)">报名失败</span> -->
            </a>
            <!-- <a class="layui-btn layui-btn-danger layui-btn-mini news_del" data-id="1">
              <span @click="deleteData(indexs)">
                <i class="layui-icon"></i> 删除
              </span>
            </a>-->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  components: {
    //  detail
  },
  props: ["btnStstus", "reloading"],
  data() {
    return {
      tableData: {
        headTh: [
          "id",
          "用户名",
          "手机号码",
          "活动名称",
          "产品名称",
          "活动时间",
          // "目的地",
          "地区",
          "城市",
          "经销商",
          "报名状态",
          "操作"
        ],
        tableContent: []
      },
      loading: false
    };
  },
  computed: {
    //计算是否全部的属性；
    AllcheckClick() {
      var array = this.tableData.tableContent;
      // 根据元素checked的值判返回的数据值。
      for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (element.checked === false) {
          return {
            flag: false
          };
        }
      }
      // 当数据为空的时候返回false；
      if (this.tableData.tableContent.length === 0) {
        return false;
      }
      // 若是没有false则全为true，返回true。
      return {
        flag: true
      };
    },
    // 批量删除数据；只要是选中的状态就删除，
    moreDel() {
      var array = this.tableData.tableContent;
      // alert(array.length)
      var arr = [];
      if (this.btnStstus.del === true) {
        for (let i = 0; i < array.length; i++) {
          const element = array[i];
          if (element.checked !== true) {
            arr.push(element);
          }
        }
        this.btnStstus.del = false;
      } else {
        arr = array;
      }
      // 数据同步。
      this.tableData.tableContent = arr;
      return arr;
    }
  },
  watch: {
    //监听value的变化，进行相应的操作即可
    btnStstus: function(a, b) {
      this.inittableContent();
    },
    reloading: function(a, b) {
      if (a) {
        this.inittableContent();
      }
    }
  },
  mounted() {
    this.inittableContent();
  },
  methods: {
    inittableContent() {
      let that = this;
      let token = that.$cookies.get("token");
      let params = {
        page: 0,
        size: 10000,
        time: this.btnStstus.time,
        activeName: this.btnStstus.activeName,
        status: this.btnStstus.status,
        productName: this.btnStstus.productName
      };
      $api.DashboardApi.getTableList(params)
        .then(res => {
          that.tableData.tableContent = res;
          that.tableData.tableContent.sort(function(a, b) {
            return (
              Date.parse(b.registTime.replace(/-/g, "/")) -
              Date.parse(a.registTime.replace(/-/g, "/"))
            );
          });
        })
        .catch(error => {
          if (error.status == "401") {
            that.$cookies.remove("token");
            that.$router.push("/Login");
          }
        });
      // this.axios
      //   .get(
      //     "/release/list?page=0&size=1000" +
      //       "&" +
      //       "time=" +
      //       this.btnStstus.time +
      //       "&" +
      //       "activeName=" +
      //       this.btnStstus.activeName +
      //       "&" +
      //       "status=" +
      //       this.btnStstus.status +
      //       "&" +
      //       "productName=" +
      //       this.btnStstus.productName
      //   )
      //   .then(function(res) {
      //     that.tableData.tableContent = res.data;
      //     that.tableData.tableContent.sort(function(a, b) {
      //       return (
      //         Date.parse(b.registTime.replace(/-/g, "/")) -
      //         Date.parse(a.registTime.replace(/-/g, "/"))
      //       );
      //     });
      //   })
      //   .catch(function(error) {
      //      if (error.response.status == "401") {
      //       that.$cookies.remove("token");
      //       that.$router.push("/Login");
      //     }
      //   });
    },
    exportExcel() {
      let sourceOriginAmount = this.tableData.tableContent; // 需要导出的数据，可以动态获取
      this.loading = true; // 设置一个loading，生成Excel需要时间
      import("@/vendor/Export2Excel.js").then(excel => {
        // 导入js模块
        let headTitle = [
          { oldname: "id", name: "序号" },
          { oldname: "name", name: "用户名" },
          { oldname: "tel", name: "手机号码" },
          { oldname: "terminal", name: "目的地" },
          { oldname: "activeName", name: "活动名称" },
          { oldname: "productName", name: "产品名称" },
          { oldname: "time", name: "活动时间" },
          { oldname: "region", name: "地区" },
          { oldname: "city", name: "城市" },
          { oldname: "distributor", name: "经销商" },
          { oldname: "weibo", name: "微博" },
          { oldname: "douyin", name: "抖音" },
          { oldname: "redBook", name: "小红书" },
          { oldname: "registTime", name: "报名时间" },
          { oldname: "status", name: "报名状态" },
          { oldname: "friendName", name: "朋友姓名" },
          { oldname: "openid", name: "openid" },
          { oldname: "imgUrl", name: "图片地址" },
          { oldname: "recipient", name: "收件人" },
          { oldname: "address", name: "详细地址" },
          { oldname: "isMiniCarOwner", name: "是否为MINI车主" },
          { oldname: "wechatAccount", name: "微信账号" },
          { oldname: "carType", name: "车型" },
          { oldname: "carSeries", name: "车系" },
          { oldname: "score", name: "答题分数" },
          { oldname: "participants", name: "参与人数" },
          { oldname: "age", name: "年龄" },
          { oldname: "punchTime", name: "打卡次数" },
          { oldname: "remark", name: "备注" }
        ];
        let tHeader = [];
        // 导出excel 的标题
        let filterVal = [];
        headTitle.forEach(function(item, index) {
          tHeader.push(item.name);
          filterVal.push(item.oldname);
        });
        console.log(tHeader, filterVal);
        // 每个标题对应的字段
        const list = (sourceOriginAmount || []).map((item, key) => {
          // 通过 map 方法遍历，组装数据成上面的格式
          let tableDataList = {
            id: item.id,
            openid: item.openid,
            name: item.name,
            tel: item.tel,
            terminal: item.terminal,
            productName: item.productName,
            activeName: item.activeName,
            time: item.time,
            region: item.region,
            city: item.city,
            // status:
            //   item.status >= 2
            //     ? item.status == 2
            //       ? "已中奖"
            //       : "未中奖"
            //     : item.status == 0
            //     ? "取消报名"
            //     : "报名成功",
            status:
              item.status >= 3
                ? item.status > 5
                  ? item.status == 6
                    ? "三等奖"
                    : "已过期"
                  : item.status == 5
                  ? "二等奖"
                  : item.status == 4
                  ? "一等奖"
                  : "未中奖"
                : item.status > 1
                ? "已中奖"
                : item.status == 1
                ? "报名成功"
                : "取消报名",
            distributor: item.distributor,
            friendName: item.friendName,
            weibo: item.weibo,
            redBook: item.redBook,
            douyin: item.douyin,
            registTime: item.registTime,
            imgUrl: item.imgUrl,
            remark: item.remark,
            recipient: item.recipient,
            address: item.address,
            isMiniCarOwner: item.isMiniCarOwner == 1 ? "是" : "否",
            wechatAccount: item.wechatAccount,
            carType: item.carType,
            score: item.score,
            age: item.age,
            participants: item.participants,
            punchTime: item.punchTime
          };
          return tableDataList;
        });

        if (list) {
          const data = this.formatJson(filterVal, list); // 生成json数据
          excel.export_json_to_excel({
            // 调用excel方法生成表格
            header: tHeader,
            data,
            filename: "用户信息列表"
          });
        } else {
          alert("暂无无数据");
        }
        this.loading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    // 是否的按钮
    isShow(tabcont) {
      let params = {
        tabcont: tabcont,
        status: true
      };
      this.$emit("detailtabcont", params);
      // let that = this;
      // this.$layer.confirm(
      //   "您确定更改吗？",
      //   {
      //     btn: ["确定", "取消"] // 按钮
      //   },
      //   function(index, layero) {
      //     let statuscs = tabcont.status == 0 ? 1 : 0;
      //     that.axios
      //       .put(
      //         "/api/release/unsubscribe?" +
      //           "id=" +
      //           tabcont.id +
      //           "&" +
      //           "status=" +
      //           statuscs
      //       )
      //       .then(function(res) {
      //         tabcont.status = res.status;
      //         that.inittableContent();
      //       })
      //       .catch(function(error) {
      //         // console.log(error);
      //       });
      //     that.$layer.close(index);
      //   },
      //   function(index, layero) {
      //     that.$layer.close(index);
      //   }
      // );
    },
    detail(tabcont) {
      let params = {
        tabcont: tabcont,
        detailstatus: true
      };
      this.$emit("detailtabcont", params);
    }
  }
};
</script>

<style scoped>
@import "../assets/css/style.css";
.layui-table {
  display: block;
  max-height: calc(100vh - 365px);
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  text-align: center;
  /* margin-top:-10px; */
}
.layui-tables {
  display: block;
  max-height: calc(100vh - 315px);
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  /* text-align: center; */
  margin-top: -10px;
}
table thead,
tbody tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

table thead {
  background: #e4e8f3;
  color: black;
}
table thead tr th:last-child {
  width: 200px;
}
table tbody tr td:last-child {
  width: 200px;
}
table td:hover {
  overflow: auto;
  text-overflow: clip;
}
.tdlength {
  overflow: hidden;
  white-space: nowrap;
}
</style>
