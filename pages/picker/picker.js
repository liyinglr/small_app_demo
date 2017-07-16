//wx_selectArea-master
var utils = require('../../utils/util')

Page({
  data: {

  },

  addDot: function (arr) {
    if (arr instanceof Array) {
      arr.map(val => {
        if (val.fullName.length > 4) {
          val.fullNameDot = val.fullName.slice(0, 4) + '...';
          return val;
        } else {
          val.fullNameDot = val.fullName;
          return val;
        }
      })
    }
  },
  /**
   * 初始化区域数据
   */
  onLoad: function () {
    console.log(utils.provices)
    this.setData({
      isShow: false, // 显示区域选择框
      showDistrict: false, // 默认为省市区三级区域选择
      proviceData: utils.provices,
      cityData: utils.cities['北京']
    });
  },
  /**
   * 页面选址触发事件
   */
  choosearea: function () {
    this.setData({
      isShow: true
    })
  },
  /**
   * 滑动事件
   */
  bindChange: function (e) {
    var current_value = e.detail.value, _data = this.data;
    console.log(current_value);
    if (current_value.length < 2)
      return
    var provId = current_value[0]
  }
})
