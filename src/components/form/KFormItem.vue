<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <!-- 校验信息 -->
    <p v-if="errMessage">{{ errMessage }}</p>
  </div>
</template>
<script>
import Schema from "async-validator";
export default {
  data() {
    return {
      errMessage: "",
    };
  },
  inject: ["form"],
  props: {
    label: {
      type: String,
      default: "",
    },
    prop: {
      type: String,
      default: "",
    },
  },
  mounted() {
    // 监听校验事件，并执行监听
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 这里头执行组件的校验
      // 1.获取校验规则
      // 2.获取数据
      // console.log(this.form.rules);
      const rules = this.form.rules[this.prop];
      const value = this.form.model[this.prop];

      // 3.执行校验
      // desc是校验的描述符
      const desc = {
        [this.prop]: rules,
      };
      const schema = new Schema(desc);
      // 参数1是值
      return schema.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          this.errMessage = errors[0].message;
        } else {
          this.errMessage = "";
        }
      });
    },
  },
};
</script>
<style scoped></style>
