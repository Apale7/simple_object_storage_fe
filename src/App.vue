<template>
  <header>
    <!-- router-link 定义点击后导航到哪个路径下 -->
  </header>
  <Button style="float: right" @click="login">登录</Button>
  <router-view></router-view>
</template>

<script>
import { Button } from "ant-design-vue";
export default {
  name: "App",
  components: {
    Button,
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>
