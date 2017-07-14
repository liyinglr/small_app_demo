//app.js
App({
  onLaunch: function() {
    wx.login({
      success:function(res){
        console.log(res)
        // var js_code = res.code
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session',
        //   data:{
        //     "appid":"wx0c9f0fefada9be85",
        //     "secret":"",
        //     "js_code":js_code,
        //     "grant_type":"authorization_code"
        //   },
        //   success: function (e) {
        //     console.log(e)
        //   }
        // })
      }
    })
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
