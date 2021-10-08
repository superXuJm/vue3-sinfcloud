<template>
  <div class="IconFont">
    <iframe :src="url" frameborder="no" border="0">

    </iframe>
  </div>
</template>

<script>
export default {
  name: 'IconFont',
  data(){
    return{
      url:`${window.BASE_URL}IconFont/demo_index.html`,
    }
  },
  methods:{

  }
}
</script>
<style lang="less" scoped>
.IconFont {
  width: 100%;
  height: 100%;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
