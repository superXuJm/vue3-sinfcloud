import VViewer from '@/components/VViewer.vue';
<template>
  <div class="v-viewer">
    <h2>
      <div>集成第三方开源库v-viewer图片预览功能</div>
      <a href="https://github.com/mirari/v-viewer/tree/v3" target="_blank">
        {{`https://github.com/mirari/v-viewer/tree/v3`}}
      </a>
    </h2>
    <div v-viewer>
      <img 
        v-for="(src,index) in images" 
        :key="index" 
        :src="src"
      />
    </div>
    <a-button @click="toPreviewImage">预览图片事件</a-button>
    <pre>
      <code>
        {{preCode1}}
      </code>
    </pre>
  </div>
</template>

<script>
export default {
  name: 'VViewer',
  data(){
    return{
      images:[
        `${window.BASE_URL}images/test01.jpg`,
        `${window.BASE_URL}images/test02.png`
      ],
      preCode1:`
        <template>
          <div v-viewer>
            <img 
              v-for="(src,index) in images" 
              :key="index" 
              :src="src"
            />
          </div>
          <button @click="toPreviewImage">预览图片事件</button>
        </template>
        export default {
          data(){
            return{
              images:[
                "/images/test01.jpg",
                "/images/test02.png"
              ]
            }
          },
          methods:{
            toPreviewImage(){
              this.$viewerApi({
                images: this.images,
              })
            }
          }
        }`
    }
  },
  created(){
    console.log(this);
  },
  methods:{
    toPreviewImage(){
      this.$viewerApi({
        images: this.images,
      })
    }
  }
}
</script>
<style lang="less" scoped>
.v-viewer {
  width: 100%;
  height: 100%;
  h2 {
    text-align: center;
    a {
      color: #0969da;
    }
  }
  img {
    width: 300px;
    height: 150px;
    border:1px solid #999;
    margin: 10px;
    cursor: pointer;
  }
}
</style>
