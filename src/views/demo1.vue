<template>
  <div class="about">
    <div>
      <sc-color-picker
        style="margin-left:40px"
        v-model:colors="background" 
        @change="onChangeBgStyle"
      >

      </sc-color-picker>
      <Sc-ColorPicker
        theme="dark"
        style="margin-left:40px"
        v-model:colors="background" 
        @change="onChangeBgStyle"
      >

      </Sc-ColorPicker>
      <h2>1. Sc-DragVerify 滑块组件</h2>
      <Sc-DragVerify
        :width="356" 
        :height="48"
        text="按住左边滑块，拖动到指定位置"
        successText="验证成功！"
        progressBarBg="yellow"
        handlerIcon="font_family layout-icon-right"
        successIcon="font_family layout-icon-verification"
        @passcallback="toPassCallback"
      />
      <br/>
      <Sc-DragVerify
        :width="356" 
        :height="48"
        text="按住左边滑块，拖动到指定位置"
        successText="验证成功！"
        background="rgba(0,0,0,.8)"
        color="#fff"
        progressBarBg="pink"
        handlerBg="gray"
        handlerIcon="font_family layout-icon-right"
        circle
        successIcon="font_family layout-icon-verification"
        @passcallback="toPassCallback"
      />
      <a-table 
        :columns="columnsDragVerify" 
        :data-source="tableDataDragVerify"
        bordered
        :pagination="false"
      >

      </a-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data(){
    return{
      background: "#999",
      columnsDragVerify:[
        {title:"属性名",key:"key",dataIndex:"key",width:"200px"},
        {title: "类型",key:"type",dataIndex:"type",width:"150px"},
        {title: "默认值",key:"default",dataIndex:"default",width:"150px"},
        {title:"说明",key:"des",dataIndex:"des"}
      ],
      tableDataDragVerify:[
        {key:"width",type:"Number",default:"356",des:"设置滑块宽度单位为px"},
        {key:"height",type:"Number",default:"48",des:"设置滑块高度单位为px"},
        {key:"text",type:"String",default:"按住左边滑块，拖动到指定位置",des:"滑块默认显示的文字"},
        {key:"successText",type:"String",default:"验证成功！",des:"滑块拖拽成功后显示的文字"},
        {key:"background",type:"String",default:"#EFF1F8",des:"默认的背景色"},
        {key:"color",type:"String",default:"#666",des:"默认的文字色和字体图标颜色"},
        {key:"progressBarBg",type:"String",default:"#0072B9",des:"滑块拖拽过程中的背景色"},
        {key:"completedBg",type:"String",default:"#52c41a",des:"滑块拖拽成功后的背景色"},
        {key:"circle",type:"Boolean",default:"false",des:"是否开启圆滑模式"},
        {key:"handlerIcon",type:"String",default:"无",des:"滑块拖拽的按钮显示的图标 通过ClassName使用字体图标来进行可视化 默认显示一个自带的base64图片 当前使用SinfCloud字体图标库 如：'font_family layout-icon-right'"},
        {key:"successIcon",type:"String",default:"无",des:"滑块拖拽成功时按钮显示的图标 通过ClassName使用字体图标来进行可视化 当前使用SinfCloud字体图标库 如：'font_family layout-icon-right'"},
        {key:"handlerBg",type:"String",default:"#fff",des:"滑块拖拽小方块的背景色"},
        {key:"textSize",type:"String",default:"16px",des:"默认滑块内的文字大小"},
        {key:"@passcallback",type:"Function",default:"无",des:"API方法 滑块成功后的回调，无回调参数返回 Function()"},
        {key:"init()",type:"Function",default:"无",des:"重置滑块 登录验证失败等情况使用 this.$refs['当前滑块组件的ref名字'].init() 来调用"},
      ]
    }
  },// #c41d7f
  methods:{
    toPassCallback(){

    },
    onChangeBgStyle(val){
      console.log(val)
    }
  },
  components: {

  }
}
</script>
<style lang="less" scoped>
  .about {
    padding: 50px;
    /deep/ .ant-table-tbody {
      .ant-table-row-cell-break-word:nth-of-type(2) {
        color: #c41d7f;
      }
    }
  }
</style>
