<template>
	<div 
    class="sc-drag-verify" 
    :style="dragVerifyStyle" 
    @mousemove="dragMoving" 
    @mouseup="dragFinish"
    @touchmove="dragMoving" 
    @touchend="dragFinish"
  >	
    <div 
      class="sc-progress-bar" 
      ref="progressBar" 
      :style="progressBarStyle"
      >	
    </div>
    <div 
      class="sc-drag-text" 
      :style="textStyle"
      ref="message"
      >
      {{message}}
    </div>
    <div 
      class="sc-drag-handler sc-drag-handler-bg" 
      @mousedown="dragStart"  
      ref="handler" 
      :style="handlerStyle" 
      @touchstart="dragStart"
    >
      <i :class="handlerIconClass" style="pointer-events:none;"></i>
    </div>
  </div>
</template>
<script>
export default{
  name:'ScDragVerify',
	props:{
		width:{ // 滑块宽度单位为px
      type: Number,
      default:356
		},
		height:{ // 滑块高度单位为px
			type: Number,
			default: 48
		},
		text:{ // 滑块默认显示的文字
			type:String,
			default:'按住左边滑块，拖动到指定位置'
		},
		successText:{ // 滑块拖拽成功后显示的文字
			type:String,
			default:'验证成功！'
		},
    successFontColor:{
      type:String,
			default:'#fff'
    },
		background:{ // 默认的背景色
			type:String,
			default:'#EFF1F8'
		},
		color:{ // 默认的文字色和字体图标颜色
			type:String,
			default:'#666'
		},
		progressBarBg:{ // 滑块拖拽过程中的背景色
			type:String,
			default:'#0072B9'
		},
		completedBg:{ // 滑块拖拽成功后的背景色
			type:String,
			default:'#52c41a'
		},
		circle:{ // 是否开启圆滑模式
			type:Boolean,
			default: false
		},
		handlerIcon:{ // 滑块拖拽的按钮显示的图标 通过ClassName使用字体图标来进行可视化 当前使用SinfCloud字体图标库 如：'font_family layout-icon-right'"
			type:String
		},
		successIcon:{ // 滑块拖拽的按钮成功后显示的图标 通过ClassName使用字体图标来进行可视化 默认显示一个自带的base64图片 当前使用SinfCloud字体图标库 如：'font_family layout-icon-right'"
			type:String
		},
		handlerBg:{ // 滑块拖拽小方块的背景色
			type:String,
			default:'#fff'
		},
		textSize:{ // 默认滑块内的文字大小
			type:String,
			default:'16px'
		}
	},
	computed:{
		handlerStyle(){
			let style = {
				width : this.height+'px',
				height : this.height+'px',
				borderRadius: this.circle?'50%':0,
				background: this.handlerBg,
				color: this.color,
				borderColor:this.color,
			}
			if(!this.handlerIconClass){
				style.background = `${this.handlerBg} url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==") no-repeat center`
			}
			if(!this.successIcon && this.isPassing){
				style.background = `${this.handlerBg} url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==") no-repeat center`
			}
			return style;
		},
		message(){
			return this.isPassing?this.successText:this.text
		},
		dragVerifyStyle(){
			return {
				width: this.width + 'px',
				height : this.height+'px',
				lineHeight: this.height+'px',
				background:this.background,
				borderRadius: this.circle?this.height/2+'px':0
			}
		},
		progressBarStyle(){
			return {
				background: this.isPassing ? this.completedBg : this.progressBarBg,
				height : this.height+'px',
				borderRadius: this.circle?this.height/2+'px 0 0 ' + this.height/2+'px':0
			}
		},
		textStyle(){
			return {
				height : this.height+'px',
				width : this.width + 'px',
				fontSize:this.textSize,
				color:this.isPassing ? this.successFontColor : this.color 
			}
		},
		handlerIconClass(){
			return this.isPassing?this.successIcon:this.handlerIcon
		}
	},
	data(){
		return{
			isMoving : false,
			x:0,
			isPassing : false
		}
	},
	mounted(){
    window.addEventListener("mousemove",this.dragMoving);
    window.addEventListener("mouseup",this.dragFinish);
	},
  unmounted(){
    window.removeEventListener("mousemove",this.dragMoving);
    window.removeEventListener("mouseup",this.dragFinish);
  },
	methods:{
		// 重新初始化 通过$refs直接调用当前方法
		init(){
      this.isMoving = false;
      this.x = 0;
      this.isPassing = false;
      this.$refs.handler.style.left = '0';
      this.$refs.progressBar.style.width = '0';
      this.$refs.message.style.color = null;
		},
		dragStart(e){
			if(!this.isPassing) {
				this.isMoving = true;
				var handler = this.$refs.handler;
        let left = handler.style.left || "0px";
				this.x = (e.pageX||e.touches[0].pageX) - parseInt(left.replace('px',''), 10);
      }
		},
		dragMoving(e){
      if(this.isMoving && !this.isPassing){
        var _x = (e.pageX||e.touches[0].pageX) - this.x;
        var handler = this.$refs.handler;
        if(_x > 0 && _x <= (this.width-this.height)){
          handler.style.left = _x + 'px';
          this.$refs.progressBar.style.width = (_x+this.height/2)+'px';
        }else if(_x > (this.width-this.height)){
          handler.style.left = (this.width - this.height)+ 'px';
          this.$refs.progressBar.style.width = (this.width-this.height/2)+'px';
          this.passVerify();
        }
      }
		},
		dragFinish(e){
			if(this.isMoving && !this.isPassing){
				var _x = (e.pageX || e.changedTouches[0].pageX)- this.x;
				if(_x <(this.width - this.height)){
					this.$refs.handler.style.left = '0';
					this.$refs.progressBar.style.width = '0';
				}
				this.isMoving = false;
			}else{
        this.isMoving = false;
      }
		},
		passVerify(){
      this.isPassing = true;
      this.isMoving = false;
      var handler = this.$refs.handler;
      handler.children[0].className = this.successIcon;
      this.$refs.progressBar.style.background = this.completedBg;
      this.$emit('passcallback');
		}
	}
	}
</script>
<style scoped>
	.sc-drag-verify { 
    position: relative;
    text-align: center;
  }
	.sc-drag-verify .sc-progress-bar{ 
    position: absolute;
    height: 34px;
    width: 0px;
    transition: background 0.3s ease-in;
  }
	.sc-drag-verify .sc-drag-text{
    position: absolute;
    top: 0px;
    color:inherit;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select:none;
    -ms-user-select:none;
  }
  .sc-drag-verify .sc-drag-handler {
    position: absolute;
    top: 0px;
    left: 0px;
		border: 1px solid;
    cursor: pointer;
  }
  .sc-drag-verify .sc-drag-handler i{
    color: inherit;
    font-size: 20px;
  }

</style>