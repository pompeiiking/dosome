const output = require('../../output.js');

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
    const paths = output.paths;
    let idx = 0;
    if (query && query.idx !== undefined) {
      idx = parseInt(query.idx) || 0;
    }
    this.setData({ paths });
    this.renderRoute(idx);
  },
  renderRoute(idx) {
    const path = this.data.paths[idx];
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
    const polyline = [{
      points,
      color: '#'+Math.floor(Math.random()*16777215).toString(16),
      width: 6,
      dottedLine: false
    }];
    // 取中点居中
    const center = points[Math.floor(points.length/2)] || {latitude:39.92,longitude:116.40};
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
    wx.redirectTo({ url: '/pages/overview/overview' });
  }
}); 