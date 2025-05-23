// const output = require('../../output.js'); // 删除对 output.js 的引用
// const app = getApp(); // 获取App实例 - 移除顶层的 getApp() 调用

Page({
  data: {
    user: {
      avatar: '/assets/icons/20b1a4d10534ab87f1e6d4db9b5909c.jpg',
      name: 'Ciallo用户'
    },
    paths: [],
    mainPath: null,
    otherPaths: []
    // 移除 isLoading 状态
    // isLoading: true // 添加加载状态标志
  },
  onLoad() {
    // 从本地缓存获取推荐结果
    const paths = wx.getStorageSync('recommendationResult') || [];
    // 清空本地缓存，避免数据残留
    wx.removeStorageSync('recommendationResult');

    if (paths.length === 0) {
        console.warn("本地缓存中未找到推荐结果或结果为空");
        // 可以在这里显示"未找到推荐路线"的提示
    }

    // 检查字段风格，全部转为下划线风格
    const normalizeKeys = (obj) => {
      if (Array.isArray(obj)) return obj.map(normalizeKeys);
      if (obj && typeof obj === 'object') {
        const newObj = {};
        Object.keys(obj).forEach(key => {
          let newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
          newObj[newKey] = normalizeKeys(obj[key]);
        });
        return newObj;
      }
      return obj;
    };
    const normalizedPaths = normalizeKeys(paths);

    this.setData({
      paths: normalizedPaths,
      mainPath: normalizedPaths[0] || null,
      otherPaths: normalizedPaths.slice(1)
      // 移除 isLoading 状态设置
      // isLoading: false // 数据加载完毕，隐藏加载状态
    });
  },
  goToMap(e) {
    const idx = e.currentTarget.dataset.idx;
    // 在跳转到 map 页面前，将 paths 再次存储到本地缓存，供 map 页面读取
    wx.setStorageSync('recommendationResultForMap', this.data.paths);
    wx.navigateTo({
      url: `/pages/map/map?idx=${idx}`
    });
  },
  goHome() {
    wx.removeStorageSync('recommendationResult');
    wx.removeStorageSync('recommendationResultForMap');
    wx.redirectTo({ url: '/pages/index/index' });
  }
}); 