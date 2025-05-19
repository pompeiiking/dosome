const output = require('../../output.js');

Page({
  data: {
    user: {
      avatar: '/assets/icons/20b1a4d10534ab87f1e6d4db9b5909c.jpg',
      name: 'Ciallo用户'
    },
    paths: [],
    mainPath: null,
    otherPaths: []
  },
  onLoad() {
    const paths = output.paths || [];
    this.setData({
      paths,
      mainPath: paths[0] || null,
      otherPaths: paths.slice(1)
    });
  },
  goToMap(e) {
    const idx = e.currentTarget.dataset.idx;
    wx.navigateTo({
      url: `/pages/map/map?idx=${idx}`
    });
  },
  goHome() {
    wx.clearStorageSync();
    wx.redirectTo({ url: '/pages/index/index' });
  }
}); 