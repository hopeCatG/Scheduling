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
						:key="dateIndex" @click="clickDateI(dateI)">
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
		<u-modal :show="show" :title="title"  confirmText='取消'  @confirm='show = false'>
			<view class="app-scroll-x">
				<paiban></paiban>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import paiban from '../../commom/paiban/paiban.vue'
	export default {
		data() {
			return {
				navHeight: 0,
				datesWithWeekdays: [],
				dateArr: [],
				show:false, 
				title:'2023',
				globalData:(getApp()).globalData
			}
		},
		components:{paiban},
		onLoad() {
			this.navHeight = this.globalData.getStatusBarHeight();
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
			},
			// 查看日历某天排版情况
			clickDateI(i){
				this.title = `${this.dateArr[0]}-${this.dateArr[1]}-${i.date}排班详情`;
				this.show = true;
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