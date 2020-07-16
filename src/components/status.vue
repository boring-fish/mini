<template>
  <div id="detailData">
    <div class="notify-main notify-alert">
      <h2 class="title">自定义</h2>
      <div class="notify-content-status">
        <div class="layui-form-item">
          <label class="layui-form-label">订单状态</label>
          <div class="layui-input-block">
            <span id="orderstatus" style="display: none"></span>
            <!-- <input type="radio" name="state" id="state1" @click="initstatus('1')" title="报名成功" value="1">报名成功 -->
            <input
              type="radio"
              name="state"
              id="state0"
              @click="initstatus('0')"
              title="取消报名"
              value="0"
            />
            取消报名
            <input
              type="radio"
              name="state"
              id="state1"
              @click="initstatus('2')"
              title="已中奖"
              value="2"
            />已中奖
            <input
              type="radio"
              name="state"
              id="state2"
              @click="initstatus('3')"
              title="未中奖"
              value="3"
            />未中奖
              <input
              type="radio"
              name="state"
              id="state3"
              @click="initstatus('7')"
              title="已过期"
              value="7"
            />已过期
          </div>
        </div>
        <div class="layui-form-item" v-if="prizeType">
          <label class="layui-form-label">中奖类别</label>
          <div class="layui-input-block">
            <span id="orderstatus" style="display: none"></span>
            <input type="radio" name="prize" title="一等奖" value="4" /> 一等奖&emsp;
            <input type="radio" name="prize" title="二等奖" value="5" />二等奖
            <input type="radio" name="prize" title="三等奖" value="6" />三等奖
          </div>
        </div>
        <div class="notify-btns">
          <button
            data-v-56ca3248
            type="button"
            name="button"
            class="notify-btn notify-btn-primary notify-btn-small"
            @click="sure"
          >
            确定
          </button>
          <button
            data-v-56ca3248
            type="button"
            name="button"
            class="notify-btn notify-btn-default notify-btn-small"
            style="margin-left: 10px;"
            @click="cancel"
          >
            取消
          </button>
          <a id="downloads"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  props: ["detailtabconts"],
  name: "status",
  data() {
    return {
      detailobjs: {},
      checkedid: "",
      checkedids: "",
      prizeType: false
    };
  },
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var sta = this.detailtabconts.tabcont.status;
      var radio = document.getElementsByName("state");
      var radioLength = radio.length;
      for (var i = 0; i < radioLength; i++) {
        if (sta == radio[i].value) {
          let a = radio[i].value;
          $(radio[i]).click();
        }
      }
    },
    initstatus(value) {
      if (value == "0") {
        $('input[name="state"]')
          .eq(0)
          .attr("checked", true);
        this.checkedid = 0;
        this.checkedids = 0;
        this.prizeType = false;
      }
      if (value == "2") {
        $('input[name="state"]')
          .eq(1)
          .attr("checked", true);
        this.checkedid = 2;
        this.checkedids = 1;
        this.prizeType = true;
      }
      if (value == "3") {
        $('input[name="state"]')
          .eq(2)
          .attr("checked", true);
        this.checkedid = 3;
        this.checkedids = 2;
        this.prizeType = false;
      }
        if (value == "7") {
        $('input[name="state"]')
          .eq(3)
          .attr("checked", true);
        this.checkedid = 7;
        this.checkedids = 3;
        this.prizeType = false;
      }
    },
    sure() {
      console.log($('input[name="prize"]:checked ').val());
      if(this.prizeType){
        this.checkedid=$('input[name="prize"]:checked ').val();
      }
      let that = this;
      let token = this.$cookies.get("token");
      if (
        $('input[name="state"]')
          .eq(this.checkedids)
          .attr("checked") == "checked"
      ) {
        this.axios
          .put(
            "/release/unsubscribe?" +
              "id=" +
              this.detailtabconts.tabcont.id +
              "&" +
              "status=" +
              this.checkedid
          )
          .then(function(res) {
            let params = {
              reloading: res,
              statusclose: false
            };
            that.$emit("reloading", res);
          })
          .catch(function(error) {
            if (error.response.status == "401") {
            that.$cookies.remove("token");
            that.$router.push("/Login");
          }
          });
      }
    },
    cancel() {
      this.$emit("statusclose", false);
    }
  }
};
</script>

<style scoped>
@import "../assets/css/style.css";
</style>
