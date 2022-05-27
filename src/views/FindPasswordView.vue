<template>
  <a-card class="box-card">
    <a-form layout="vertical">
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
        <a-button :style="{marginLeft:'10px'}">获取验证码</a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" long>下一步</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  name: "FindPasswordView"
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