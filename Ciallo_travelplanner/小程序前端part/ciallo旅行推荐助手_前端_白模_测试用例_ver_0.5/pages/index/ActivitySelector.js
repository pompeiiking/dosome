// ActivitySelector 组件：用于展示并选择某兴趣下的活动（多选，带顺序）
Component({
  // 组件属性声明
  properties: {
    // 当前兴趣的key（如"摄影打卡"）
    interestKey: {
      type: String,
      value: ''
    },
    // 所有兴趣及其活动的特征对象（包含已选活动）
    interestFeatures: {
      type: Object,
      value: {}
    }
  },
  methods: {
    /**
     * 活动卡片点击事件
     * @param {Object} e - 事件对象，包含被点击的活动名称
     * 逻辑：
     *   1. 判断当前活动是否已被选中（selectedTags中是否包含activityName）
     *   2. 若未选中，则触发选中事件（isSelected: true，顺序为末尾）
     *   3. 若已选中，则触发取消选中事件（isSelected: false，顺序为当前索引+1）
     *   4. 控制台输出调试信息，便于排查数据流
     */
    onSelect(e) {
      // 获取被点击的活动名称
      const activityName = e.currentTarget.dataset.activity;
      // 获取当前兴趣下已选中的活动数组
      const selectedTags = this.data.interestFeatures[this.data.interestKey]?.selected_tags || [];
      // 判断当前活动在已选数组中的索引
      const idx = selectedTags.indexOf(activityName);
      // 是否已选中
      const isSelected = idx !== -1;
      if (!isSelected) {
        // 未选中：触发选中事件，order为新顺序
        this.triggerEvent('selectActivity', {
          interestKey: this.data.interestKey,
          activityName,
          isSelected: true,
          order: selectedTags.length + 1
        });
      } else {
        // 已选中：触发取消选中事件，order为当前顺序
        this.triggerEvent('selectActivity', {
          interestKey: this.data.interestKey,
          activityName,
          isSelected: false,
          order: idx + 1
        });
      }
    }
  }
}); 