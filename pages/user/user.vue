<template>
	<view class="bg-white bg-height">
		<view class="gradient-background bg-height  boxTop">
			<view class="children">

			</view>
			<view class="padding-sm bg-height"
				:style="{ paddingTop: navHeight + 'px', position: 'fixed', zIndex: 9, width: '100%' }">
				<view class="flex align-center">
					<view class="cu-avatar lg round margin-left "
						style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg);">
					</view>
					<view class="margin-left-sm text-white">
						<view class=" text-dftext-black text-bold">微信用户名</view>
						<view class=" text-dftext-black text-sm margin-tb-xs">用户id:4</view>
						<view class=" text-dftext-black text-sm ">134****6815</view>
					</view>
				</view>
				<!-- 基本信息 -->
				<view class="grid-3 grid-sm text-center padding-sm text-white">
					<view class="">
						姓名：小明
					</view>
					<view class="">
						年龄：24
					</view>
					<view class="">
						职位：护士
					</view>
				</view>
				<!-- 操作列表 -->
				<view class="bg-white  padding-sm  radius-20 shadow grid-4 grid-sm  margin-top-xl">
					<view class="flex flex-direction align-center">
						<image src="../../static/list_faqi.png" class=" " style="width: 40px;height:40px;" mode=""></image>
						<span class=" margin-top-sm text-sm">发起调班</span>
					</view>
					<view class="flex flex-direction ">
						<image src="../../static/lsit_msg.png" class="self-center " style="width: 40px;height:40px;"
							mode=""></image>
						<span class="self-center margin-top-sm text-sm">互调消息</span>
					</view>
					<view class="flex flex-direction ">
						<image src="../../static/list_SP.png" class="self-center " style="width: 40px;height:40px;" mode="">
						</image>
						<span class="self-center margin-top-sm text-sm">审批管理</span>
					</view>
					<view class="flex flex-direction ">
						<image src="../../static/list_logout.png" class="self-center " style="width: 40px;height:40px;"
							mode=""></image>
						<span class="self-center margin-top-sm text-sm">退出登录</span>
					</view>
				</view>
				<!-- 审批列表 -->
				<view class="margin-top-sm Approval">
					<view class="flex align-center padding-sm">
						<view class="flex align-center flex-1 margin-right-sm">
							<view class="padding-right-sm">
								审批列表
							</view>
							<view class="flex padding-lr-sm justify-between u-border radius padding-xs" style="flex: 1;"
								@click="show = true">
								<div>{{ date }}</div>
								<u-icon name="calendar" color="#909399"></u-icon>
							</view>
						</view>
						<u-button class="margin-right-xs" shape="circle" color='#3AC3A4' type="primary" :plain="true"
							text="查询" :hairline="true" size="small"></u-button>
						<u-button shape="circle" color='#3AC3A4' type="primary" :plain="true" text="重置" :hairline="true"
							size="small" @click="resetFun"></u-button>
					</view>
					
					<!-- tab -->
					<view class="flex justify-center margin-top-sm">
							<view class="tabs round grid-3">
								<view :class="['text-center', 'padding-tb-xs',tabIndex == 0 ? 'active' : ''] " @click="tabIndex = 0">
									全部
								</view>
								<view :class="['text-center','center','padding-tb-xs',tabIndex == 1 ? 'active' : '']" @click="tabIndex = 1">
									公休
								</view>
								<view :class="['text-center', 'padding-tb-xs',tabIndex == 2 ? 'active' : ''] " @click="tabIndex = 2">
									互调
								</view>
							</view>
					</view>
					<!-- 列表 -->
					<view class="padding-sm">
						<view class="flex justify-between padding-sm" style="border-top: 1px solid #EFEFEF;"
						v-for='(listI,listIndex) in listArr' :key="listIndex">
							<view class="">
								<view class="text-black text-xl">
									{{listI.type}}
								</view>
								<view class="text-sm" style="color: #999999;">
									{{ listI.date }}
								</view>
							</view>
							<view class="">
								<image v-if="listI.state == 0" src="../../static/under_review.png" mode="" style="width: 90rpx;height: 90rpx;"></image>
								<image v-if="listI.state == 1" src="../../static/ReviewYEs.png" mode="" style="width: 80rpx;height: 80rpx;"></image>
								<image v-if="listI.state == 2" src="../../static/ReviewNo.png" mode="" style="width: 80rpx;height: 80rpx;"></image>
							</view>
						</view>
					
					</view>
				</view>
			</view>
			<u-calendar :show="show" :mode="mode" @confirm="confirm"></u-calendar>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			statusBarHeight: 0, // 状态导航栏高度
			navHeight: 0, // 总体高度
			navigationBarHeight: 0, // 导航栏高度(标题栏高度)
			show: false,
			mode: 'single',
			date: '请选择时间！',
			tabIndex:0,
			listArr:[
				{
					state:0,
					type:'互调申请',
					date:'2023-12-12'
				},{
					state:1,
					type:'互调申请',
					date:'2023-12-12'
				},{
					state:2,
					type:'互调申请',
					date:'2023-12-12'
				},
			]
		}
	},
	onLoad() {
		// let that = this;
		// uni.getSystemInfo({
		// 	success: function(res) {
		// 		// 状态栏高度
		// 		that.statusBarHeight = res.statusBarHeight;
		// 		console.log('状态栏高度：', that.statusBarHeight);
		// 	}
		// });
		console.log("App Launch")

		// 状态栏高度
		this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight

		// #ifdef MP-WEIXIN
		// 获取微信胶囊的位置信息 width,height,top,right,left,bottom
		const custom = wx.getMenuButtonBoundingClientRect()
		// console.log(custom)

		// 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
		this.navigationBarHeight = custom.height + (custom.top - this.statusBarHeight) * 2
		// console.log("导航栏高度："+this.navigationBarHeight)

		// 总体高度 = 状态栏高度 + 导航栏高度
		this.navHeight = this.navigationBarHeight + this.statusBarHeight

		// #endif

		console.log(this.navHeight)

	},
	methods: {
		confirm(e) {
			this.date = e[0];
			this.show = false;
		},
		resetFun() {
			this.date = '请选择时间！'
		}
	}
}
</script>

<style lang="scss">
.gradient-background {
	/* background: linear-gradient(to bottom, #DBEAFE 30%, #F9FAFC 70%); */
	/* 添加其他样式属性，例如宽度、高度等，以适应您的需求 */
}

.boxTop {
	width: 100%;
	height: 500rpx;
	background-color: $primary;
	border-bottom-left-radius: 10%;
	border-bottom-right-radius: 10%;
	position: relative;
	overflow: hidden;

	.children {
		width: 500rpx;
		height: 500rpx;
		border-radius: 50%;
		background-color: #5FCCB5;
		position: absolute;
		top: -30px;
		left: -60px;
	}
}

.Approval{
	button {
		width: 100rpx !important;
	}
	.tabs{
		width: 80%;
		border: 1px solid $primary;
		overflow: hidden;
		.center{
			border-left: 1px solid $primary;
			border-right: 1px solid $primary;
		}
		.active{
			background-color: $primary;
			color: white;
		}
	}
}

</style>