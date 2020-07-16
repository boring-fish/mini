<template>
  <div id="detailData">
    <div class="notify-main notify-alert">
      <h2 class="title">自定义</h2>
      <div class="notify-content">
        <ul>
          <li
            class="titleLi"
            v-for="(item, key, index) in detailobjs"
            :key="index"
            :title="item"
          >
            <span class="title">{{ key }}:</span>
            <span class="titleContent">{{ item }}</span>
          </li>
        </ul>
        <div class="notify-btns">
          <button
            data-v-56ca3248
            type="button"
            name="button1"
            class="notify-btn notify-btn-primary notify-btn-small"
            @click="downloading"
          >
            下载
          </button>
          <!-- <div  id="download"></div> -->
          <button
            data-v-56ca3248
            type="button"
            name="button2"
            class="notify-btn notify-btn-default notify-btn-small"
            style="margin-left: 10px;"
            @click="cancel"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  props: ["detailtabconts"],
  name: "detail",
  data() {
    return {
      detailobjs: [],
      headTh: [
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
      ]
    };
  },
  watch: {
    //监听value的变化，进行相应的操作即可
    // detailtabconts: function(a, b) {
    //     console.log(a,b)
    //     console.log('/////')
    // //   this.inittableContent();
    // }
  },
  mounted() {
    this.initdetail();
  },
  methods: {
    initdetail() {
      let newDatas = {};
      if (!this.detailtabconts.tabcont.imgUrl) {
        $('button[name="button1"]').addClass("xz");
      }
      let objs = Object.keys(this.detailtabconts.tabcont).reduce(
        (newData, key, init) => {
          for (var i = 0; i < this.headTh.length; i++) {
            if (key == this.headTh[i].oldname) {
              let newKey = this.headTh[i].name;
              newDatas[newKey] = this.detailtabconts.tabcont[key];
            }
          }
          newData = newDatas;
          return newData;
        },
        {}
      );
      this.detailobjs = objs;
      this.removePropertyOfNull(this.detailobjs);
    },
    //删除空属性
    removePropertyOfNull(obj) {
      Object.keys(obj).forEach(item => {
        if (item == "是否为MINI车主" && obj[item] == 0) {
          obj[item] = "否";
        }
         if (item == "是否为MINI车主" && obj[item] == 1) {
          obj[item] = "是";
        }
        //   if (item=='图片地址' && obj[item]==null || item=='备注' && obj[item]==null) {
        //       delete obj[item];
        //     }
        //  if (item=='地区' && obj[item]==null || item=='城市' && obj[item]==null || item=='经销商' && obj[item]==null){
        //      delete obj[item];
        //   }
      });
      return obj;
    },
    //下载图片
    downloading() {
      if (this.detailtabconts.tabcont.imgUrl.indexOf(",") != -1) {
        let imgarr = this.detailtabconts.tabcont.imgUrl.split(",");
        imgarr.forEach(item => {
          this.downloadImg(item);
        });
      } else {
        let imgstr = this.detailtabconts.tabcont.imgUrl;
        this.downloadImg(imgstr);
      }
    },
    downloadImg(item) {
      let hrefip = "";
      if (window.location.hostname === "mini.leadswarp.com") {
        hrefip =
          "https://bmwmini-media-1300926966.cos.ap-guangzhou.myqcloud.com/upload/";
      } else {
        hrefip =
          "https://media-1302382638.cos.ap-guangzhou.myqcloud.com/upload/";
      }
      const href = hrefip + item;
      this.downVideo(href, item);
    },
    downVideo(url, name) {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob"; // 返回类型blob
      xhr.onload = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          let blob = this.response;
          // 转换一个blob链接
          let u = window.URL.createObjectURL(new Blob([blob]));
          let a = document.createElement("a");
          a.download = name;
          a.href = u;
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      };
      xhr.send();
    },
    cancel() {
      this.$emit("close", false);
    }
  }
};
</script>

<style scoped>
@import "../assets/css/style.css";
.xz {
  display: none;
}
</style>
