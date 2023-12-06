import request from "./request";
import app from '../App.vue'
// 全局配置的请求域名

// let baseUrl = 'https://api.svipershop.com/api/';
let baseUrl = 'http://36.134.163.172:9012/api/';

//可以new多个request来支持多个域名请求
let $http = new request({
	//接口请求地址
	baseUrl: baseUrl,

	//服务器本地上传文件地址
	fileUrl: baseUrl,
	// 服务器上传图片默认url
	defaultUploadUrl: "api/common/v1/upload_image",
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	header: {
		'content-type': 'application/json;charset=UTF-8'
	},
	// 请求超时时间（默认6000）
	timeout: 6000,
	// 默认配置（可不写）
	config: {
		// 是否自动提示错误
		isPrompt: true,
		// 是否显示加载动画
		load: true,
		// 是否使用数据工厂
		isFactory: true
	}
});

// 添加获取七牛云token的方法
$http.getQnToken = function(callback) {
	//该地址需要开发者自行配置（每个后台的接口风格都不一样）
	$http.get("api/kemean/aid/qn_upload").then(data => {
		/*
		 *接口返回参数：
		 *visitPrefix:访问文件的域名
		 *token:七牛云上传token
		 *folderPath:上传的文件夹
		 *region: 地区 默认为：SCN
		 */
		callback({
			visitPrefix: data.visitPrefix,
			token: data.token,
			folderPath: data.folderPath,
			region: "SCN"
		});
	});
}

//当前接口请求数
let requestNum = 0;
//请求开始拦截器
$http.requestStart = function(options) {
	// 图片上传大小限制
	if (options.method == "FILE" && options.maxSize) {
		// 文件最大字节: options.maxSize 可以在调用方法的时候加入参数
		const maxSize = options.maxSize;
		for (let item of options.files) {
			if (item.size > maxSize) {
				setTimeout(() => {
					uni.showToast({
						title: "图片过大，请重新上传",
						icon: "none"
					});
				}, 500);
				return false;
			}
		}
	}
	let locale = uni.getStorageSync('locale');
	let token = uni.getStorageSync('token');
	// let token = '0a7129d1-dcca-40b6-a3c8-2463796ed307';
	//请求前加入
	if (locale) {
		options.header['Accept-Language'] = locale;
	}
	if (token) {
		options.header['Token'] = token;
	}
	return options; // return false 表示请求拦截，不会继续请求
}
//请求结束


//所有接口数据处理（可在接口里设置不调用此方法）
//此方法需要开发者根据各自的接口返回类型修改，以下只是模板
$http.dataFactory = async function(res) {
	console.log('resresresresresresres');
	console.log(res);
	// console.log("接口请求数据", {
	// 	url: res.url,
	// 	resolve: res.response,
	// 	header: res.header,
	// 	data: res.data,
	// 	method: res.method,
	// });
	if (res.response.statusCode && res.response.statusCode == 200) {
		let httpData = res.response.data;
		/*********以下只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/
		//判断数据是否请求成功
		if (httpData.success || httpData.code == 1 || httpData.code == 200) {
			// 返回正确的结果(then接受数据)
			return Promise.resolve(httpData.data);
		} else if (httpData.code == 500) {
			uni.showToast({
				title: httpData.msg, // 重点------把接口返回的错误抛出显示
				icon: "none"
			});
			// 返回错误的结果(catch接受数据)
			return Promise.reject(httpData.data);
		} else if (httpData.code == 401) {
			uni.showToast({
				title: httpData.msg, // 重点------把接口返回的错误抛出显示
				icon: "none"
			});
			// 返回错误的结果(catch接受数据)
			return Promise.reject(httpData.data);
		} else { //其他错误提示
			uni.showToast({
				title: httpData.msg, // 重点------把接口返回的错误抛出显示
				icon: "none"
			});
			return Promise.resolve(httpData.nessage);
		}

		/*********以上只是模板(及共参考)，需要开发者根据各自的接口返回类型修改*********/
	} else {
		// 返回错误的结果(catch接受数据)
		return Promise.reject({
			statusCode: res.response.statusCode,
			errMsg: "【request】数据工厂验证不通过"
		});
	}
};
// 错误回调
$http.requestError = function(e) {
	// e.statusCode === 0 是参数效验错误抛出的
	if (e.statusCode === 0) {
		throw e;
	} else if (e.statusCode === 401) {
		uni.showToast({
			title: "login error！",
			icon: "none"
		});
	}else {
		uni.showToast({
			title: "网络错误，请检查一下网络",
			icon: "none"
		});
	}
}
export default $http;
