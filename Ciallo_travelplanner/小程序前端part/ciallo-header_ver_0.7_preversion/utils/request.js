// 后端接口基础地址（局域网地址）
const BASE_URL = 'http://192.168.212.252:1099'  // 请替换为您的电脑IP地址和端口
// const app = getApp(); // 获取App实例 - 移除顶层的 getApp() 调用

// 封装请求方法
const request = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中...',
    })
    
    wx.request({
      url: BASE_URL + url,
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        wx.hideLoading()
        if (res.statusCode === 200) {
          // 成功时将后端返回的 paths 存储到本地缓存中，不再存储到全局数据
          if (url === '/api/travel/recommend' && res.data && res.data.paths) {
              wx.setStorageSync('recommendationResult', res.data.paths);
              console.log("推荐结果已存储到本地缓存");
          }
          resolve(res.data)
        } else {
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          })
          reject(res)
        }
      },
      fail: (err) => {
        wx.hideLoading()
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
        reject(err)
      }
    })
  })
}

// 新增：驼峰转下划线工具
function toSnakeCase(obj) {
  if (Array.isArray(obj)) return obj.map(toSnakeCase);
  if (obj && typeof obj === 'object') {
    const newObj = {};
    Object.keys(obj).forEach(key => {
      let newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
      newObj[newKey] = toSnakeCase(obj[key]);
    });
    return newObj;
  }
  return obj;
}

// 导出请求方法
module.exports = {
  // 发送旅行规划请求
  sendTravelPlan: (rawData) => {
    // 工具函数：将字符串、null、undefined、'无'等转为空数组
    const toArray = (val) => {
      if (Array.isArray(val)) return val.filter(v => v && v !== '无');
      if (val === undefined || val === null || val === '' || val === '无') return [];
      return [val];
    };
    // 新增：精简映射函数，去除所有available_xxx、展示用、冗余字段
    const extractUserInput = (form) => {
      return {
        start: form.trip_requirements?.route_info?.start_point || '',
        end: form.trip_requirements?.route_info?.end_point || '',
        travelDate: form.trip_requirements?.route_info?.date?.start || '',
        bigPrefs: form.preferences?.travel_preferences?.selected_interests || [],
        smallPrefs: form.preferences?.travel_preferences?.activities_map || {},
        pace: form.preferences?.travel_preferences?.selected_pace || '',
        budgetType: form.preferences?.budget?.selected_type || '',
        mustVisit: toArray(form.advanced_options?.must_visit),
        blacklist: toArray(form.advanced_options?.blacklist),
        visited: toArray(form.advanced_options?.visited_places),
        targetPlaces: [] // 如有需要可补充
      };
    };
    // 只提取有用字段
    const userInput = extractUserInput(rawData);
    // 输出最终传输数据，便于调试
    console.log('[sendTravelPlan] 传输到后端的数据:', JSON.stringify(userInput, null, 2));
    // 发送前自动转为下划线风格
    return request('/api/travel/recommend', toSnakeCase(userInput));
  }
} 