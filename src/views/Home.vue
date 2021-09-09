<template>
  <div class="home">
    <div class="left-panel">
      <a-menu
        style="width: 100%;height:100%;"
        v-model:selectedKeys="selectedKeys"
        :open-keys="['1']"
        mode="inline"
        @click="handleClick"
      >
        <a-sub-menu key="1">
          <template #title>
            <span>Components</span>
          </template>
          <a-menu-item-group key="g1" title="自定义组件">
            <a-menu-item key="DragVerify">
              DragVerify滑块验证
            </a-menu-item>
          </a-menu-item-group>
        </a-sub-menu>
      </a-menu>
    </div>
  </div>
</template>

<script>
import demo1 from "./demo1.vue"
export default {
  name: 'Home',
  data(){
    return{
      selectedKeys:["1"],
      menuList:[
        
      ]
    }
  },
  components: {
    demo1
  },
  methods:{
    handleClick(){

    }
  }
}
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
}
.left-panel {
  position: fixed;
  left: 0;
  top: 0px;
  width: 300px;
  height: 100vh;
  padding: 20px;
  overflow-y: auto;
}
</style>
