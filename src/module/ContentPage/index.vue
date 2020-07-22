<template>
  <div class="content-page">
    <div class="layui-row">
      <!-- 左侧导航 -->
      <side-bar />
      <content-show
        :reloading="reloadings"
        @detailtabcont="detailtabconts"
      />
    </div>
  </div>
</template> 

<script>
// 左边侧边栏的内容组件
import SideBar from "@/module/SideBar";
// 右边的内容组件
import ContentShow from "@/module/ContentShow";
export default {
  components: {
    SideBar,
    ContentShow
  },
  props: ["reloading"],
  data() {
    return {
      reloadings: false
    };
  },
  watch: {
    //监听value的变化，进行相应的操作即可
    reloading: function(a, b) {
      this.reloadings = this.reloading;
    }
  },
  mounted() {
    this.reloadings = this.reloading;
  },
  methods: {
    detailtabconts(data) {
      this.$emit("detailtabcont", data);
    }
    // initreloah(){
    //    this.reloadings = this.reloading
    // }
  }
};
</script>

<style scoped>
</style>
