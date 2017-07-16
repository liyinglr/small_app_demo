import { Promise } from '../../utils/util';
var utils = require('../../utils/util')
/**
 *  查询接口
 */
const API = 'http://japi.zto.cn/zto/api_utf8/baseArea?msg_type=GET_AREA&data=';


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
    this.setData({
      proviceData: utils.provices,
      cityData: utils.cities['北京'],
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

    console.log(current_value);
    console.log(this.data.value)
    if (current_value.length >= 2) {
      if (this.data.value[0] !== current_value[0] && 
        this.data.value[1] === current_value[1]) {
        // 滑动省份
        console.log(current_value[0]);
        var procName = utils.provices[current_value[0]]
        console.log(procName);
        this.setData({
          cityData: utils.cities[procName],  
        })
      } else if (this.data.value[0] === current_value[0] && 
      this.data.value[1] !== current_value[1]) {
        // 滑动城市
        Promise(wx.request, {
          url: API + _data.cityData[current_value[1]].code,
          method: 'GET'
        }).then((district) => {
          if (district.data.result.length > 0) {
            this.addDot(district.data.result);
            this.setData({
              districtData: district.data.result,
              'value[0]': current_value[0],
              'value[1]': current_value[1],
              'value[2]': 0,
              address: this.data.proviceData[current_value[0]].fullName + ' - ' + this.data.cityData[current_value[1]].fullName + ' - ' + district.data.result[0].fullName
            })
          }
        }).catch((e) => {
          console.log(e);
        })

      }
    }
  }
})
