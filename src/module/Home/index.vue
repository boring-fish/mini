<template>
  <div id="contentHome">
    <header-bar />
    <div>
      <content-page
        :reloading="reloading"
        @detailtabcont="tabconts"
      />
    </div>
    <detail
      v-if="detailstatus"
      :detailtabconts="tabcont"
      @close="close"
    />
    <status
      v-if="status"
      :detailtabconts="tabcont"
      @statusclose="statusclose"
      @reloading="reloadingHandle"
    />
  </div>
</template>

<script>
import ContentPage from "@/module/ContentPage";
import HeaderBar from "@/components/HeaderBar";
import detail from "@/components/detail";
import status from "@/components/status";
export default {
  components: {
    ContentPage,
    HeaderBar,
    detail,
    status
  },
  data() {
    return {
      tabcont: [],
      detailstatus: false,
      status: false,
      reloading: {}
    };
  },
  methods: {
    tabconts(data) {
      if (data.status) {
        this.tabcont = data;
        this.status = true;
      } else {
        this.tabcont = data;
        this.detailstatus = true;
      }
    },
    close(data) {
      this.detailstatus = data;
    },
    reloadingHandle(data) {
      this.reloading = data.data;
      this.status = data.statusclose;
    },
    statusclose(data) {
      this.status = data;
    }
  }
};
</script>

<style scoped>
.layui-body {
  top: 60px;
  bottom: 44px;
}
</style>
