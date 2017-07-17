import { Promise } from '../../utils/util';
var utils = require('../../utils/util')
/**
 *  查询接口
 */
const API = 'http://japi.zto.cn/zto/api_utf8/baseArea?msg_type=GET_AREA&data=';


Page({
  data: {
    prevProviceId:-1,
    prevCityId:-1  
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
    this.data.prevProviceId = 0
    this.data.prevCityId = 0
    this.setData({
      proviceData: utils.provices,
      cityData: utils.cities['北京'],
      address: utils.cities['北京'][this.data.prevCityId],
      isShow: false, // 显示区域选择框
      showDistrict: false // 默认为省市区三级区域选择
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

    console.log(_data);
    console.log(current_value);
    var procName = utils.provices[current_value[0]]
    console.log(procName);
    if (current_value.length >= 2) {
      if (this.data.prevProviceId !== current_value[0] && 
        this.data.prevCityId === current_value[1]) {
        // 滑动省份
        console.log('滑动省份');
        this.data.prevProviceId = current_value[0]
        this.data.prevCityId = 0;
        this.setData({
          cityData: utils.cities[procName],  
          address: utils.cities[procName][this.data.prevCityId]
        })
      } else if (this.data.prevProviceId === current_value[0] && 
        this.data.prevCityId !== current_value[1]) {
        // 滑动城市
        console.log('滑动城市');
        this.data.prevCityId = current_value[1];
        this.setData({
          address: utils.cities[procName][this.data.prevCityId],
        })
      }
    }
  }
})
