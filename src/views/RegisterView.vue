<template>
  <a-card class="box-card">
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
      <a-form-item label="用户名"
                   field="username"
                   :validate-status="user_status"
                   feedback
      >
        <a-input
            v-model.trim="registerFormItem.username"
            placeholder="请输入用户名"
            @focus="onFocus"
        />
      </a-form-item>
      <a-form-item label="昵称" field="nickname">
        <a-input
            v-model.trim="registerFormItem.nickname"
            placeholder="请输入昵称"
        />
      </a-form-item>
      <a-form-item label="密码" field="password">
        <a-input-password
            v-model.trim="registerFormItem.password"
            placeholder="请输入密码"
            autocomplete="off"
        />
      </a-form-item>
      <a-form-item label="校验密码" field="checkPassword" hide-asterisk>
        <a-input-password
            v-model.trim="registerFormItem.checkPassword"
            placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item label="邮箱" field="email">
        <a-input
            v-model="registerFormItem.email"
            placeholder="请输入邮箱"
        />
      </a-form-item>
      <a-form-item label="手机号" field="phone">
        <a-input
            v-model="registerFormItem.phone"
            placeholder="请输入电话号码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="width: 100%;" html-type="submit"
        >提交
        </a-button>
      </a-form-item>
    </a-form>
  </a-card>
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
      user_status: 'success',
      rules: {
        username: [
          {required: true, message: "用户名不能空", trigger: "blur"}, // 规则1
          {
            validator: async (value, cb) => {
              let b = await this.isExistUSer(value)
              return new Promise(resolve => {
                if (b === true) {
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
          {required: true, message: "请再次输入密码", trigger: "blur"},
          {
            validator: (value, cb) => {
              if (value !== this.registerFormItem.password) {
                cb("密码不一致")
              }
            }
          }

        ],
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
      await that.$axios.get("/user/check_name", {
        params: {
          username: values
        }
      }).then((response) => {
        if (response['data']['code'] === 200) {
          a = false
        }
      })

      that.user_status = a ? "error" : "success"
      return a
    },
    onFocus() {
      this.$refs.registerFormRef.clearValidate()
    },
    submitForm({values, errors}) {
      let that = this
      if (!errors) {
        let data = {
          username: values.username,
          nickname: values.nickname,
          email: values.email,
          password: values.password
        }
        if (that.registerFormItem.phone !== "") {
          data.phone = values.phone
        }
        that.$axios.post("/user/register", data)
            .then((response) => {
              let resData = response["data"]
              if (resData.code === 200) {
                that.$message.success({
                  message: resData["data"]["message"]
                })
                that.$router.push("/")
              } else {
                that.$message.error({
                      message: resData["data"]["message"]
                    }
                )
              }
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
.box-card {
  position: absolute;
  width: calc(min(100%, 420px));
  margin: auto auto auto auto;
  top: 10%;
  left: calc(max(15%, 200px));
  right: 15%;
  line-height: 20%;
}
</style>