<template>
  <a-card class="box-card">
    <a-tabs default-active-key="1"
            lazy-load
            justify
            >
      <a-tab-pane key="1">
        <template #title>
          <icon-user/> 账号登录
        </template>
        <a-form
            ref="loginFormRef"
            :rules="formRules"
            size="medium"
            layout="vertical"
            :model="formItem"
            auto-label-width
            @submit="submitForm"
        >
          <a-form-item label="用户名"
                       field="username"
                       hide-asterisk
          >
            <a-input
                v-model.trim="formItem.username"
                placeholder="请输入用户名"
                :onFocus="onFocus">
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="密码"
                       field="password"
                       hide-asterisk
          >
            <a-input-password
                v-model.trim="formItem.password"
                placeholder="请输入密码"
            >
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <router-link to="/find/account">
              <a-link type="primary"
              >忘记用户名或密码
              </a-link>
            </router-link>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" style="width: 100%;" html-type="submit"
            >登录
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
      </a-tab-pane>
      <a-tab-pane key="2" style="text-align: center">
        <template #title>
          <icon-qrcode />  微信登录
        </template>
        <a-typography-text type="secondary">
          扫码后请点击关注微信公众号以便获取用户信息
        </a-typography-text>
        <img  height="280" width="280"  :src=wechatQRData.qrURL>
        <a-button type="secondary" @click="checkQR">扫码后点此继续</a-button>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script>


export default {
  name: "LoginView",
  data() {
    return {
      wechatQRData:{
        token:"",
        qrURL:""
      },
      formItem: {
        username: "",
        password: ""
      },
      formRules: {
        username: [{required: true, message: "用户名不能为空", trigger: "blur"},
          ],
        password: {required: true, message: "密码不能为空", trigger: "blur"}
      },
    }
  },
  methods: {
    submitForm({values, errors}) {
      let that = this
      if (!errors) {
        let data = {
         username: values.username,
          password: values.password
        }
        that.$axios.post("/user/login", data)
            .then((response) => {
              let res = response["data"]
              if (res.code ===200){
                that.$message.success({
                  content: res["message"]
                })
                that.$store.commit("setToken", res.data["token"])
                console.log(that.$store.state.token)
                that.$router.push("/home")
              }else {
                that.$message.error(response["data"]["message"])
              }
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
    },

    getQR() {
        let that = this
        that.$axios.get("/user/wechat_qr").then((response) =>{
          let res = response["data"]
          if (res["code"]===200){
            that.wechatQRData.qrURL = res.data["qr_url"]
            that.wechatQRData.token = res.data["token"]
          }else {
            that.$message.error(res.data["code"])
          }
        }).catch((error)=>{
          that.$message.error(error.data.data["message"])
        })
    },
    checkQR(){
      let that = this
      let data = new FormData();

      data.append('wechat_token',that.wechatQRData.token);
      that.$axios.post("/user/wechat_check", data).then((response) =>{
        let res = response["data"]
        if (res.code ===200){
          console.log(response)
          that.$message.success({
            content: res.message
          })
          that.$store.commit("setToken", res.data["token"])
          console.log(that.$store.state.token)
          that.$router.push("/home")
        }else {
          that.$message.error(res["message"])
        }
      }).catch((error)=>{
        console.log(error.data)
        that.$message.error("服务器异常，请稍后再试")
      })
    }
  },
  created: function () {
    this.getQR()
  }
}

</script>

<style scoped>
.box-card {
  position: absolute;
  width: calc(min(100%, 360px));
  /*height: 420px;*/
  margin: auto auto auto auto;
  top: 30%;
  left: calc(max(15%,200px));
  right: 15%;
  line-height: 20%;
}
</style>