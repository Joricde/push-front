<template>
  <a-layout class="layout-demo">
  <LeftSideBar></LeftSideBar>
      <a-layout style="padding: 0 24px;  min-width: 250px;">
        <a-breadcrumb :style="{ margin: '16px 0'}">
          <a-breadcrumb-item>我的一天</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>
          <a-space   direction='vertical' style="margin:2vh 2vh 2vh 2vh ">
            <a-list v-for="n in 10" :key="n"  :hoverable="true">
              <a-list-item>
                <a-button v-if="n===10" status="success" shape="circle" size="mini" style="margin-right: 2vh;  position: relative;top: 5px;"/>
                <a-button v-else  shape="circle" size="mini" style="margin-right: 2vh;  position: relative;top: 5px;"/>
                <a-typography-text @click="handleClick" v-if="n===10" delete type="secondary">
                  任务{{n}}
                </a-typography-text>
                <a-typography-text @click="handleClick" v-else primary>
                  任务{{n}}
                </a-typography-text>
                <a-rate :count="1" allow-clear style="float:right;"/>
              </a-list-item>
            </a-list>
            <a-typography-text v-for="n in 10" :key="n">

<!--              <a-button @click="handleClick" size="large" long >任务{{n}}-->
<!--              </a-button>-->
            </a-typography-text>
          </a-space>
        </a-layout-content>
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
/*.layout-demo :deep(.arco-layout-sider-light) .logo{*/
/*  background: var(--color-fill-2);*/
/*}*/
/*.layout-demo :deep(.arco-layout-header)  {*/
/*  height: 64px;*/
/*  line-height: 64px;*/
/*  background: var(--color-bg-3);*/
/*}*/
.layout-footer-demo {
  height: 48px;
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  left: 200px;
  right: calc(max(30vw, 200px));
  background: var(--color-fill-2);
}
.layout-demo :deep(.arco-layout-content) {
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}
/*.layout-demo :deep(.arco-layout-footer),*/
.layout-demo :deep(.arco-layout-content)  {
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  /*color: var(--color-white);*/
  font-size: 16px;
  font-stretch: condensed;
  /*text-align: center;*/
}
</style>