<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			baseUrl:'http://36.134.163.172:9012/api/',
			getStatusBarHeight(){
				// 状态栏高度
				let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
				
				// #ifdef MP-WEIXIN
				// 获取微信胶囊的位置信息 width,height,top,right,left,bottom
				const custom = wx.getMenuButtonBoundingClientRect()
				// console.log(custom)
				
				// 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
				let navigationBarHeight = custom.height + (custom.top - statusBarHeight) * 2
				// console.log("导航栏高度："+this.navigationBarHeight)
				
				// 总体高度 = 状态栏高度 + 导航栏高度
				return  navigationBarHeight + statusBarHeight
				
				// #endif
				return 0;
			}
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import "@/colorui/main.css";
	@import "@/colorui/icon.css";
	// grid 布局

	.grid-2 {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	.grid-3 {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	.grid-4 {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	.grid-5 {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}

	.grid-7 {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
	}

	.grid-xs {
		grid-row-gap: 10rpx;
		grid-column-gap: 10rpx;
	}

	.grid-sm {
		grid-row-gap: 20rpx;
		grid-column-gap: 20rpx;
	}

	.grid-md {
		grid-row-gap: 40rpx;
		grid-column-gap: 40rpx;
	}


	.app-scroll {
		overflow: hidden;
		overflow-y: scroll;
	}

	.app-scroll-x {
		overflow: hidden;
		overflow-x: scroll;
	}

	// .u-calendar{
	// 	margin-bottom: 100rpx;
	// }


	.text-primary {
		color: $primary;
	}

	.border {
		border: 1px solid $borderColor;
	}

	.border-top {
		border-top: 1px solid $borderColor;
	}

	.border-left {
		border-left: 1px solid $borderColor;
	}

	.border-right {
		border-right: 1px solid $borderColor;
	}

	.border-bottom {
		border-bottom: 1px solid $borderColor;
	}
	
	.relative{
		position: relative;
	}
	.absolute{
		position: absolute;
	}
	
	.flot{
		float: left;
	}
</style>