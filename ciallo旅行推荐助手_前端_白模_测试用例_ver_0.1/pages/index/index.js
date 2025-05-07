Page({
  data: {
    form: {
      basic_info: {
        traveler_info: { name: '', age: '' },
        companions: { total_number: 0 }
      },
      trip_requirements: {
        route_info: {
          start_point: '',
          end_point: '',
          date: { start: '', end: '' }
        }
      },
      preferences: {
        travel_preferences: {
          selected_interests: [],
          available_interests: [
            "自然风光",
            "历史人文",
            "美食探店",
            "亲子乐园",
            "冒险运动",
            "摄影打卡",
            "购物休闲",
            "小众体验"
          ],
          selected_pace: '',
          available_pace: ["暴走打卡", "悠闲放松", "混合"]
        },
        budget: {
          selected_type: '',
          available_types: [
            { type: "经济型", range: "500元/天内" },
            { type: "舒适型", range: "500-1000元/天" },
            { type: "高端", range: "1000元+/天" }
          ]
        }
      },
      advanced_options: {
        blacklist: '',
        must_visit: '',
        visited_places: ''
      }
    },
    paceIndex: 0,
    budgetIndex: 0
  },
  onLoad() {
    const paceIdx = this.data.form.preferences.travel_preferences.available_pace.indexOf(
      this.data.form.preferences.travel_preferences.selected_pace
    );
    const budgetIdx = this.data.form.preferences.budget.available_types.findIndex(
      item => item.type === this.data.form.preferences.budget.selected_type
    );
    this.setData({
      paceIndex: paceIdx > -1 ? paceIdx : 0,
      budgetIndex: budgetIdx > -1 ? budgetIdx : 0
    });
  },
  onInputName(e) {
    this.setData({'form.basic_info.traveler_info.name': e.detail.value});
  },
  onInputAge(e) {
    this.setData({'form.basic_info.traveler_info.age': e.detail.value});
  },
  onInputCompanions(e) {
    this.setData({'form.basic_info.companions.total_number': e.detail.value});
  },
  onInputStartPoint(e) {
    this.setData({'form.trip_requirements.route_info.start_point': e.detail.value});
  },
  onInputEndPoint(e) {
    this.setData({'form.trip_requirements.route_info.end_point': e.detail.value});
  },
  onStartDateChange(e) {
    this.setData({'form.trip_requirements.route_info.date.start': e.detail.value});
  },
  onEndDateChange(e) {
    this.setData({'form.trip_requirements.route_info.date.end': e.detail.value});
  },
  onCheckChange(e) {
    this.setData({
      'form.preferences.travel_preferences.selected_interests': e.detail.value
    });
  },
  onSelectPace(e) {
    const idx = e.detail.value;
    this.setData({
      paceIndex: idx,
      'form.preferences.travel_preferences.selected_pace': this.data.form.preferences.travel_preferences.available_pace[idx]
    });
  },
  onSelectBudget(e) {
    const idx = e.detail.value;
    this.setData({
      budgetIndex: idx,
      'form.preferences.budget.selected_type': this.data.form.preferences.budget.available_types[idx].type
    });
  },
  onInputBlacklist(e) {
    this.setData({'form.advanced_options.blacklist': e.detail.value});
  },
  onInputMustVisit(e) {
    this.setData({'form.advanced_options.must_visit': e.detail.value});
  },
  onInputVisited(e) {
    this.setData({'form.advanced_options.visited_places': e.detail.value});
  },
  onSubmit() {
    wx.showToast({title: '提交成功', icon: 'success'});
    // 这里可以将 this.data.form 发送到后端
  }
});