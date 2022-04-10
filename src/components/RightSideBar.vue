<template>
  <a-layout-sider breakpoint="xl"
                  :collapsed="false"
                  style="width: calc(max(30vw, 200px))"
  >
    <div class="logo"/>
    <a-menu
        :default-open-keys="['1']"
        :default-selected-keys="['0_3']"
        :style="{ width: '100%' }"
        @menu-item-click="onClickMenuItem"
    >
      <a-menu-item key="0_1" disabled >
        <IconHome></IconHome>
        Menu 1
      </a-menu-item>
      <a-menu-item key="0_2">
        <IconCalendar></IconCalendar>
        Menu 2
      </a-menu-item>
      <a-menu-item key="0_3">
        <IconCalendar></IconCalendar>
        Menu 3
      </a-menu-item>
      <a-sub-menu key="1">
        <template #title>
          <IconCalendar></IconCalendar>
          Navigation 1
        </template>
        <a-menu-item key="1_1">Menu 1</a-menu-item>
        <a-menu-item key="1_2">Menu 2</a-menu-item>
        <a-sub-menu key="2" title="Navigation 2">
          <a-menu-item key="2_1">Menu 1</a-menu-item>
          <a-menu-item key="2_2">Menu 2</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="3" title="Navigation 3">
          <a-menu-item key="3_1">Menu 1</a-menu-item>
          <a-menu-item key="3_2">Menu 2</a-menu-item>
          <a-menu-item key="3_3">Menu 3</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="4">
        <template #title>
          <IconCalendar></IconCalendar>
          Navigation 4
        </template>
        <a-menu-item key="4_1">Menu 1</a-menu-item>
        <a-menu-item key="4_2">Menu 2</a-menu-item>
        <a-menu-item key="4_3">Menu 3</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="5">
        <template #title>
          <IconCalendar></IconCalendar>
          Navigation 4
        </template>
        <a-menu-item key="4_1">Menu 1</a-menu-item>
        <a-menu-item key="4_2">Menu 2</a-menu-item>
        <a-menu-item key="4_3">Menu 3</a-menu-item>
      </a-sub-menu>
    </a-menu>
    <!-- trigger -->
    <template #trigger="{ collapsed }">
      <IconCaretRight v-if="collapsed"></IconCaretRight>
      <IconCaretLeft v-else></IconCaretLeft>
    </template>
  </a-layout-sider>
</template>

<script>
export default {
  name: "RightSideBar"
}
</script>

<style scoped>

</style>