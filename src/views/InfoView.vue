<template>
<a-card class="box-card">
    <a-descriptions :data="userData" title="用户信息" :column="1" size="large" >
      <a-descriptions-item
          v-for="item of userData"
          :key="item.label"
          :label="item.label">
          <a-typography-text
              editable
              v-model:editText="item.value">
            <a-tag style="font-size:16px">
            {{ item.value }}
            </a-tag>
          </a-typography-text>
      </a-descriptions-item>
      <a-descriptions-item label="微信">
        <a-button>添加微信</a-button>
      </a-descriptions-item>
    </a-descriptions>
</a-card>
</template>

<script>
export default {
  name: "InfoView",
  setup(){
    const userData = [{
      label: '用户名',
      value: 'root',
    }, {
      label: '昵称',
      value: 'user',
    },{
      label: '密码',
      value: '******',
    }, {
      label: '邮箱',
      value: 'test@imouto.link'
    }, {
      label: '电话',
      value: '12345678901',
    }];
    return {
      userData
    }
  },
  data(){
    return {
      str:"test"
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