<template>
  <a-card class="box-card">
    <a-form
        layout="vertical"
        :rules="formRules"
        @submit="submitForm"
    >
      <a-form-item>
        <a-typography-title :heading="5">
          找回密码
        </a-typography-title>
      </a-form-item>
      <a-form-item label="账号">
        <a-input  placeholder="账号/邮箱" />
      </a-form-item>
      <a-form-item label="验证码">
        <a-input  placeholder="请填写验证码" />
        <a-button :style="{marginLeft:'10px'}" @click="GetDynamicCode">获取验证码</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" long>下一步</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  name: "FindPasswordView",
  data(){
    return{
      formItem: {
        username:"",
        code: 0
      },
      formRules: {
        username: [{required: true, message: "用户名不能为空", trigger: "blur"},
        ],
        password: {required: true, message: "密码不能为空", trigger: "blur"}
      },
      checkCode:{
        userID:0,
        code:0
      }

    }
  },
  methods: {
    submitForm({values, errors}) {
      let that = this
      if (!errors) {
        let data = {
          userID: values.code,
          code:values.code
        }
        that.$axios.post("/user/check_dynamic_key", data)
            .then((response) => {
              let res = response["data"]
              if (res.code ===200){
                that.checkCode.userID=res.data["UserID"]
                that.$message.success({
                  content: res["message"]
                })
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
    GetDynamicCode(){
      let that = this
      let data = {
        username: that.checkCode.username,
      }
      that.$axios.post("/user/dynamic_key", data)
          .then((response) => {
            let res = response["data"]
            if (res.code ===200){
              that.checkCode.userID=res.data["UserID"]
              that.$message.success({
                content: res["message"]
              })
            }else {
              that.$message.error(response["data"]["message"])
            }
          })
          .catch((error) => {
            that.$message.error(error.response["data"]["message"])
          })

    }
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