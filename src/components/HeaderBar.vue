<template>
  <div class="headerbar layui-header">
    <div class="layui-layout layui-layout-admin">
      <!-- 顶部 -->
      <div class="layui-header header">
        <div class="layui-main">
          <a
            href="#"
            class="logo"
          >MINI</a>
          <!-- 显示/隐藏菜单 -->
          <a
            href="javascript:;"
            class="iconfont hideMenu icon-menu1"
          />
          <!-- 顶部右侧菜单 -->
          <ul class="layui-nav top_menu">
            <!-- <li class="layui-nav-item showNotice" id="showNotice" pc>
              <a href="javascript:;">
                <i class="iconfont icon-gonggao"></i>
                <cite>系统公告<span class="layui-badge">9</span></cite>
              </a>
            </li> -->
            <li class="layui-nav-item">
              <a @mousemove="showMenu">
                <!-- <img src="../assets/logo.png" class="layui-circle" width="35" height="35"> -->
                <cite>admin</cite>
              </a>
              <dl
                v-show="showPersonMenu"
                class="layui-nav-child"
                @mousemove="showMenu"
                @mouseleave="hideMenu"
              >
                <!-- <dd>
                  <router-link to="/PersonResource">
                    <a href="javascript:;" data-url="page/user/userInfo.html">
                      <i class="iconfont icon-zhanghu" data-icon="icon-zhanghu"></i>
                      <cite>个人资料</cite>
                    </a>
                  </router-link>
                </dd>
                <dd>
                  <router-link to="/ChangePassword">
                    <a href="javascript:;" data-url="page/user/changePwd.html">
                      <i class="iconfont icon-shezhi1" data-icon="icon-shezhi1"></i>
                      <cite>修改密码</cite>
                    </a>
                  </router-link>
                </dd> -->
                <dd>
                  <!-- <router-link to="/Login"> -->
                  <a
                    class="signOut"
                    @click="logoutPage"
                  >
                    <i class="iconfont icon-loginout" />
                    <cite>退出</cite>
                  </a>
                  <!-- </router-link> -->
                </dd>
              </dl>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        // 控制显示个人资料的菜单
        showPersonMenu: false,
      };
    },
    methods: {
      // 控制个人菜单显隐的方法
      showMenu() {
        this.showPersonMenu = true;
      },
      hideMenu() {
        this.showPersonMenu = false;
      },
      logoutPage(){
         this.$cookies.remove("token");
         this.$router.push("/Login");
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .layui-nav-child {
    display: block;
    left:-40px;
  }
</style>
