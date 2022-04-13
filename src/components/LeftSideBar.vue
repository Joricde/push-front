<template>
  <a-layout-sider breakpoint="xl"
                  :collapsed="false">
    <div class="logo"/>
    <a-dropdown alignPoint  @click="handleSelect">
      <div class="flex-box">
        <span class="avatar"><IconUser/></span>
        <div class="content">
          <a-typography-title :heading="6">{{ user.nickname }}</a-typography-title>
          {{user.username}}
        </div>
      </div>
      <template #content>
        <a-doption>修改信息</a-doption>
        <a-doption >修改密码</a-doption>
      </template>
    </a-dropdown>
    <a-input-search v-model="searchContext.context"
                    placeholder="Search"
                    :loading="searchContext.loading"
                    style="margin: 10px  auto 10px auto; width: 90%"/>

    <a-dropdown position="top" trigger="contextMenu">
      <a-button long style="text-align: left ; margin: 10px  auto 10px auto; width: 90%" >
        <template #icon>
          <icon-sun />
        </template>
        我的一天
          <a-badge
            :count="1"
            :dotStyle="{ background: '#E5E6EB', color:'gray' }"
            :max-count="99" style="float: right" />
      </a-button>
    </a-dropdown>
    <a-dropdown position="top" trigger="contextMenu">
      <a-button long style="text-align: left ; margin: 10px  auto 10px auto; width: 90%" >
        <template #icon>
          <icon-star />
        </template>
        重要
        <a-badge
            :count="1"
            :dotStyle="{ background: '#E5E6EB', color:'gray' }"
            :max-count="99" style="float: right" />
      </a-button>
    </a-dropdown>
    <a-dropdown position="top" trigger="contextMenu">
      <a-button long style="text-align: left ; margin: 10px  auto 10px auto; width: 90%" >
        <template #icon>
          <icon-user-group />
        </template>
        已分配给我
        <a-badge
            :count="1"
            :dotStyle="{ background: '#E5E6EB', color:'gray' }"
            :max-count="99" style="float: right" />
      </a-button>
    </a-dropdown>
    <a-dropdown position="top" trigger="contextMenu">
      <a-button long style="text-align: left ; margin: 10px  auto 10px auto; width: 90%" >
        <template #icon>
          <icon-user-group />
        </template>
        已完成
        <a-badge
            :count="1"
            :dotStyle="{ background: '#E5E6EB', color:'gray' }"
            :max-count="99" style="float: right" />
      </a-button>
    </a-dropdown>
    <a-divider />
    <a-dropdown position="top" :key="key" trigger="contextMenu" v-for="(value, key) in taskList">
      <a-button long style="text-align: left ; margin: 10px  auto 10px auto; width: 90%" >
        <template #icon>
          <icon-list />
        </template>
        {{ value }}
        <a-badge
            :count="1"
            :dotStyle="{ background: '#E5E6EB', color:'gray' }"
            :max-count="99" style="float: right" />
      </a-button>
      <template #content>
        <a-doption>
        <a-typography-text type="danger">
          删除分组
        </a-typography-text>
        </a-doption>
        <a-doption>
          <a-typography-text>
            内容移动到
          </a-typography-text></a-doption>
        <a-doption>
          <a-typography-text >
            重命名
          </a-typography-text>
          </a-doption>
      </template>
    </a-dropdown>
    <a-dropdown trigger="contextMenu">
      <a-button long
                style="text-align: left ;
                margin: 10px  auto 10px auto;
                width: 90%"
                @click="addTaskList">
        <template #icon>
          <icon-subscribe-add />
        </template>
        添加列表
        <a-badge
            :count="1"
            :dotStyle="{ background: '#E5E6EB', color:'gray' }"
            :max-count="99" style="float: right" />
      </a-button>
    </a-dropdown>
  </a-layout-sider>
</template>

<script>
export default {
  name: "LeftSideBar",
  data() {
    return {
      user: {
        username: "username",
        nickname: "nickname",
        email: "email@email.com",

      },
      searchContext: {
        context: "",
        loading: false
      },
      taskTemplate:{
        title: '',
        record:0,
      },
      taskList: [
      ],
      handleSelect: (v) => {
        console.log(v)
      }
    }
  },
  methods: {
    onClickMenuItem(key) {
      this.$message.info({content: `You select ${key}`, showIcon: true});
    },
    addTaskList() {
      this.taskList.push("test")
    }
  },
  watch: {
    'searchContext.context': function (newVal) {
      this.searchContext.loading = true
      setTimeout(() => {
        console.log("new" + newVal)
        this.searchContext.loading = false
      }, 1000)
    }
  }
}
</script>
<style scoped>
.flex-box .avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-left: 10px;
  color: var(--color-text-2);
  font-size: 16px;
  background-color: var(--color-fill-3);
  border-radius: 50%;
}

.flex-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-box .content {
  flex: 1;
  color: var(--color-text-2);
  font-size: 12px;
  line-height: 20px;
}

.menu_content {
  text-align: left;
}
</style>