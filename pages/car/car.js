const api = require("../../config/api")

// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    carList: [],
    total: '',
    count:[],
    countIndex:"",
    imageList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
        id:options.detail
    })
    wx.request({
      url: api.GetCarInfo + this.data.id,
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      header: {
        "Authorization": wx.getStorageSync('token'),
      },
      success: (res) => {
        console.log(res)
        this.setData({
          carList: res.data.data.item,
          total: res.data.data.total,
        })
      }
    })
  },

  nobindCar: function (e) {
    var index = e.currentTarget.dataset.id
    wx.request({
      url: api.NoBindCar + index,
      method: 'GET',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        if (res.data.status == 200) {
          wx.showToast({
            title: '解绑成功',
            icon: 'success',
          })
          this.onLoad()
        } else {
          wx.showToast({
            title: '解绑失败',
            icon: "none"
          })
        }
      }
    })

  },
  
  send_car:function(e){
    console.log("ssss")
    console.log(this.data.id)
    wx.navigateTo({
      url: '/pages/bindCar/bindCar?detail='+ this.data.id,
    })
  },
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

  }
})