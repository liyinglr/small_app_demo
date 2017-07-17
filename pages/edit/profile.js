// pages/edit/profile.js
var utils = require('../../utils/util')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    errorMessage:"",
    Boxes: ["Hyblum"],
    boxIndex: 0,
    cities:["苏州","上海"]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.prevProviceId = 0
    this.data.prevCityId = 0
    var proviceName = '北京'
    var cityName = "北京"
    var cityId = this.data.prevCityId
    var _that = this
    wx.getLocation({
      complete: function(res) {
        // 根据位置设置picker-view的默认项
        console.log(res)
        if(res.errMsg.includes('ok')){
          proviceName = '江苏'
          cityName = "苏州"
        }
        cityId = utils.cities[proviceName].indexOf(cityName)
        _that.setData({
          proviceData: utils.provices,
          cityData: utils.cities[proviceName],
          address: utils.cities[proviceName][cityId],
          isShow: false, // 显示区域选择框
          showDistrict: false // 默认为省市区三级区域选择
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //form sumbnit function
  formSubmit: function(e){
    var detail = e.detail.value
    if(detail.userNick == ""){
      this.setData({
        errorMessage:"请输入用户名"
      })
      this.ohShitfadeOut()
      return
    }
    console.log(e.detail.value)
  },
  ohShitfadeOut() {
    var fadeOutTimeout = setTimeout(() => {
      this.setData({ errorMessage: '' });
      clearTimeout(fadeOutTimeout);
    }, 2000);
  },
  /**
   * 页面选址触发事件
   */
  choosearea: function () {
    this.setData({
      isShow: !this.data.isShow
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
    console.log(utils.cities[procName]);
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