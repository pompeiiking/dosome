// 后端接口基础地址（局域网地址）
const BASE_URL = 'http://localhost:1099'  // 请替换为您的电脑IP地址和端口

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

// 导出请求方法
module.exports = {
  // 发送旅行规划请求
  sendTravelPlan: (data) => {
    return request('/api/recommend', data)
  }
} 