<template>
  <div id="article">
    <status-btn @delInfo="delFn" />
    <div class="layui-form news_list">
      <table-data :btn-ststus="status" />
    </div>
  </div>
</template>
<script>
  // 头部按钮
  import StatusBtn from '@/components/StatusBtn';
  // 列表数据
  import TableData from '@/components/TableData';
  export default {
    components: {
      StatusBtn,
      TableData
    },
    data(){
      return {
        status:{
          del:false
        }
      };
    },
    methods: {
      delFn(data) {
        this.status.del = data.isDel;
      }
    }
  };
</script>

<style>

</style>
