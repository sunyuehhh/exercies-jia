<template>
  <div>
    <KForm :model="model" :rules="rules" ref="loginForm">
      <KFormItem label="用户名" prop="username">
        <KInput v-model="model.username"></KInput>
      </KFormItem>
      <KFormItem label="密码" prop="password">
        <KInput v-model="model.password" type="password"></KInput>
      </KFormItem>
      <KFormItem>
        <button @click="onLogin">登录</button>
      </KFormItem>
    </KForm>
    {{ model }}
  </div>
</template>
<script>
import KInput from "./KInput.vue";
import KFormItem from "./KFormItem.vue";
import KForm from "./KForm.vue";
import Notice from "../Notice";
import create from "@/utils/create";
export default {
  components: {
    KInput,
    KFormItem,
    KForm,
  },
  data() {
    return {
      model: {
        username: "tom",
        password: "",
      },
      rules: {
        username: [{ required: true, message: "用户名必填" }],
        password: [{ required: true, message: "密码必填" }],
      },
    };
  },

  methods: {
    onLogin() {
      // 创建弹窗的实例
      let notice;
      this.$refs.loginForm.validate((isValid) => {
        if (isValid) {
          // alert("登录");
          notice = create(Notice, {
            title: "xxx",
            message: "登录",
            duration: 1000,
          });
        } else {
          // alert("有错");
          notice = create(Notice, {
            title: "xxx",
            message: "有错",
            duration: 1000,
          });
        }
        notice.show();
      });
    },
  },
};
</script>
<style scoped></style>
