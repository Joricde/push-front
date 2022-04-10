<template>
  <a-layout class="layout-demo">
  <LeftSideBar></LeftSideBar>
      <a-layout style="padding: 0 24px;">
        <a-breadcrumb :style="{ margin: '16px 0'}">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>
          Content1
          <a-button @click="handleClick">Open Modal</a-button>
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    <RightSideBar v-if="visible"></RightSideBar>
    </a-layout>
</template>
<script>
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
export default {
  components: {
    LeftSideBar,
    RightSideBar
  },
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    handleClick() {
      this.visible = !this.visible;
    }
  }
};
</script>
<style scoped>
.layout-demo {
  height: 85vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}
.layout-demo :deep(.arco-layout-sider-light) .logo{
  background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-header)  {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}
.layout-demo :deep(.arco-layout-content) {
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content)  {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
  text-align: center;
}
</style>