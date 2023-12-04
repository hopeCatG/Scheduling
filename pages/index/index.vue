<template>
	<view class="bg-white bg-height app-scroll" :style="{ paddingTop: navHeight + 'px' }">
		<view class="padding-sm">
			<view class="text-df margin-bottom-sm">
				今日排班
			</view>
			<paiban></paiban>
			<view class="text-df margin-bottom-sm">
				明日排班
			</view>
			<paiban></paiban>
			

			<view class="text-df margin-bottom-sm">
				当月排班
			</view>
			<view class="padding-sm shadow bg-gray radius-20">
				<view class="text-sl text-black">
					{{dateArr[1]}}
				</view>
				<view class="text-grey">
					{{dateArr[0]}} 年 第{{dateArr[3]}}周
				</view>
				<view class="grid-7 grid-sm text-bold padding-tb-sm text-center">
					<view class="text-primary">
						日
					</view>
					<view class="text-black ">
						一
					</view>
					<view class="text-black">
						二
					</view>
					<view class="text-black">
						三
					</view>
					<view class="text-black">
						四
					</view>
					<view class="text-black">
						五
					</view>
					<view class="text-primary">
						六
					</view>
				</view>
				<view class="grid-7 grid-sm text-bold padding-tb-sm">

					<view class="text-black padding-tb-sm" v-for="(dateI,dateIndex) in datesWithWeekdays"
						:key="dateIndex" >
						<view :class="[dateI.date == dateArr[2] ? 'today' : '','padding-tb-xs']" v-if="dateI.date > 1">
							<view class="text-center text-xl">
								{{dateI.date}}
							</view>
							<view
								:class="['text-center','text-xs', dateI.date == dateArr[2] ? 'text-white' : 'text-grey']">
								上班
							</view>
						</view>
					</view>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import paiban from '../../commom/paiban/paiban.vue'
	export default {
		data() {
			return {
				navHeight: 0,
				datesWithWeekdays: [],
				dateArr: []
			}
		},
		components:{paiban},
		onLoad() {
			this.getHeight();
			this.datesWithWeekdays = this.getMonthDatesWithWeekdays();
			this.dateArr = this.getCurrentDateArray();
		},
		methods: {
			getCurrentDateArray() {
				const currentDate = new Date();
				const year = currentDate.getFullYear();
				const month = currentDate.getMonth() + 1; // 月份从0开始，需要加1
				const day = currentDate.getDate();
				const week = this.getWeek(currentDate);
				return [year, month, day, week];
			},
			getWeek(date) {
				const currentDate = new Date(date);
				currentDate.setHours(0, 0, 0, 0);

				// 找到当前年的第一天
				const yearStart = new Date(currentDate.getFullYear(), 0, 1);

				// 计算当前日期是今年的第几天
				const days = Math.floor((currentDate - yearStart) / (24 * 60 * 60 * 1000)) + 1;

				// 计算周数
				const week = Math.ceil(days / 7);

				return week;
			},
			getMonthDatesWithWeekdays() {
				const currentDate = new Date();
				const year = currentDate.getFullYear();
				const month = currentDate.getMonth();
				const firstDay = new Date(year, month, 1);
				const lastDay = new Date(year, month + 1, 0);
				const firstDayOfWeek = firstDay.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

				const datesWithWeekdays = [];

				// Fill in preceding days with -1, week: -1
				for (let i = 0; i < firstDayOfWeek; i++) {
					datesWithWeekdays.push({
						date: -1,
						week: -1
					});
				}

				// Fill in the actual days of the month
				for (let date = 1; date <= lastDay.getDate(); date++) {
					const currentDay = new Date(year, month, date);
					const dayOfWeek = currentDay.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

					datesWithWeekdays.push({
						date,
						week: dayOfWeek
					});
				}

				return datesWithWeekdays;

			},
			getHeight() {
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
			},
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

<style lang="scss">
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

	.today {
		color: white !important;
		background-color: $primary;
		border-radius: 20rpx;
	}
</style>