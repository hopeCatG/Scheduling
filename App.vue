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

	
	.flot{
		float: left;
	}
</style>