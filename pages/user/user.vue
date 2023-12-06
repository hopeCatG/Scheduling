<template>
	<view class="bg-white bg-height">
		<view class="gradient-background bg-height  boxTop">
			<view class="children">

			</view>
			<view class="padding-sm bg-height"
				:style="{ paddingTop: navHeight + 'px', position: 'fixed', zIndex: 9, width: '100%' }">
				<view v-if="userInfo.nickname === ''"><button open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber" style="position: unset;background: none; color: white;">
						<view class="text-dftext-black text-bold texst-white">
							立即登录
						</view>
					</button></view>
				<view class="flex align-center" v-else>
					<view class="cu-avatar lg round margin-left " :style="{
							backgroundImage:`url(${userInfo.avatar})`
						}">
					</view>
					<view class="margin-left-sm text-white">
						<view class=" text-dftext-black text-bold">{{userInfo.nickname}}</view>
						<view class=" text-dftext-black text-sm margin-tb-xs">用户ID:{{userInfo.id}}</view>
						<view class=" text-dftext-black text-sm ">
							{{userInfo.mobile.replace(/^(\d{3})\d+(\d{4})$/, '$1****$2')}}</view>
					</view>
				</view>
				<!-- 基本信息 -->
				<view class="grid-3 grid-sm text-center padding-sm text-white">
					<view class="">
						姓名：{{userInfo.userInfo.name || ''}}
					</view>
					<view class="">
						年龄：{{userInfo.userInfo.age || ''}}
					</view>
					<view class="">
						职位：{{userInfo.userInfo.pos_name || ''}}
					</view>
				</view>
				<!-- 操作列表 -->
				<view class="bg-white  padding-sm  radius-20 shadow grid-4 grid-sm  margin-top-xl">
					<view class="flex flex-direction align-center"
						@click="goWhere('/pagesApply/pages/applyUp/applyUp?type=-1')">
						<image src="../../static/list_faqi.png" class=" " style="width: 40px;height:40px;" mode="">
						</image>
						<span class=" margin-top-sm text-sm">发起调班</span>
					</view>
					<view class="flex flex-direction " @click="goWhere('/pages/hdMessage/hdMessage')">
						<image src="../../static/lsit_msg.png" class="self-center " style="width: 40px;height:40px;"
							mode=""></image>
						<span class="self-center margin-top-sm text-sm">互调消息</span>
					</view>
					<view class="flex flex-direction " @click="goWhere('/pages/auditList/auditList')">
						<image src="../../static/list_SP.png" class="self-center " style="width: 40px;height:40px;"
							mode="">
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
							<view :class="['text-center', 'padding-tb-xs',tabIndex == 0 ? 'active' : ''] "
								@click="tabIndex = 0">
								全部
							</view>
							<view :class="['text-center','center','padding-tb-xs',tabIndex == 1 ? 'active' : '']"
								@click="tabIndex = 1">
								公休
							</view>
							<view :class="['text-center', 'padding-tb-xs',tabIndex == 2 ? 'active' : ''] "
								@click="tabIndex = 2">
								互调
							</view>
						</view>
					</view>
					<!-- 列表 -->
					<view class="padding-sm">
						<view class="flex justify-between padding-sm" style="border-top: 1px solid #EFEFEF;"
							v-for='(listI,listIndex) in listArr' :key="listIndex"
							@click="goWhere('/pagesApply/pages/applyEdit/applyEdit?params=' + JSON.stringify(listI))">
							<view class="">
								<view class="text-black text-xl">
									{{listI.type == 1 ? '互调' : '公休'}}申请
								</view>
								<view class="text-sm" style="color: #999999;">
									{{ listI.date }}
								</view>
							</view>
							<view class="">
								<image v-if="listI.state == 0" src="../../static/under_review.png" mode=""
									style="width: 90rpx;height: 90rpx;"></image>
								<image v-if="listI.state == 1" src="../../static/ReviewYEs.png" mode=""
									style="width: 80rpx;height: 80rpx;"></image>
								<image v-if="listI.state == 2" src="../../static/ReviewNo.png" mode=""
									style="width: 80rpx;height: 80rpx;"></image>
							</view>
						</view>

					</view>
				</view>
			</view>
			<u-datetime-picker :show="show" v-model="mode" mode="date" :closeOnClickOverlay='true' @confirm='confirm'
				@cancel="closeFun"></u-datetime-picker>
				<u-modal :show="show"  title="请绑定人员信息" >
							<view class="slot-content">
								<rich-text :nodes="content"></rich-text>
							</view>
						</u-modal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					nickname: '',
					userInfo:{
						pos_name:'',
						age:'',
						name:''
					}
				},
				userData:{
					name:'',
					age:'',
					position:''
				},
				statusBarHeight: 0, // 状态导航栏高度
				navHeight: 0, // 总体高度
				navigationBarHeight: 0, // 导航栏高度(标题栏高度)
				show: false,
				mode: 'single',
				date: '请选择时间！',
				tabIndex: 0,
				listArr: [{
					state: 0,
					type: 1,
					date: '2023-12-12'
				}, {
					state: 1,
					type: 2,
					date: '2023-12-12'
				}, {
					state: 2,
					type: 1,
					date: '2023-12-12'
				}, ],
				globalData:(getApp()).globalData
			}
		},
		onLoad() {
			this.userInfoInit();
			this.navHeight = this.globalData.getStatusBarHeight();
			this.$http.post('approval/index').then(res => {
				console.log(res);
			})	
		},
		methods: {
			userInfoInit() {
				let that = this; 
				uni.getStorage({
					key: 'userInfo',
					success: function(res) {
						that.userInfo = res.data;
						console.log(that.userInfo);
					}
				}) 
			},
			getPhoneNumber(e) {
				let that = this;
				uni.login({
					provider: 'weixin',
					timeout: 3000,
					success: res => {
						if (res.code) {
							that.code = res.code;
							that.$http.post('login/wxLogin',{
								code: that.code,
								iv: e.detail.iv,
								encryptedData: e.detail.encryptedData
							}).then((res) => {
								that.loginF(res.phoneNumber)
							})
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			loginF(mobile) {
				let that = this;
				uni.login({
					"provider": "weixin",
					"onlyAuthorize": true, // 微信登录仅请求授权认证
					success: function(event) {
						const {
							code
						} = event
						that.$http.post('login/mnpLogin',{
							code: event.code,
							mobile
						}).then((res) => {
							//获得token完成登录
							uni.setStorageSync('token', res.token)
							uni.setStorageSync('userInfo', res)
							that.userInfoInit()
							uni.showToast({
								title: '登录成功', 
								icon: "none"
							});
						})
					},
					fail: function(err) {
						uni.showToast({
							title: '登录授权失败', 
							icon: "none"
						});
					}
				})
			},
			formattedDate(value_datetime) {
				const date = new Date(value_datetime);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				return `${year}-${month}-${day}`;
			},
			confirm(e) {
				this.date = this.formattedDate(e.value);
				this.show = false;
			},
			resetFun() {
				this.date = '请选择时间！'
			},
			closeFun() {
				this.show = false;
			},
			goWhere(url) {
				uni.navigateTo({
					url,
				})
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
			width: 600rpx;
			height: 600rpx;
			border-radius: 50%;
			background-color: #5FCCB5;
			position: absolute;
			top: -30px;
			left: -60px;
		}
	}

	.Approval {
		button {
			width: 100rpx !important;
		}

		.tabs {
			width: 80%;
			border: 1px solid $primary;
			overflow: hidden;

			.center {
				border-left: 1px solid $primary;
				border-right: 1px solid $primary;
			}

			.active {
				background-color: $primary;
				color: white;
			}
		}
	}
</style>