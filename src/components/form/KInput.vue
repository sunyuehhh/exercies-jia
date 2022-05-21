<template>
  <div>
    <!-- 自定义组件要实现v-modal,必须要实现v-bind,@input -->
    <!-- $attrs存储的是props之外传递过来的东西 -->
    <input :value="value" @input="OnInput" v-bind="$attrs" />
  </div>
</template>
<script>
export default {
  inheritAttrs: false, //避免顶层容器div继承属性
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    OnInput(e) {
      // 通知父组件数值变化,父组件index中v-model就是v-bind+@input,就监听了子组件传过来的input
      this.$emit("input", e.target.value);

      // 通知FormItem进行校验,这里是要在KFormItem监听，是兄弟组件之间的监听
      this.$parent.$emit("validate");
    },
  },
};
</script>
<style scoped></style>
