// pages/incharge/incharge.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [{
        "site": "福州大学31-33h栋4号电站",
        "use": "7使用/8插座",
        "array": [
          // {
          // "site": "插座1",
          // "status": "占用"
        // },
        {
          "site": "插座2",
          "status": "空闲"
        },
        // {
        //   "site": "插座3",
        //   "status": "占用"
        // },
        // {
        //   "site": "插座4",
        //   "status": "占用"
        // },
        // {
        //   "site": "插座5",
        //   "status": "占用"
        // },
        // {
        //   "site": "插座6",
        //   "status": "占用"
        // },
        // {
        //   "site": "插座7",
        //   "status": "占用"
        // },
        // {
        //   "site": "插座8",
        //   "status": "占用"
        // },
        // {
        //   "site": "插座9",
        //   "status": "占用"
        // },
        ]
      },

      {
        "site": "福州大学31-33栋2号电站",
        "use": "5使用/8插座",
        "array": [{
            "site": "插座1",
            "status": "空闲"
          },
          {
            "site": "插座6",
            "status": "空闲"
          },
          {
            "site": "插座7",
            "status": "空闲"
          },

        ]
      },
      {
        "site": "福州大学32-33栋5号电站",
        "use": "7使用/10插座",
        "array": [
          {
          "site": "插座1",
          "status": "空闲"
        },
        {
          "site": "插座6",
          "status": "空闲"
        },
        {
          "site": "插座7",
          "status": "空闲"
        },
        ]
      },
      {
        "site": "福州大学1区大车鹏11号电站",
        "use": "12使用/16插座",
        "array": [
          {
          "site": "插座1",
          "status": "空闲"
        },
        {
          "site": "插座6",
          "status": "空闲"
        },
        {
          "site": "插座15",
          "status": "空闲"
        },
        {
          "site": "插座13",
          "status": "空闲"
        },
        ]
      },
      {
        "site": "福州大学1区大车鹏9号电站",
        "use": "4使用/10插座",
        "array": [
          {
          "site": "插座1",
          "status": "空闲"
        },
        {
          "site": "插座6",
          "status": "空闲"
        },
        {
          "site": "插座7",
          "status": "空闲"
        },
        ]
      },
      {
        "site": "福州大学1区大车鹏2号电站",
        "use": "14使用/16插座",
        "array": [
          {
          "site": "插座15",
          "status": "空闲"
        },
        {
          "site": "插座13",
          "status": "空闲"
        },
        ]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.popup = this.selectComponent("#popup");
  },

  showPopup() {
    this.popup.showPopup();
  },
  //取消事件
  _error() {
    console.log('你点击了取消');
    this.popup.hidePopup();
  },
  //确认事件
  _success() {
    console.log('你点击了确定');
    this.popup.hidePopup();
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