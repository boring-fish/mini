<template>
  <div
    id="content"
    class="layui_body"
  >
    <router-view
      :reloading="reloadings"
      @detailtabcont="detailtabconts"
    />
  </div>
</template>

<script>
export default {
  name: "Contents",
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
  }
};
</script>

<style scoped>
#content {
  position: absolute;
  top: 48px;
  width: 100%;
}
</style>