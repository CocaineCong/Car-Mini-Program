//index.js
//获取应用实例
const app = getApp()
var api = require('../../config/api.js')

Page({


  data: {
    userInfo: '',
    avatarUrl: '',
    hasUserInfo: true,
    imgUrls: [
      // 'http://img.zcool.cn/community/011d455af2e4c7a80121604526b480.jpg@1280w_1l_2o_100sh.jpg',
      'http://img.zcool.cn/community/016ffc5afcd662a801218cf47f1d73.jpg@800w_1l_2o_100sh.jpg',
      // 'http://img.zcool.cn/community/01e1285acc8650a8012138675ab2a2.jpg@1280w_1l_2o_100sh.jpg',
      'http://img.zcool.cn/community/0142885afa4dd4a801216045a2977b.jpg@1280w_1l_2o_100sh.jpg',
      // 'http://img.zcool.cn/community/01756b5add7e92a80120927b3af0d8.jpg@1280w_1l_2o_100sh.jpg',
      // 'http://qs4jac5zs.hn-bkt.clouddn.com/index.png'
      'http://img.zcool.cn/community/01aa445afadc3ea801207ab4eb90cc.jpg@1280w_1l_2o_100sh.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 800,
    isShowUserPannel: false, //是否显示个人中心面板
  },
  

  onLoad: function () {
    if(wx.getStorageSync('token') == ""){
      wx.redirectTo({
        url: "/pages/auth/auth"
      })
    }

    this.setData({
      userInfo: wx.getStorageSync("userInfo")
    })
    // this.Login()
  },


  showUserPannel: function () {
    let isShow = this.data.isShowUserPannel
    if (!isShow) {
      isShow = true
    } else {
      isShow = false
    }
    this.setData({
      isShowUserPannel: isShow
    })
  },


  Login() {
    var that = this;
    wx.request({
      url: api.CheckToken,
      method: "GET",
      header: {
        "Authorization": wx.getStorageSync('token'),
      },
      success: (res) => {
        //判断是否有token
        // console.log(res)
        // console.log(res.data.status)
        if (res.data.status != 200) { //没有的话用code换token
          wx.login({
            success: res => {
              // wx.setStorageSync('codeIndex', res.code)
              wx.request({
                url: api.Login, //登陆注册请求
                method: "POST",
                header: {
                  "AuthCode": res.code,
                },
                data: {
                  username: this.data.userInfo.nickName,
                  avatar: this.data.userInfo.avatarUrl,
                },
                success: (res) => {
                  console.log(res)
                  if (res.data.status == 10002) {
                    // console.log(res.data.token)
                    wx.setStorageSync('token', res.data.token)
                    console.log(res.data.token)
                  } else {
                    console.log(res.data.msg)
                  }
                }
              })
            }
          })

        } else if (res.status == 200) {
          console.log("SUCCESS")
        }
      }
    })
  },


  // onShow() {
  //   this.setData({
  //     userInfo: wx.getStorageSync("userinfo")
  //   })
  //   this.Register()
  // },


  //跳转详情页
  gotoDetail: function () {
    wx.navigateTo({
      url: '/pages/pageopen/pageopen',
    })
  }


})