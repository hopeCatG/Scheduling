<template>
	<view class="padding-sm">
		<view class="bg-white  padding-sm  radius-20 shadow margin-bottom-sm">
			<view class="text-sm " style="color: #999999;">
				2023-12-04
			</view>
			<view class="flex  " >
				<view class="" style="flex: 1;">
					麻醉科小明向你发起互调排班
				</view>
				
				<view class="">
					<u-tag text="去处理" plain shape="circle" @click="goWhere('/pages/applyEdit/applyEdit?type=1')"></u-tag>
				</view>
			</view>
		</view>
		
		<view class="bg-white  padding-sm  radius-20 shadow margin-bottom-sm">
			<view class="text-sm " style="color: #999999;">
				2023-12-04
			</view>
			<view class="flex  " >
				<view class="" style="flex: 1;">
					你向麻醉科小明发起的互调排班对方已同意
				</view>
				
				<view class="">
					<u-tag text="查看" plain shape="circle" @click="goWhere('/pages/applyEdit/applyEdit?type=1')"></u-tag>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goWhere(url){
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style>

</style>
