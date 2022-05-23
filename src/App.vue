<template>
  <div id="app">
    <router-link to="/home/list">List</router-link>
    <router-link to="/home">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
import router from "./router";
export default {
  name: "app",
  router,
  components: {},
};
</script>
<style scoped></style>
