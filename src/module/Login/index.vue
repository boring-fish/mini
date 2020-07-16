<template>
  <!-- * @author barry <email>* date 11/9/2017 * description 登陆组件 -->
  <div>
    <div class="video-player">
      <img src="../../assets/img/bg2.jpg" alt />
    </div>
    <div class="login">
      <h1>MINI-管理登录</h1>
      <form class="layui-form">
        <div class="layui-form-item">
          <input
            class="layui-input"
            name="username"
            placeholder="用户名"
            lay-verify="required"
            type="text"
            autocomplete="off"
          />
        </div>
        <div class="layui-form-item">
          <input
            class="layui-input"
            name="password"
            placeholder="密码"
            lay-verify="required"
            type="password"
            autocomplete="off"
          />
        </div>
        <!-- <div class="layui-form-item form_code">
          <input class="layui-input" name="code" placeholder="验证码" lay-verify="required" type="text" autocomplete="off">
          <div class="code">
            <img src="./images/code.jpg" width="116" height="36">
          </div>
        </div>-->
        <!-- <router-link :to='tiao'> -->
        <input
          class="layui-btn login_btn"
          lay-submit
          lay-filter="login"
          @click="btnsubmit()"
          value="登录"
          type="button"
        />
        <span>{{ errormsg }}</span>
        <!-- </router-link> -->
        <!-- 没有账号？点击
        <router-link to="/Regist">
          <a class="layui-tx-red" href="">注册</a>
        </router-link>-->
      </form>
    </div>
  </div>
</template>
<script>
// import layui form '../../static/layui.js'
import $ from "jquery";
export default {
  data() {
    return {
      tiao: "",
      form: {
        username: "",
        password: ""
      },
      errormsg: ""
    };
  },
  mounted() {
  },
  beforeRouteEnter(to, from, next){
      let isLogin = window.$cookies.get("token");
      if (isLogin) {
        // 如果用户信息存在则往下执行。
        next('/ContentArticle');
      } else {
        // 如果用户token不存在则跳转到login页面
          next();
      }
    },
  methods: {
    btnsubmit() {
      this.form = {
        username: $("input[name='username']").val(),
        password: $("input[name='password']").val()
      };
      let that = this;
      this.axios
        .post("/release/login", JSON.stringify(this.form))
        .then(function(res) {
          if (res.data.token) {
            that.$cookies.set(
              "token",
              res.data.token,
              new Date(res.data.expiresTime)
            );
            that.$router.push("/ContentArticle");
          }
        })
        .catch(function(error) {
          if(error.response.data.code=='S99999'){
              that.errormsg = "账号或者密码错误";
          }

        });
    }
  }
};
</script>
<style scoped>
body {
  overflow: hidden;
}

.video-player {
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: block;
  position: absolute;
  z-index: 1;
  top: 0;
}

.video-player img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 90;
  background-color: rgba(0, 0, 0, 0.5);
}

.login {
  height: 260px;
  width: 500px;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  position: absolute;
  left: 45%;
  top: 45%;
  margin: -150px 0 0 -150px;
  z-index: 99;
}

.login h1 {
  text-align: center;
  color: #fff;
  font-size: 24px;
  margin-bottom: 20px;
}

.form_code {
  position: relative;
}

.form_code .code {
  position: absolute;
  right: 0;
  top: 1px;
  cursor: pointer;
}

.login_btn {
  width: 100%;
}

.layui-tx-red {
  color: #fff;
}
span {
  color: red;
}
</style>
