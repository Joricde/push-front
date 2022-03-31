<template>
  <a-card class="box-card">
    <a-form
        ref="loginFormRef"
        :rules="formRules"
        size="medium"
        layout="vertical"
        :model="formItem"
        auto-label-width
        @submit="submitForm"
    >
      <a-form-item>
      <a-typography-title :heading="4" >
        登录
      </a-typography-title>
      </a-form-item>
      <a-form-item label="Username"
                   field="username"
                   hide-asterisk
      >
        <a-input
            v-model="formItem.username"
            placeholder="Please input username"
            :onFocus="onFocus">
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="Password"
                   field="password"
                   hide-asterisk
      >
        <a-input-password
            v-model="formItem.password"
            placeholder="Please input password"
            >
          </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-link type="primary">忘记用户名或密码?</a-link>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="width: 100%;" html-type="submit"
        >Submit
        </a-button>
      </a-form-item>
      <a-form-item>
        <router-link to="/register">
          <a-link type="primary"
          >创建账号
          </a-link>
        </router-link>
      </a-form-item>
    </a-form>
  </a-card>
</template>
<script>


export default {
  name: "LoginView",
  data() {
    return {
      formItem: {
        username: "",
        password: ""
      },
      formRules: {
        username: [{required: true, message: "用户名不能为空", trigger: "blur"},
          ],
        password: {required: true, message: "密码不能为空", trigger: "blur"}
      }
    }
  },
  methods: {
    submitForm({values, errors}) {
      let that = this
      if (!errors) {
        let data = {
          user: {username: values.username},
          pwd: {password: values.password}
        }
        that.$axios.post("/login", data)
            .then((response) => {
              let resData = response["data"]
              that.$message.success({
                message: response["message"]
              })
              that.$store.commit("setToken", resData["token"])
              that.$router.push("/home")
            })
            .catch((error) => {
              that.$message.error(error.response["data"]["message"])
            })
      }else {
        that.$message.error("提交内容为空")
      }
    },
    onFocus(){
      this.$refs.loginFormRef.clearValidate()
    }
  }
}

</script>

<style scoped>
.box-card {
  position: absolute;
  width: calc(min(100%, 360px));
  height: 430px;
  margin: auto auto auto auto;
  top: 30%;
  left: 15%;
  right: 15%;
  line-height: 20%;
}
</style>