// const output = require('../../output.js'); // 删除对 output.js 的引用
// const app = getApp(); // 获取App实例 - 移除顶层的 getApp() 调用

// mock地理编码（真实项目应调用API）
const mockGeo = {
  '奥林匹克公园': {lat: 39.9917, lng: 116.3906},
  '鸟巢': {lat: 39.9929, lng: 116.3967},
  '水立方': {lat: 39.9940, lng: 116.3875},
  '颐和园': {lat: 39.9996, lng: 116.2730},
  '天安门': {lat: 39.9087, lng: 116.3975},
  '故宫': {lat: 39.9163, lng: 116.3972},
  '王府井': {lat: 39.9155, lng: 116.4184},
  '北海公园': {lat: 39.9337, lng: 116.3823},
  '南锣鼓巷': {lat: 39.9375, lng: 116.4039},
  '什刹海': {lat: 39.9405, lng: 116.3877},
  '北京动物园': {lat: 39.9389, lng: 116.3339},
  '中国科技馆': {lat: 40.0006, lng: 116.3975},
  '欢乐谷': {lat: 39.8652, lng: 116.4977}
};

function getLatLng(name) {
  return mockGeo[name] || {lat: 39.9, lng: 116.4}; // 兜底
}

Page({
  data: {
    paths: [],
    currentPathIndex: 0,
    markers: [],
    polylines: [],
    mapScale: 12,
    centerLat: 39.92,
    centerLng: 116.40,
    showPopup: false,
    popupData: {}
  },
  onLoad(query) {
    // 从本地缓存获取推荐结果
    let paths = wx.getStorageSync('recommendationResultForMap') || [];
    // 清空本地缓存，避免数据残留
    wx.removeStorageSync('recommendationResultForMap');

    if (paths.length === 0) {
         console.warn("本地缓存中未找到推荐结果或结果为空");
         wx.showToast({
            title: '未找到路线数据',
            icon: 'none',
            duration: 2000
          });
         setTimeout(() => {
            wx.navigateBack();
         }, 2000);
         return;
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
    paths = normalizeKeys(paths);

    let idx = 0;
    if (query && query.idx !== undefined) {
      idx = parseInt(query.idx) || 0;
    }

    if (idx < 0 || idx >= paths.length) {
        console.error("无效的路线索引: ", idx);
         wx.showToast({
            title: '无效的路线索引',
            icon: 'none',
            duration: 2000
          });
         setTimeout(() => {
            wx.navigateBack();
         }, 2000);
         return;
    }

    this.setData({ paths });
    this.renderRoute(idx);
  },
  renderRoute(idx) {
    const path = this.data.paths[idx];
    if (!path || !path.stops) { // 添加检查，防止 path 或 path.stops 为空
      console.error("Invalid path or stops data for index: ", idx);
      this.setData({ markers: [], polylines: [] }); // 清空地图元素
      return;
    }

    const stops = path.stops.map((stop, i) => {
      const geo = getLatLng(stop.attraction);
      return {
        id: i,
        latitude: geo.lat,
        longitude: geo.lng,
        iconPath: i === 0 ? '/assets/icons/起点.png' : (i === path.stops.length-1 ? '/assets/icons/终点.png' : '/assets/icons/普通点.png'),
        width: 36,
        height: 36,
        callout: { content: stop.attraction, display: 'ALWAYS' },
        stopData: stop // 便于弹窗展示
      };
    });
    const points = stops.map(m => ({latitude: m.latitude, longitude: m.longitude}));

    let polyline = [];
    if (points.length > 1) { // 确保至少有两个点才绘制路线
       polyline = [{
        points,
        color: '#'+Math.floor(Math.random()*16777215).toString(16),
        width: 6,
        dottedLine: false
      }];
    }

    // 取中点居中 (如果points不为空)
    const center = points.length > 0 ? points[Math.floor(points.length/2)] : {latitude:39.92,longitude:116.40};

    this.setData({
      currentPathIndex: idx,
      markers: stops,
      polylines: polyline,
      centerLat: center.latitude,
      centerLng: center.longitude
    });
  },
  onMarkerTap(e) {
    const markerId = e.markerId;
    const marker = this.data.markers.find(m => m.id === markerId);
    if (marker) {
      this.setData({ showPopup: true, popupData: marker.stopData });
    }
  },
  closePopup() {
    this.setData({ showPopup: false });
  },
  goBack() {
    // 使用 navigateBack 返回上一页 (overview)，不清空数据
    wx.navigateBack();
  }
}); 