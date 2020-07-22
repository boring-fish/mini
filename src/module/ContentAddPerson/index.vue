<template>
  <div id="article">
    <!-- <status-btn @querydata='querydataFn($event)'></status-btn> -->
    <div id="statusBtn">
      <blockquote class="layui-elem-quote news_search">
        <form class="layui-form">
          <div class="layui-form-item">
            <label class="layui-form-label">时间区域1</label>
            <div class="layui-input-block">
              <input
                id="starttime"
                type="text"
                name="starttime"
                placeholder="请输入"
                autocomplete="off"
                class="layui-input inputline"
              >
              <span>——</span>
              <input
                id="endtime"
                type="text"
                name="endtime"
                placeholder="请输入"
                autocomplete="off"
                class="layui-input inputline"
              >
            </div>
          </div>
          <div class="layui-form-item">
            <label class="layui-form-label">活动名称</label>
            <div class="layui-input-block">
              <input
                type="text"
                name="activeName"
                placeholder="请输入"
                autocomplete="off"
                class="layui-input"
              >
            </div>
          </div>
          <div class="layui-form-item">
            <div class="layui-input-block">
              <button
                class="layui-btn"
                @click="query()"
              >
                查询s
              </button>
            </div>
          </div> 
        </form>
        <!-- <div class="layui-inline">
        <a class="layui-btn layui-btn-normal newsAdd_btn">添加文章</a>
      </div> -->
      </blockquote>
    </div>
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
          time:'',
      activeName:''
        }
      };
    },
    // watch:{     //监听value的变化，进行相应的操作即可
    // btnStstus: function(a,b){     //a是value的新值，b是旧值
    //   this.inittableContent(a);

    // },
    // },
    computed:{
      //  querydataFn(data) {
      //   console.log(data);
      //   this.status = data;
      // }
    },
    methods: {
      // querydataFn(data) {
      //   console.log(data);
      //   this.status = data;
      // },
       query() {
     let time=$("input[name='starttime']").val()+'-'+$("input[name='endtime']").val();
    this.status={
      time:time,
      activeName:$("input[name='activeName']").val()
    };
    console.log( this.form);
    // this.$emit('querydata',this.form.time);
  }
  },
    // }
  };
</script>

<style scoped>
.layui-input {
  display: block;
  width: 10%;
  padding-left: 10px;
}
.inputline {
  display: inline-block;
}
</style>
