<template>
	<view class="bg-white bg-height">
		<u-button type="primary" text="确定"></u-button>
		<view class="text-red">
			red
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: function(res) {
					// 状态栏高度
					let statusBarHeight = res.statusBarHeight;
					console.log('状态栏高度：', statusBarHeight);
				}
			});
		},
		methods: {
			getData() {
				var result = 0;
				uni.getSystemInfo({
					success: function(res) {
						console.log(res.windowHeight); // print 610
						result = uni.upx2px(res.windowHeight) + 200 // 这里加200或者加100为了看测试效果
						// 不加200默认 return 292
					}
				});
				return result;
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>