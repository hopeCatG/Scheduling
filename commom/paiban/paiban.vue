<template>
	<view class="border-top border-left">
		<view class="margin-bottom-sm">
			<view class="flex align-center">
				<view class="  " style="min-width: 180rpx;">
					<view class="border-bottom border-right padding-sm text-center">
						时间/科室
					</view>
					<view class="border-bottom border-right padding-sm text-center">
						麻醉科
					</view>
				</view> 
				<view class="app-scroll-x">
					<view class="flex align-center ">
						<view class="border-bottom border-right  text-center padding-sm"
							style="min-width: 120rpx;" v-for="(dateTimeI,dateTImeIndex) in 24"
							:key="dateTImeIndex">
							{{dateTimeI < 9 ? '0' + dateTimeI : dateTimeI}}:00
						</view>
					</view>
					<view class="flex align-center">
						<view class="border-bottom border-right  text-center padding-sm"
							style="min-width: 120rpx;" v-for="(dateTimeI,dateTImeIndex) in 24"
							:key="dateTImeIndex"
							@click="changeDay"
							>
							<view class=""> 
								{{dateTImeIndex % 2 == 0 ? '我' : '小明' }}  
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-modal :show="show" :title="title" :content='content' cancelText='取消' :showCancelButton='true' @confirm='confirmFun' @cancel='show = false'></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				title:"",
				content:""
			};
		},
		methods:{
			changeDay(is){
				if (!is) return;
				this.show = true;
				this.title = "要与小明发起互调申请吗？"
				
			},
			confirmFun(){
				this.show = false;
				uni.navigateTo({
					url:'/pages/applyUp/applyUp?type=1',
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
