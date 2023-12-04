<template>
	<view class="padding-sm bg-white bg-height flex flex-direction justify-between">
		<!-- 	<view class="text-xl text-center text-bold">
			发起调班申请
		</view> -->
		<view class="aaa">
			<view class="flex margin-bottom-sm">
				<view class="text-sm">
					申请类型：
				</view>
				<u-radio-group v-model="radiovalue1" placement="column" @change="groupChange">
					<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in radiolist1" :key="index"
						:label="item.name" :name="item.name" @change="radioChange">
					</u-radio>
				</u-radio-group>
			</view>

			<!-- 互调 -->
			<view class="" v-if="radiovalue1 == '互调'">
				<view class="flex margin-bottom-sm">
					<view class="text-sm">
						调休时间段：
					</view>
					<view class="flex align-center" style="flex: 1;">
						<view class="flex padding-lr-sm justify-between u-border radius padding-xs" style="flex: 1;"
							@click="changeTime('myDate1')">
							<div>{{IntermodulationObj.myDate1}}</div>
							<u-icon name="calendar" color="#909399"></u-icon>
						</view>
						<view class="padding-lr-sm">
							-
						</view>
						<view class="flex padding-lr-sm justify-between u-border radius padding-xs" style="flex: 1;"
							@click="changeTime('myDate2')">

							<div>{{IntermodulationObj.myDate2}}</div>
							<u-icon name="calendar" color="#909399"></u-icon>
						</view>
					</view>
				</view>


				<view class="flex margin-bottom-sm align-center">
					<view class="text-sm ">
						对方姓名：
					</view>
					<view class="flex padding-lr-sm justify-between u-border radius padding-xs" style="flex: 1;">
						<div>{{youName}}</div>
					</view>
				</view>

				<view class="flex margin-bottom-sm">
					<view class="text-sm">
						对方时间段：
					</view>
					<view class="flex align-center" style="flex: 1;">
						<view class="flex padding-lr-sm justify-between u-border radius padding-xs" style="flex: 1;"
							@click="changeTime('youDate1')">
							<div>{{IntermodulationObj.youDate1}}</div>
							<u-icon name="calendar" color="#909399"></u-icon>
						</view>
						<view class="padding-lr-sm">
							-
						</view>
						<view class="flex padding-lr-sm justify-between u-border radius padding-xs" style="flex: 1;"
							@click="changeTime('youDate2')">

							<div>{{IntermodulationObj.youDate2}}</div>
							<u-icon name="calendar" color="#909399"></u-icon>
						</view>
					</view>
				</view>

				<view class="flex margin-bottom-sm">
					<view class="text-sm">
						申请原因：
					</view>
					<view class="flex align-center" style="flex: 1;">
						<u--textarea v-model="IntermodulationObj.content" placeholder="请输入申请原因"></u--textarea>
					</view>
				</view>
				<u-datetime-picker :show="show_datetime" v-model="value_datetime" mode="time"
					@confirm='confirm_datetime'></u-datetime-picker>
			</view>
			<!-- 公休 -->
			<view v-else>
				<view class="flex margin-bottom-sm align-center">
					<view class="text-sm">
						开始时间：
					</view>
					<view class="flex align-center" style="flex: 1;">
						<view class="flex padding-lr-sm justify-between u-border radius padding-xs" style="flex: 1;"
							@click="change_show_date('stateDate')">
							<div>{{ClosedObj.stateDate}}</div>
							<u-icon name="calendar" color="#909399"></u-icon>
						</view>
						<view class="flex padding-lr-sm justify-between u-border radius padding-xs margin-left-sm" style="width: 100rpx;"
							@click="change_show_picker('stateWhen')">
							<div>{{ClosedObj.stateWhen}}</div>
						</view>
					</view>
				</view>
				<view class="flex margin-bottom-sm align-center">
					<view class="text-sm">
						结束时间：
					</view>
					<view class="flex align-center" style="flex: 1;">
						<view class="flex padding-lr-sm justify-between u-border radius padding-xs" style="flex: 1;"
							@click="change_show_date('endDate')">
							<div>{{ClosedObj.endDate}}</div>
							<u-icon name="calendar" color="#909399"></u-icon>
						</view>
						<view class="flex padding-lr-sm justify-between u-border radius padding-xs margin-left-sm" style="width: 100rpx;"
							@click="change_show_picker('endWhen')">
							<div>{{ClosedObj.endWhen}}</div>
						</view>
					</view>
				</view>
				<view class="flex margin-bottom-sm align-center">
					<view class="text-sm">
						请假时长：
					</view>
					<view class="flex align-center" style="flex: 1;">
						<view class="text-center padding-lr-sm u-border radius padding-xs" >
							{{ClosedObj.duration}}
						</view>
						<span class="text-xs margin-left-sm">时长自动计算</span>
					</view>
				</view>
				<view class="flex margin-bottom-sm">
					<view class="text-sm">
						申请原因：
					</view>
					<view class="flex align-center" style="flex: 1;">
						<u--textarea v-model="ClosedObj.content" placeholder="请输入申请原因"></u--textarea>
					</view>
				</view>
				<u-datetime-picker :show="show_datetime" v-model="value_datetime" mode="time"
					@confirm='confirm_datetime' @cancel='show_datetime = false'></u-datetime-picker>
				<u-datetime-picker :show="show_date" v-model="value_datetime" mode="date"
					@confirm='confirm_date' @cancel='show_date = false'></u-datetime-picker>
				<u-picker :show="show_picker" :columns="columns" @confirm='confirmPicker' @cancel='show_picker = false'></u-picker>
			</view>
		</view>

		<view class="padding-bottom-sm">
			<u-button type="primary" text="确定"></u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: -1, //申请类型
				radiolist1: [],
				columns: [
					['上午', '下午']
				],
				radiovalue1: '互调',
				value_datetime: '',
				show_datetime: false,
				show_date: false,
				show_picker: false,
				
				IntermodulationObj: { //互调参数
					myDate1: '00:00',
					myDate2: '00:00',
					youDate1: '00:00',
					youDate2: '00:00',
					content: ''
				},
				ClosedObj: { //公休参数
					stateDate: "",
					stateWhen:'上午',
					endDate: "",
					endWhen:'上午',
					duration:0,
					content: ''
				},
				youName: '小明',
				value: 'myDate1'
			}
		},
		onLoad(options) {
			this.type = options.type;
			switch (options.type) {
				case '2':
					this.radiolist1 = [{
						name: '公休',
						disabled: false
					}]
					this.radiovalue1 = '公休'
					break;
				case '1':
					this.radiolist1 = [{
						name: '互调',
						disabled: false
					}]
					this.radiovalue1 = '互调'
					break;
				default:
					this.radiolist1 = [{
						name: '互调',
						disabled: false
					}, {
						name: '公休',
						disabled: false
					}]

			}
			console.log(options.type)
		},
		methods: {
			formattedDate(value_datetime) {
				const date = new Date(value_datetime);
				const year = date.getFullYear();
				const month = String(date.getMonth() + 1).padStart(2, '0');
				const day = String(date.getDate()).padStart(2, '0');
				return `${year}-${month}-${day}`;
			},
			groupChange(n) {
				console.log('groupChange', n);
			},
			radioChange(n) {
				console.log('radioChange', n);
			},
			confirm_datetime(e) {
				this['IntermodulationObj'][this.value] = e.value
				this.show_datetime = false;
			},
			confirm_date(e,name) {
				this.show_date = false;
				this.ClosedObj[this.value] = this.formattedDate(e.value);
			},
			changeTime(e) {
				this.value = e;
				this.show_datetime = true;
			},
			confirmPicker(e){
				this.ClosedObj[this.value] = e.value[0];
				this.show_picker = false;
			},
			change_show_date(e){
				this.value = e;
				this.show_date = true;
			},
			change_show_picker(e){
				this.value = e;
				this.show_picker = true;
			}
		}
	}
</script>

<style>

</style>