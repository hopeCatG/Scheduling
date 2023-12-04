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
				<view class="flex padding-lr-sm justify-between u-border radius padding-xs" style="flex: 1;"
					>
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
					<u--textarea v-model="content" placeholder="请输入申请原因" ></u--textarea>
				</view>
			</view>
			<u-datetime-picker :show="show_datetime" v-model="value_datetime" mode="time"
				@confirm='confirm_datetime'></u-datetime-picker>
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
				radiovalue1: '互调',
				value_datetime:'',
				show_datetime:false,
				IntermodulationObj:{ //互调参数
					myDate1:'00:00',
					myDate2:'00:00',
					youDate1:'00:00',
					youDate2:'00:00',
					content:''
				},
				youName:'小明',
				value:'myDate1'
			}
		},
		onLoad(options) {
			this.type = options.type;
			switch (options.type) {
				case '2':
					this.radiolist1 = [{
						name: '调休',
						disabled: false
					}]
					this.radiovalue1 = '调休'
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
						name: '调休',
						disabled: false
					}]

			}
			console.log(options.type)
		},
		methods: {
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
			changeTime(e){
				this.value = e;
				this.show_datetime = true;
			}
		}
	}
</script>

<style>

</style>