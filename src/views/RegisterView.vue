<template>
  <a-form
      ref="registerFormRef"
      :rules="rules"
      layout="vertical"
      label-width="100px"
      :model="registerFormItem"
      auto-label-width
      @submit="submitForm"
  >
    <a-form-item>
      <a-typography-title :heading="4">
        注册
      </a-typography-title>
    </a-form-item>
    <a-form-item label="Username"
                 field="username"
                 :validate-status="user_status"
                 feedback
    >
      <a-input
          v-model="registerFormItem.username"
          placeholder="Please input username"
      />
    </a-form-item>
    <a-form-item label="Nickname" field="nickname">
      <a-input
          v-model="registerFormItem.nickname"
          placeholder="Please input username"
      />
    </a-form-item>
    <a-form-item label="Password" field="password">
      <a-input-password
          v-model="registerFormItem.password"
          placeholder="Please input password"
          autocomplete="off"
      />
    </a-form-item>
    <a-form-item label="Check Password" field="checkPassword" hide-asterisk>
      <a-input-password
          v-model="registerFormItem.checkPassword"
          placeholder="Please input password"
      />
    </a-form-item>
    <a-form-item label="Email" field="email">
      <a-input
          v-model="registerFormItem.email"
          placeholder="Please input email"
      />
    </a-form-item>
    <a-form-item label="Phone" field="phone">
      <a-input
          v-model="registerFormItem.phone"
          placeholder="Please input phone"
      />
    </a-form-item>
    <a-form-item>
      <a-button type="primary" style="width: 100%;" html-type="submit"
      >Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: "RegisterView",
  data() {
    return {
      labelPosition: "top",
      registerFormItem: {
        username: "",
        nickname: "",
        password: "",
        checkPassword: "",
        email: "",
        phone: "",
      },
      checkUsername: "",
      user_status: 'success',
      rules: {
        username: [
          {required: true, message: "用户名不能空", trigger: "blur"},
          {
            validator: async (value, cb) => {
              let b = await this.isExistUSer(value)
              return new Promise(resolve => {
                  if ( b === true) {
                    cb("用户已存在")
                  }
                  resolve()
              })
            }
          }
        ],
        password: [
          {required: true, message: "密码不能为空", trigger: "blur"},
          {min: 6, max: 64, message: "密码长度不合法", trigger: "blur"}
        ],
        checkPassword: [
          {required: true, message: "请再次输入密码", trigger: "blur"},],
        email: [
          {type: 'email', message: '邮箱不合法', trigger: 'blur'},],
        phone: {match: /^[1][0-9]{10}$/, message: '手机号不合法', trigger: 'blur'}
      },
    }
  },
  methods: {
    async isExistUSer(values) {
      let that = this
      let a = true
      that.user_status = 'validating'
      if (that.checkUsername !== values) {
        await that.$axios.get("/check_name", {
          params: {
            username: values
          }
        }).then(function (response) {
          if (response['data']['code'] === 200) {
            a = false
          }
        })
        that.checkUsername = that.registerFormItem.username
      }
      that.user_status = a?"error":"success"
      return a
    },
    submitForm({values, errors}) {
      let that = this
      if (!errors) {
        let data = {
          user: {
            username: values.username,
            nickname: values.nickname,
            password: values.password,
            email: values.email,
          },
          pwd: {password: values.password}
        }
        if (that.registerFormItem.phone !== "") {
          data.user.phone = values.phone
        }
        that.$axios.post("/register", data)
            .then((response) => {
              that.$message.success({
                message: response["data"]["message"]
              })
              that.$router.push("/")
            })
            .catch((error) => {
              that.$message.error(error.response["data"]["message"])
            })
      }
    },
  },
}
</script>

<style scoped>

</style>