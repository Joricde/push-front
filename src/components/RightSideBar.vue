<template>
  <a-layout-sider breakpoint="xl"
                  :collapsed="false"
                  style="width: calc(max(30vw, 200px))"
  >
    <div class="logo"/>
    <a-form :model="form" @submit="handleSubmit">
      <a-space direction="vertical" size="medium" class="from">
        <a-typography-title :heading="5" editable v-model:editText="str">
          {{ str }}
        </a-typography-title>
        <a-select defaultValue="推送方式" :style="{width:'90%'}" placeholder="Please select ...">
          <a-option>推送方式</a-option>
          <a-option>微信推送</a-option>
          <a-option>邮箱推送</a-option>
          <a-option>短信推送</a-option>
        </a-select>
        <a-date-picker placeholder="提醒我"  :style="{width:'90%'}" showTime>
          <template #suffix-icon>
            <icon-notification />
          </template>
        </a-date-picker>
        <a-date-picker placeholder="截至时间" :style="{width:'90%'}" showTime>
          <template #suffix-icon>
            <icon-calendar />
          </template>
        </a-date-picker>
        <a-date-picker placeholder="重复" :style="{width:'90%'}" showTime>
          <template #suffix-icon>
            <icon-sync />
          </template>
        </a-date-picker>
        <a-upload draggable action="/" />
        <a-textarea placeholder="添加备注"  auto-size style="min-height: 100px"/>
      </a-space>
    </a-form>
  </a-layout-sider>
</template>

<script>
export default {
  name: "RightSideBar",
  data(){
    return{
      str:"任务1"
    }
  }
}
</script>

<style scoped>
.from{
  width: calc(max(28vw, 180px));
  margin: 55px auto auto auto;
  top: 5%;
  left: 10%;
  right: 10%;
  line-height: 20%;
}

</style>