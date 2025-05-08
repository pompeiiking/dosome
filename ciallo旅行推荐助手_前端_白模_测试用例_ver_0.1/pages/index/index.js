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
    budgetIndex: 0,
    interests: [
      { name: '自然风光', selected: false, order: 0 },
      { name: '历史人文', selected: false, order: 0 },
      { name: '美食探店', selected: false, order: 0 },
      { name: '亲子乐园', selected: false, order: 0 },
      { name: '冒险运动', selected: false, order: 0 },
      { name: '摄影打卡', selected: false, order: 0 },
      { name: '购物休闲', selected: false, order: 0 },
      { name: '小众体验', selected: false, order: 0 }
    ],
    activitiesMap: {
      '自然风光': [
        { name: '山水景观', selected: false, order: 0 },
        { name: '森林氧吧', selected: false, order: 0 },
        { name: '湖泊河流', selected: false, order: 0 },
        { name: '海洋沙滩', selected: false, order: 0 },
        { name: '草原牧场', selected: false, order: 0 },
        { name: '峡谷地貌', selected: false, order: 0 },
        { name: '瀑布温泉', selected: false, order: 0 },
        { name: '观景平台', selected: false, order: 0 }
      ],
      '历史人文': [
        { name: '历史古迹', selected: false, order: 0 },
        { name: '博物馆', selected: false, order: 0 },
        { name: '宗教场所', selected: false, order: 0 },
        { name: '文化街区', selected: false, order: 0 },
        { name: '传统村落', selected: false, order: 0 },
        { name: '名人故居', selected: false, order: 0 },
        { name: '考古遗址', selected: false, order: 0 },
        { name: '文化展馆', selected: false, order: 0 }
      ],
      '美食探店': [
        { name: '特色小吃', selected: false, order: 0 },
        { name: '地方菜系', selected: false, order: 0 },
        { name: '网红餐厅', selected: false, order: 0 },
        { name: '夜市美食', selected: false, order: 0 },
        { name: '农家乐', selected: false, order: 0 },
        { name: '美食街', selected: false, order: 0 },
        { name: '特色饮品', selected: false, order: 0 },
        { name: '传统糕点', selected: false, order: 0 }
      ],
      '亲子乐园': [
        { name: '主题乐园', selected: false, order: 0 },
        { name: '动物园', selected: false, order: 0 },
        { name: '水族馆', selected: false, order: 0 },
        { name: '科技馆', selected: false, order: 0 },
        { name: '儿童剧场', selected: false, order: 0 },
        { name: '亲子农场', selected: false, order: 0 },
        { name: '科普教育', selected: false, order: 0 },
        { name: '互动体验', selected: false, order: 0 }
      ],
      '冒险运动': [
        { name: '漂流', selected: false, order: 0 },
        { name: '攀岩', selected: false, order: 0 },
        { name: '滑翔伞', selected: false, order: 0 },
        { name: '潜水', selected: false, order: 0 },
        { name: '滑雪', selected: false, order: 0 },
        { name: '徒步', selected: false, order: 0 },
        { name: '骑行', selected: false, order: 0 },
        { name: '极限运动', selected: false, order: 0 }
      ],
      '摄影打卡': [
        { name: '网红景点', selected: false, order: 0 },
        { name: '观景台', selected: false, order: 0 },
        { name: '特色建筑', selected: false, order: 0 },
        { name: '自然景观', selected: false, order: 0 },
        { name: '人文景观', selected: false, order: 0 },
        { name: '夜景', selected: false, order: 0 },
        { name: '日出日落', selected: false, order: 0 },
        { name: '特色街区', selected: false, order: 0 }
      ],
      '购物休闲': [
        { name: '购物中心', selected: false, order: 0 },
        { name: '特色市场', selected: false, order: 0 },
        { name: '免税店', selected: false, order: 0 },
        { name: '文创街区', selected: false, order: 0 },
        { name: '休闲广场', selected: false, order: 0 },
        { name: '特色商店', selected: false, order: 0 },
        { name: '手工艺品', selected: false, order: 0 },
        { name: '特产购物', selected: false, order: 0 }
      ],
      '小众体验': [
        { name: '当地市集', selected: false, order: 0 },
        { name: '手工艺坊', selected: false, order: 0 },
        { name: '特色民宿', selected: false, order: 0 },
        { name: '文化工作坊', selected: false, order: 0 },
        { name: '社区探索', selected: false, order: 0 },
        { name: '特色体验', selected: false, order: 0 },
        { name: '艺术空间', selected: false, order: 0 },
        { name: '创意园区', selected: false, order: 0 }
      ]
    }
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
  },
  getActivitiesByInterest(interestName) {
    return this.data.activitiesMap[interestName] || [];
  },
  toggleInterest(e) {
    const index = e.currentTarget.dataset.index;
    const interests = this.data.interests;
    
    if (!interests[index].selected) {
      // 如果是选中，设置顺序为当前选中项的最大顺序+1
      const selectedItems = interests.filter(i => i.selected);
      const maxOrder = selectedItems.length > 0 
        ? Math.max(...selectedItems.map(i => i.order))
        : 0;
      interests[index].order = maxOrder + 1;
    }
    
    interests[index].selected = !interests[index].selected;
    
    if (!interests[index].selected) {
      // 如果是取消选中，重新排序其他选中项
      const selectedItems = interests.filter(i => i.selected);
      selectedItems.sort((a, b) => a.order - b.order);
      selectedItems.forEach((item, idx) => {
        item.order = idx + 1;
      });
      
      // 清空该兴趣下的所有选中状态
      const activitiesMap = this.data.activitiesMap;
      const activities = activitiesMap[interests[index].name];
      if (activities) {
        activities.forEach(activity => {
          activity.selected = false;
          activity.order = 0;
        });
      }
      this.setData({ activitiesMap });
    }
    
    this.setData({ interests });
  },
  toggleActivity(e) {
    const { category, activity } = e.currentTarget.dataset;
    const activitiesMap = this.data.activitiesMap;
    const activities = activitiesMap[category];
    const activityIndex = activities.findIndex(a => a.name === activity.name);
    
    if (!activities[activityIndex].selected) {
      // 如果是选中，设置顺序为当前选中项的最大顺序+1
      const selectedItems = activities.filter(a => a.selected);
      const maxOrder = selectedItems.length > 0
        ? Math.max(...selectedItems.map(a => a.order))
        : 0;
      activities[activityIndex].order = maxOrder + 1;
    }
    
    activities[activityIndex].selected = !activities[activityIndex].selected;
    
    if (!activities[activityIndex].selected) {
      // 如果是取消选中，重新排序其他选中项
      const selectedItems = activities.filter(a => a.selected);
      selectedItems.sort((a, b) => a.order - b.order);
      selectedItems.forEach((item, idx) => {
        item.order = idx + 1;
      });
    }
    
    this.setData({ activitiesMap });
  },
  submitPreferences() {
    // 获取选中的兴趣（按顺序）
    const selectedInterests = this.data.interests
      .filter(item => item.selected)
      .sort((a, b) => a.order - b.order)
      .map(item => item.name);

    // 获取选中的活动（按类别和顺序）
    const selectedActivities = {};
    selectedInterests.forEach(interest => {
      const activities = this.data.activitiesMap[interest];
      const selected = activities
        .filter(activity => activity.selected)
        .sort((a, b) => a.order - b.order)
        .map(activity => activity.name);
      if (selected.length > 0) {
        selectedActivities[interest] = selected;
      }
    });

    // 构建提交数据
    const submitData = {
      basic_info: {
        traveler_info: {
          name: this.data.form.basic_info.traveler_info.name,
          age: this.data.form.basic_info.traveler_info.age
        },
        companions: {
          total_number: this.data.form.basic_info.companions.total_number
        }
      },
      trip_requirements: {
        route_info: {
          start_point: this.data.form.trip_requirements.route_info.start_point,
          end_point: this.data.form.trip_requirements.route_info.end_point,
          date: {
            start: this.data.form.trip_requirements.route_info.date.start,
            end: this.data.form.trip_requirements.route_info.date.end
          }
        }
      },
      preferences: {
        travel_preferences: {
          selected_interests: selectedInterests,
          selected_pace: this.data.form.preferences.travel_preferences.selected_pace,
          interest_features: selectedActivities
        },
        budget: {
          selected_type: this.data.form.preferences.budget.selected_type
        }
      },
      advanced_options: {
        blacklist: this.data.form.advanced_options.blacklist,
        must_visit: this.data.form.advanced_options.must_visit,
        visited_places: this.data.form.advanced_options.visited_places
      }
    };

    console.log('提交的数据：', submitData);

    // 发送数据到后端
    wx.request({
      url: 'YOUR_API_ENDPOINT',
      method: 'POST',
      data: submitData,
      success: (res) => {
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        });
        console.log('提交成功：', res.data);
      },
      fail: (error) => {
        wx.showToast({
          title: '提交失败',
          icon: 'error'
        });
        console.error('提交失败：', error);
      }
    });
  }
});