<template>
  <div>
    List
    {{ $route.mathed }}
  </div>
</template>
<script>
export default {
  watch: {
    $route() {
      console.log(this.$route.matched);
      this.crumbData = this.$route.matched.map((m) => m.name);
    },
  },
};
</script>
<style scoped></style>
