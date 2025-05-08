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
          available_pace: ["暴走打卡", "悠闲放松", "混合"],
          interest_features: {
            "自然风光": {
              selected_tags: [],
              available_tags: [
                "山水景观",
                "森林氧吧",
                "湖泊河流",
                "海洋沙滩",
                "草原牧场",
                "峡谷地貌",
                "瀑布温泉",
                "观景平台"
              ]
            },
            "历史人文": {
              selected_tags: [],
              available_tags: [
                "历史古迹",
                "博物馆",
                "宗教场所",
                "文化街区",
                "传统村落",
                "名人故居",
                "考古遗址",
                "文化展馆"
              ]
            },
            "美食探店": {
              selected_tags: [],
              available_tags: [
                "特色小吃",
                "地方菜系",
                "网红餐厅",
                "夜市美食",
                "农家乐",
                "美食街",
                "特色饮品",
                "传统糕点"
              ]
            },
            "亲子乐园": {
              selected_tags: [],
              available_tags: [
                "主题乐园",
                "动物园",
                "水族馆",
                "科技馆",
                "儿童剧场",
                "亲子农场",
                "科普教育",
                "互动体验"
              ]
            },
            "冒险运动": {
              selected_tags: [],
              available_tags: [
                "漂流",
                "攀岩",
                "滑翔伞",
                "潜水",
                "滑雪",
                "徒步",
                "骑行",
                "极限运动"
              ]
            },
            "摄影打卡": {
              selected_tags: [],
              available_tags: [
                "网红景点",
                "观景台",
                "特色建筑",
                "自然景观",
                "人文景观",
                "夜景",
                "日出日落",
                "特色街区"
              ]
            },
            "购物休闲": {
              selected_tags: [],
              available_tags: [
                "购物中心",
                "特色市场",
                "免税店",
                "文创街区",
                "休闲广场",
                "特色商店",
                "手工艺品",
                "特产购物"
              ]
            },
            "小众体验": {
              selected_tags: [],
              available_tags: [
                "当地市集",
                "手工艺坊",
                "特色民宿",
                "文化工作坊",
                "社区探索",
                "特色体验",
                "艺术空间",
                "创意园区"
              ]
            }
          }
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
    },
    maxInterests: 3,
    maxActivities: 5,
    interestStates: {},
    activityStates: {}
  },
  onLoad() {
    // 初始化游玩节奏和预算选择为未选中
    const defaultPace = '';
    const defaultBudget = '';
    
    // 初始化兴趣和活动状态
    const interestStates = {};
    const activityStates = {};
    
    this.data.form.preferences.travel_preferences.available_interests.forEach(interest => {
      interestStates[interest] = false;
      activityStates[interest] = {};
      this.data.form.preferences.travel_preferences.interest_features[interest].available_tags.forEach(activity => {
        activityStates[interest][activity] = false;
      });
    });

    // 设置初始状态（全部未选中）
    this.setData({
      'form.preferences.travel_preferences.selected_pace': defaultPace,
      'form.preferences.budget.selected_type': defaultBudget,
      'form.preferences.travel_preferences.selected_interests': [],
      interestStates,
      activityStates
    });

    // 从本地存储恢复选择状态
    const savedPace = wx.getStorageSync('selectedPace');
    const savedBudget = wx.getStorageSync('selectedBudget');
    const savedInterests = wx.getStorageSync('selectedInterests') || [];
    
    if (savedPace) {
      this.setData({
        'form.preferences.travel_preferences.selected_pace': savedPace
      });
    }
    
    if (savedBudget) {
      this.setData({
        'form.preferences.budget.selected_type': savedBudget
      });
    }

    // 如果有保存的兴趣，恢复其状态
    if (savedInterests.length > 0) {
      savedInterests.forEach(interest => {
        interestStates[interest] = true;
        const savedActivities = wx.getStorageSync(`selectedActivities_${interest}`) || [];
        savedActivities.forEach(activity => {
          activityStates[interest][activity] = true;
        });
      });

      this.setData({
        'form.preferences.travel_preferences.selected_interests': savedInterests,
        interestStates,
        activityStates
      });
    }

    // 添加防抖处理
    this.debouncedToggleInterest = this.debounce(this.toggleInterest, 300);
    this.debouncedToggleActivity = this.debounce(this.toggleActivity, 300);
  },
  onShow() {
    // 从本地存储恢复选择状态
    const savedPace = wx.getStorageSync('selectedPace');
    const savedBudget = wx.getStorageSync('selectedBudget');
    
    if (savedPace) {
      this.setData({
        'form.preferences.travel_preferences.selected_pace': savedPace
      });
    }
    
    if (savedBudget) {
      this.setData({
        'form.preferences.budget.selected_type': savedBudget
      });
    }
  },
  onInputName(e) {
    this.setData({
      'form.basic_info.traveler_info.name': e.detail.value
    });
  },
  onInputAge(e) {
    this.setData({
      'form.basic_info.traveler_info.age': e.detail.value
    });
  },
  onInputCompanions(e) {
    this.setData({
      'form.basic_info.companions.total_number': parseInt(e.detail.value) || 0
    });
  },
  onInputStartPoint(e) {
    this.setData({
      'form.trip_requirements.route_info.start_point': e.detail.value
    });
  },
  onInputEndPoint(e) {
    this.setData({
      'form.trip_requirements.route_info.end_point': e.detail.value
    });
  },
  onStartDateChange(e) {
    this.setData({
      'form.trip_requirements.route_info.date.start': e.detail.value
    });
  },
  onEndDateChange(e) {
    this.setData({
      'form.trip_requirements.route_info.date.end': e.detail.value
    });
  },
  onCheckChange(e) {
    this.setData({
      'form.preferences.travel_preferences.selected_interests': e.detail.value
    });
  },
  onSelectPace(e) {
    const pace = e.currentTarget.dataset.pace;
    this.setData({
      'form.preferences.travel_preferences.selected_pace': pace
    });
    
    // 保存选择状态
    wx.setStorageSync('selectedPace', pace);
    
    wx.showToast({
      title: `已选择${pace}`,
      icon: 'none',
      duration: 1500
    });
  },
  onSelectBudget(e) {
    const budget = e.currentTarget.dataset.budget;
    this.setData({
      'form.preferences.budget.selected_type': budget.type
    });
    
    // 保存选择状态
    wx.setStorageSync('selectedBudget', budget.type);
    
    wx.showToast({
      title: `已选择${budget.type}`,
      icon: 'none',
      duration: 1500
    });
  },
  onInputBlacklist(e) {
    this.setData({
      'form.advanced_options.blacklist': e.detail.value.trim()
    });
  },
  onInputMustVisit(e) {
    this.setData({
      'form.advanced_options.must_visit': e.detail.value.trim()
    });
  },
  onInputVisited(e) {
    this.setData({
      'form.advanced_options.visited_places': e.detail.value.trim()
    });
  },
  onSubmit() {
    wx.showToast({title: '提交成功', icon: 'success'});
    // 这里可以将 this.data.form 发送到后端
  },
  getActivitiesByInterest(interestName) {
    return this.data.form.preferences.travel_preferences.interest_features[interestName]?.available_tags || [];
  },
  isActivitySelected(interestName, activityName) {
    return this.data.form.preferences.travel_preferences.interest_features[interestName]?.selected_tags.includes(activityName) || false;
  },
  // 防抖函数
  debounce(fn, delay) {
    let timer = null;
    return function(...args) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  },
  // 显示选择提示
  showSelectionHint(type, count, max) {
    const hints = {
      interest: `已选择${count}/${max}个兴趣`,
      activity: `已选择${count}/${max}个活动`
    };
    
    wx.showToast({
      title: hints[type],
      icon: 'none',
      duration: 1500
    });
  },
  // 选择兴趣
  onSelectInterest(e) {
    const interest = e.currentTarget.dataset.interest;
    const selectedInterests = [...this.data.form.preferences.travel_preferences.selected_interests];
    const index = selectedInterests.indexOf(interest);
    const interestStates = { ...this.data.interestStates };

    if (index === -1) {
      // 添加兴趣
      if (selectedInterests.length >= this.data.maxInterests) {
        wx.showToast({
          title: `最多选择${this.data.maxInterests}个兴趣`,
          icon: 'none'
        });
        return;
      }
      selectedInterests.push(interest);
      interestStates[interest] = true;
    } else {
      // 移除兴趣
      selectedInterests.splice(index, 1);
      interestStates[interest] = false;
      // 清除该兴趣下的所有已选活动
      const activityStates = { ...this.data.activityStates };
      Object.keys(activityStates[interest]).forEach(activity => {
        activityStates[interest][activity] = false;
      });
      this.setData({ activityStates });
    }

    this.setData({
      'form.preferences.travel_preferences.selected_interests': selectedInterests,
      interestStates
    });

    // 添加触感反馈
    wx.vibrateShort({
      type: 'light'
    }).catch(() => {});
  },

  // 选择活动
  onSelectActivity(e) {
    const { interest, activity } = e.currentTarget.dataset;
    const interestFeatures = { ...this.data.form.preferences.travel_preferences.interest_features };
    const selectedTags = [...interestFeatures[interest].selected_tags];
    const index = selectedTags.indexOf(activity);
    const activityStates = { ...this.data.activityStates };

    if (index === -1) {
      // 添加活动
      if (selectedTags.length >= this.data.maxActivities) {
        wx.showToast({
          title: `每个兴趣最多选择${this.data.maxActivities}个活动`,
          icon: 'none'
        });
        return;
      }
      selectedTags.push(activity);
      activityStates[interest][activity] = true;
    } else {
      // 移除活动
      selectedTags.splice(index, 1);
      activityStates[interest][activity] = false;
    }

    interestFeatures[interest].selected_tags = selectedTags;
    this.setData({
      'form.preferences.travel_preferences.interest_features': interestFeatures,
      activityStates
    });

    // 添加触感反馈
    wx.vibrateShort({
      type: 'light'
    }).catch(() => {});
  },
  submitPreferences() {
    if (!this.validateForm()) {
      return;
    }

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
      ...this.data.form,
      preferences: {
        ...this.data.form.preferences,
        travel_preferences: {
          ...this.data.form.preferences.travel_preferences,
          selected_interests: selectedInterests,
          interest_features: selectedActivities
        }
      }
    };

    console.log('提交的数据：', submitData);

    // 发送数据到后端
    wx.showLoading({
      title: '提交中...'
    });

    wx.request({
      url: 'YOUR_API_ENDPOINT',
      method: 'POST',
      data: submitData,
      success: (res) => {
        wx.hideLoading();
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        });
        console.log('提交成功：', res.data);
      },
      fail: (error) => {
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
          icon: 'error'
        });
        console.error('提交失败：', error);
      }
    });
  },
  // 验证游玩节奏和预算选择
  validatePaceAndBudget() {
    const { form } = this.data;
    const { selected_pace } = form.preferences.travel_preferences;
    const { selected_type } = form.preferences.budget;
    
    if (!selected_pace) {
      wx.showToast({
        title: '请选择游玩节奏',
        icon: 'none'
      });
      return false;
    }
    
    if (!selected_type) {
      wx.showToast({
        title: '请选择预算范围',
        icon: 'none'
      });
      return false;
    }
    
    return true;
  },
  // 添加数据验证函数
  validateForm() {
    const { form } = this.data;
    
    // 验证基本信息
    if (!form.basic_info.traveler_info.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return false;
    }

    if (!form.basic_info.traveler_info.age || form.basic_info.traveler_info.age < 0) {
      wx.showToast({
        title: '请输入有效年龄',
        icon: 'none'
      });
      return false;
    }

    if (!form.basic_info.companions.total_number || form.basic_info.companions.total_number < 0) {
      wx.showToast({
        title: '请输入有效同行人数',
        icon: 'none'
      });
      return false;
    }

    // 验证行程信息
    if (!form.trip_requirements.route_info.start_point) {
      wx.showToast({
        title: '请输入出发地',
        icon: 'none'
      });
      return false;
    }

    if (!form.trip_requirements.route_info.end_point) {
      wx.showToast({
        title: '请输入目的地',
        icon: 'none'
      });
      return false;
    }

    if (!form.trip_requirements.route_info.date.start) {
      wx.showToast({
        title: '请选择开始日期',
        icon: 'none'
      });
      return false;
    }

    if (!form.trip_requirements.route_info.date.end) {
      wx.showToast({
        title: '请选择结束日期',
        icon: 'none'
      });
      return false;
    }

    // 验证日期逻辑
    const startDate = new Date(form.trip_requirements.route_info.date.start);
    const endDate = new Date(form.trip_requirements.route_info.date.end);
    if (endDate < startDate) {
      wx.showToast({
        title: '结束日期不能早于开始日期',
        icon: 'none'
      });
      return false;
    }

    return true;
  }
});