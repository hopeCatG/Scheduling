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
		.grid-xs {
		  grid-row-gap: 5px;
		  grid-column-gap: 5px;
		}
		.grid-sm {
		  grid-row-gap: 10px;
		  grid-column-gap: 10px;
		}
		.grid-md {
		  grid-row-gap: 20px;
		  grid-column-gap: 20px;
		}
		
		
		// .u-calendar{
		// 	margin-bottom: 100rpx;
		// }
	
		
	
</style>
