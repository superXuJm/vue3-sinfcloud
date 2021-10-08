<template>
  <div id="nav">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  width: 100%;
  height: 100%;
}
#nav {
  width: 100%;
  height: 100%;
}
pre {
  padding: 16px;
  overflow: auto;
  font-size: 85%;
  line-height: 1.45;
  background-color: #f6f8fa;
  border-radius: 3px;
  margin-top: 20px!important;
  margin-bottom: 20px;
}
pre code {
  padding: 0;
  margin: 0;
  overflow: visible;
  line-height: inherit;
  word-wrap: normal;
  background-color: transparent;
  border: 0;
}
</style>
