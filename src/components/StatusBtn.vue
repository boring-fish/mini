<template>
  <div id="statusBtn">
    <blockquote class="layui-elem-quote news_search">
      <form class="layui-form">
        <div class="layui-form-item">
          <label class="layui-form-label">时间区域</label>
          <div class="layui-input-block">
            <input
              type="text"
              name="starttime"
              placeholder="请输入"
              v-model="starttime"
              @click="st"
              class="layui-input inputline"
              id="starttime"
            />
            <span>——</span>
            <input
              type="text"
              name="endtime"
               v-model="endtime"
              placeholder="请输入"
              class="layui-input inputline"
              id="endtime"
            />
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
            />
          </div>
        </div>
        <div class="layui-form-item">
          <div class="layui-input-block">
            <button class="layui-btn"  @click="query()">查询</button>
          </div>
        </div> 
      </form>
       <!-- <div class="layui-inline">
        <a class="layui-btn layui-btn-normal newsAdd_btn">添加文章</a>
      </div> -->

    </blockquote>
  </div>
</template>

<script>
import $ from 'jquery'
import laydate from 'layui-laydate'
export default {
  data() {
    return {
      // starttime:'',
      // endtime
      form:{
        time:'',
      activeName:''
      },
     laydate:window.laydate
    };
  },
  mounted(){
    
  },
  methods: {
    st(){
        console.log('/////');
 
    },
  query() {
     let time=$("input[name='starttime']").val()+'-'+$("input[name='endtime']").val();
    this.form={
      time:time,
      activeName:$("input[name='activeName']").val()
    };
    console.log( this.form);
    this.$emit('querydata',this.form.time);
  }
  },
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
