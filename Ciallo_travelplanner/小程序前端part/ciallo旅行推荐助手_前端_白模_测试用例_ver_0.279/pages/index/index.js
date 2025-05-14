// 引入请求工具
const request = require('../../utils/request.js')

// 工具函数：标准化key
function normalizeKey(str) {
  return (str || '').replace(/\s+/g, '').replace(/　/g, '').trim();
}

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
            "自然风光": { available_tags: ["山水景观", "森林氧吧", "湖泊河流", "海洋沙滩", "草原牧场", "峡谷地貌", "瀑布温泉", "观景平台"], selected_tags: [], selected_status: {} },
            "历史人文": { available_tags: ["历史古迹", "博物馆", "宗教场所", "文化街区", "传统村落", "名人故居", "考古遗址", "文化展馆"], selected_tags: [], selected_status: {} },
            "美食探店": { available_tags: ["特色小吃", "地方菜系", "网红餐厅", "夜市美食", "农家乐", "美食街", "特色饮品", "传统糕点"], selected_tags: [], selected_status: {} },
            "亲子乐园": { available_tags: ["主题乐园", "动物园", "水族馆", "科技馆", "儿童剧场", "亲子农场", "科普教育", "互动体验"], selected_tags: [], selected_status: {} },
            "冒险运动": { available_tags: ["漂流", "攀岩", "滑翔伞", "潜水", "滑雪", "徒步", "骑行", "极限运动"], selected_tags: [], selected_status: {} },
            "摄影打卡": { available_tags: ["网红景点", "观景台", "特色建筑", "自然景观", "人文景观", "夜景", "日出日落", "特色街区"], selected_tags: [], selected_status: {} },
            "购物休闲": { available_tags: ["购物中心", "特色市场", "免税店", "文创街区", "休闲广场", "特色商店", "手工艺品", "特产购物"], selected_tags: [], selected_status: {} },
            "小众体验": { available_tags: ["当地市集", "手工艺坊", "特色民宿", "文化工作坊", "社区探索", "特色体验", "艺术空间", "创意园区"], selected_tags: [], selected_status: {} }
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
    },
    currentStep: 1,
    maxInterests: 3,
    // 新增：初始化兴趣选项
    preferenceOptions: [
      { label: "自然风光", icon: "/assets/nature.png", selected: false },
      { label: "历史人文", icon: "/assets/history.png", selected: false },
      { label: "美食探店", icon: "/assets/food.png", selected: false },
      { label: "亲子乐园", icon: "/assets/family.png", selected: false },
      { label: "冒险运动", icon: "/assets/adventure.png", selected: false },
      { label: "摄影打卡", icon: "/assets/photo.png", selected: false },
      { label: "购物休闲", icon: "/assets/shopping.png", selected: false },
      { label: "小众体验", icon: "/assets/unique.png", selected: false }
    ]
  },
  onLoad() {
    // 测试连接
    this.testConnection();
    // 只初始化必要字段，绝不覆盖travel_preferences整体
    this.setData({
      'form.preferences.travel_preferences.selected_pace': '',
      'form.preferences.budget.selected_type': '',
      'form.preferences.travel_preferences.selected_interests': []
    });
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
  onStartPointInput(e) {
    this.setData({
      'form.trip_requirements.route_info.start_point': e.detail.value
    });
  },
  onEndPointInput(e) {
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
    this.submitPreferences();
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
    const interestKey = e.detail.interestKey || e.currentTarget.dataset.interest || e.currentTarget.dataset.label;
    const selectedInterests = [...this.data.form.preferences.travel_preferences.selected_interests];
    const index = selectedInterests.indexOf(interestKey);
    if (index === -1) {
      if (selectedInterests.length >= this.data.maxInterests) {
        wx.showToast({ title: `最多选择${this.data.maxInterests}个兴趣`, icon: 'none' });
        return;
      }
      selectedInterests.push(interestKey);
    } else {
      selectedInterests.splice(index, 1);
    }
    this.setData({
      'form.preferences.travel_preferences.selected_interests': selectedInterests
    });
  },
  // 选择活动，支持顺序
  onSelectActivity(e) {
    const { interestKey, activityName, isSelected } = e.detail;
    const interestFeatures = JSON.parse(JSON.stringify(this.data.form.preferences.travel_preferences.interest_features));
    if (!interestFeatures[interestKey]) return;
    // 维护selected_status
    let selectedStatus = interestFeatures[interestKey].selected_status || {};
    if (isSelected) {
      selectedStatus[activityName] = 'selected';
    } else {
      selectedStatus[activityName] = 'unselected';
    }
    interestFeatures[interestKey].selected_status = selectedStatus;
    // 强制selected_tags为数组
    let selectedTags = interestFeatures[interestKey].selected_tags;
    if (!Array.isArray(selectedTags)) {
      if (typeof selectedTags === 'string' && selectedTags.length > 0) {
        selectedTags = selectedTags.split(',');
      } else {
        selectedTags = [];
      }
    }
    selectedTags = Array.isArray(selectedTags) ? selectedTags : [];
    const idx = selectedTags.indexOf(activityName);
    if (isSelected) {
      if (idx === -1) selectedTags.push(activityName);
    } else {
      if (idx !== -1) selectedTags.splice(idx, 1);
    }
    interestFeatures[interestKey].selected_tags = selectedTags;
    // 新增：维护order_map
    let orderMap = {};
    selectedTags.forEach((tag, i) => {
      orderMap[tag] = i + 1;
    });
    interestFeatures[interestKey].order_map = orderMap;
    this.setData({
      'form.preferences.travel_preferences.interest_features': interestFeatures
    });
  },
  onNextStep() {
    // 步骤校验（可根据实际需要细化）
    if (this.data.currentStep === 1) {
      if (!this.data.form.basic_info.traveler_info.name || !this.data.form.basic_info.traveler_info.age) {
        wx.showToast({ title: '请填写完整基本信息', icon: 'none' });
        return;
      }
    }
    if (this.data.currentStep === 2) {
      if (!this.data.form.trip_requirements.route_info.start_point || !this.data.form.trip_requirements.route_info.end_point) {
        wx.showToast({ title: '请填写完整行程信息', icon: 'none' });
        return;
      }
    }
    if (this.data.currentStep === 3) {
      if (this.data.form.preferences.travel_preferences.selected_interests.length === 0) {
        wx.showToast({ title: '请选择至少一个兴趣', icon: 'none' });
        return;
      }
    }
    if (this.data.currentStep < 5) {
      this.setData({ currentStep: this.data.currentStep + 1 });
    }
  },
  onPrevStep() {
    if (this.data.currentStep > 1) {
      this.setData({ currentStep: this.data.currentStep - 1 });
    }
  },
  submitPreferences() {
    if (this.data.currentStep !== 5) {
      wx.showToast({ title: '请先完成所有步骤', icon: 'none' });
      return;
    }
    if (!this.validateForm()) {
      return;
    }

    // 构建最终输出数据：{兴趣: [已选活动顺序]}
    const interest_features = this.data.form.preferences.travel_preferences.interest_features;
    const selected_interests = this.data.form.preferences.travel_preferences.selected_interests;
    const result = {};
    selected_interests.forEach(key => {
      const tags = interest_features[key]?.selected_tags || [];
      if (tags.length > 0) {
        result[key] = [...tags];
      }
    });
    console.log('最终选择结果：', result);

    // 发送数据到后端
    wx.showLoading({
      title: '提交中...'
    });
    request.sendTravelPlan(result)
      .then(res => {
        wx.hideLoading();
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        });
        console.log('后端返回数据：', res);
      })
      .catch(err => {
        wx.hideLoading();
        wx.showToast({
          title: '提交失败',
          icon: 'error'
        });
        console.error('请求失败：', err);
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
  },
  // 输入框内容变化处理函数
  onInputChange(e) {
    const { field } = e.currentTarget.dataset
    const value = e.detail.value
    
    // 更新表单数据
    this.setData({
      [`form.${field}`]: value
    })
  },
  // 测试连接方法
  testConnection() {
    request.sendTravelPlan({
      test: true,
      message: "测试连接"
    }).then(res => {
      console.log('连接成功：', res)
      wx.showToast({
        title: '连接成功',
        icon: 'success'
      })
    }).catch(err => {
      console.error('连接失败：', err)
      wx.showToast({
        title: '连接失败',
        icon: 'error'
      })
    })
  },
  onNameInput(e) {
    this.setData({
      'form.basic_info.traveler_info.name': e.detail.value
    });
  },
  onAgeInput(e) {
    this.setData({
      'form.basic_info.traveler_info.age': e.detail.value
    });
  },
  onSelectPreference(e) {
    const index = e.currentTarget.dataset.index;
    const preferenceOptions = [...this.data.preferenceOptions];
    const selectedCount = preferenceOptions.filter(item => item.selected).length;
    if (!preferenceOptions[index].selected && selectedCount >= this.data.maxInterests) {
      wx.showToast({ title: `最多选择${this.data.maxInterests}个兴趣`, icon: 'none' });
      return;
    }
    preferenceOptions[index].selected = !preferenceOptions[index].selected;
    // 直接用label
    const selected_interests = preferenceOptions.filter(item => item.selected).map(item => item.label);
    const interestFeatures = this.data.form.preferences.travel_preferences.interest_features;
    this.setData({
      preferenceOptions,
      'form.preferences.travel_preferences.selected_interests': selected_interests
    });
  },
  // 选择次级活动（重构后）
  onSelectSubPreference(e) {
    const interest = e.currentTarget.dataset.interest;
    const tag = e.currentTarget.dataset.tag;
    const interestFeatures = { ...this.data.form.preferences.travel_preferences.interest_features };
    if (!interestFeatures[interest]) {
      wx.showToast({ title: '兴趣数据异常', icon: 'none' });
      return;
    }
    let selectedTags = interestFeatures[interest].selected_tags || [];
    selectedTags = Array.isArray(selectedTags) ? [...selectedTags] : [];
    const idx = selectedTags.indexOf(tag);
    if (idx === -1) {
      selectedTags.push(tag);
    } else {
      selectedTags.splice(idx, 1);
    }
    interestFeatures[interest].selected_tags = selectedTags;
    this.setData({
      'form.preferences.travel_preferences.interest_features': interestFeatures
    });
  },
});