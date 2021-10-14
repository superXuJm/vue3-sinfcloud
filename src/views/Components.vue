<template>
  <a-layout class="home">
    <a-layout-header class="header">
      <h1>vue3-sinfcloud</h1>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="sider">
        <a-menu
          style="width: 100%;height:100%;"
          v-model:selectedKeys="selectedKeys"
          :open-keys="['1']"
          mode="inline"
          @click="handleClick"
        >
          <a-menu-item key="IconFont">
            <b>IconFont字体图标库</b>
          </a-menu-item>
          <a-sub-menu key="1">
            <template #title>
              <span>Components</span>
            </template>
            <a-menu-item-group key="g1" title="自定义组件">
              <a-menu-item key="DragVerify">
                DragVerify滑块验证
              </a-menu-item>
            </a-menu-item-group>
            <a-menu-item-group key="other" title="集成第三方组件">
              <a-menu-item key="VueViewer">
                vue-viewer图片预览
              </a-menu-item>
            </a-menu-item-group>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="content">
        <component 
          v-bind:is="selectedKeys[0]"
        >
        </component>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import DragVerify from "@/components/DragVerify.vue"
import VueViewer from "@/components/VueViewer.vue"
import IconFont from "@/components/IconFont.vue"
export default {
  name: 'Components',
  data(){
    return{
      selectedKeys:[],
      menuList:[
        
      ]
    }
  },
  components: {
    IconFont,
    DragVerify,
    VueViewer
  },
  watch:{
    selectedKeys(val){
      if(val && val.length){
        this.$router.push({
          name:"Components",
          params:{
            name:val[0]
          }
        })
      }
    }
  },
  created(){
    this.selectedKeys = [this.$route.params.name];
  },
  methods:{
    handleClick(){

    }
  }
}
</script>
<style lang="less" scoped>
@bgColor:#fff;
.home {
  width: 100%;
  height: 100%;
}
.header {
  background-color: @bgColor;
  text-align: center;
  box-shadow: 0 2px 8px #f0f1f2;
  position: relative;
  z-index: 10;
  max-width: 100%;
}
.sider {
  padding-top: 40px;
  background-color: @bgColor;
}
.content {
  padding: 40px 20px 40px 40px;
  background-color: @bgColor;
  height: 100%;
  overflow-y: auto;
}
</style>
