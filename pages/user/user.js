// pages/user/user.js
var api = require('../../config/api.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    MyID:"",
    sIndex: 0,
    fIndex: 2,
    email: "",
    phone: "",
    name :"",
    avatar :"",
    totalTime: 30,
    content: '发送验证邮件',
    message: '朕将发送一封验证邮件到你的邮箱，此邮箱将作为您的绑定邮箱',
    deleteMessage: '朕将发送一封验证邮件到你的邮箱，此操作会解除邮箱绑定',
    userInfo: "",
    cannotClick: false,
    showModalStatus: false,
  },

  //选择领域
  pickerFiled: function (e) {
    this.setData({
      fIndex: e.detail.value
    })
  },

  countDown() {
    if (this.data.cannotClick) return //改动的是这两行代码
    this.data.cannotClick = true
    this.data.content = this.totalTime + 's后重新发送'
    let clock = window.setInterval(() => {
      this.data.totalTime--
      this.data.content = this.data.totalTime + 's后重新发送'
      if (this.data.totalTime < 0) {
        window.clearInterval(clock)
        this.data.content = '重新发送验证邮件'
        this.data.message =
          '朕将发送一封验证邮件到你的邮箱，此邮箱将作为您的绑定邮箱'
        this.data.deleteMessage =
          '朕将发送一封验证邮件到你的邮箱，此操作会解除邮箱绑定'
        this.data.totalTime = 30
        this.data.cannotClick = false //这里重新开启
      }
    }, 1000)
  },

  //选择微博状态
  pickerStatus: function (e) {
    this.setData({
      sIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.GetUserInfo()
  },

  GetUserInfo: function (e) {
    var that = this;
    wx.request({
      url: api.UserInfo,
      method: "GET",
      data: {
        token: wx.getStorageSync('token'),
      },
      success: function (res) {
        // console.log(res)
        if (res.data.status == 200) {
          wx.setStorage({
            data: res.data.data,
            key: 'userInfo',
          })
          that.setData({
            userInfo:res.data.data,
            email: res.data.data.email,
            phone: res.data.data.phone,
            name:res.data.data.user_name,
            avatar:res.data.data.avatar,
            MyID : res.data.data.id,
          })
        } else if (res.data.status == 30001) {
          wx.setStorageSync('token','')
          wx.showModal({
            title: '你有问题',
            content: "身份过期，请重新登陆",
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '/pages/auth/auth',
                })
              }else{
                wx.navigateTo({
                  url: '/pages/auth/auth',
                })
              }
            }

          })

        }
      }

    })
  },


  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    });
    this.animation = animation;
    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation
      })
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },

  watchEmail: function (event) {
    var email = event.detail.value;
    wx.setStorageSync('new_email', email)
  },
  watchPhone: function (event) {
    var phone = event.detail.value;
    return phone
  },
  bindPhone: function (e) {
    if (!(/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.data.mobile))) {
      wx.showToast({
        title: '手机号码有误',
        duration: 2000,
        icon: 'none'
      });
      return
    }
  },
  toBindPhone: function (e) {
    console.log("SUCCESSS")
    wx.navigateTo({
      url: '/pages/bindPhone/bindPhone?phone=' + this.data.phone,
      success: function (res) {
        console.log("SUCCESS")
      },
      fail: function () {

      },
      complete: function () {
        // complete 
      }
    })
  },
  bindEmail: function (e) {
    var email = wx.getStorageSync('new_email')
    var that = this;
    if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(email))) {
      wx.showToast({
        title: '邮箱输入有误',
        duration: 2000,
        icon: 'none'
      });
    } else {
      console.log("RESSSSS")
      wx.request({
        method: "POST",
        url: api.BindEmail,
        data: {
          email: email,
          token: wx.getStorageSync('token'),
        },
        header: {
          //1:绑定，2:解绑
          "operation_type": 1,
          'content-type': 'application/json',
        },
        success: function (res) {
          // console.log(res)
          if (res.data.status == 200) {
            wx.showToast({
              title: '绑定成功',
              duration: 2000
            })
            wx.setStorageSync('new_email', '')
            this.onLoad()
          } else {
            wx.showToast({
              title: '绑定失败',
              duration: 2000
            })
            this.onLoad()
          }
        }
      })
    }
  },
  nobindEmail() {
    wx.request({
      method: "POST",
      url: api.BindEmail,
      data: {
        token: wx.getStorageSync('token'),
      },
      header: {
        //1:绑定，2:解绑
        operation_type: 2,
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          wx.showToast({
            title: '解绑成功',
            duration: 2000
          })
          this.onLoad()
        } else {
          wx.showToast({
            title: '解绑失败',
            duration: 2000
          })
        }
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

  }
})