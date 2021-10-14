<template>
  <div class="home-page">
    
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      selectedKeys:["IconFont"],
      menuList:[
        
      ]
    }
  },
  components: {

  },
  watch:{
    selectedKeys(val){

    }
  },
  created(){
    this.$router.push("/components/IconFont");
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
