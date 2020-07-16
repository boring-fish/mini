<template>
  <div class="contentShow layui-body">
    <nav-list-bar></nav-list-bar>
    <content-data @detailtabcont="detailtabconts" :reloading="reloadings"></content-data>
  </div>
</template>

<script>
import NavListBar from "@/module/NavListBar/";
import ContentData from "@/module/Contents/";
export default {
  props: ["reloading"],
  data() {
    return {
      reloadings: false
    };
  },
  components: {
    NavListBar,
    ContentData
  },
  mounted() {
    this.reloadings = this.reloading;
  },
  watch: {
    //监听value的变化，进行相应的操作即可
    reloading: function(a, b) {
      this.reloadings = this.reloading;
    }
  },
  methods: {
    detailtabconts(data) {
      this.$emit("detailtabcont", data);
    }
  }
};
</script>

<style>
.layui-body {
  top: 60px;
}
</style>
