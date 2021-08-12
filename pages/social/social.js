//index.js
//获取应用实例
var util = require('../../utils/util.js');
const api = require('../../config/api.js');
var app = getApp()
Page({
  data: {
    MyWordList: [],
    liveListTest: [],
    section: [{
        name: '推荐',
        id: '1001'
      },
      {
        name: '亲友圈',
        id: '1002'
      },
      {
        name: '闲来康康',
        id: '1003'
      },
      {
        name: '我的世界',
        id: '1004'
      },
      {
        name: '待开发',
        id: '1005'
      }
    ],
    imgUrls: [{
      link: '/pages/index/index',
      url: '/images/social1.gif'
    }, {
      link: '/pages/index/index',
      url: '/images/social2.gif'
    }, {
      link: '/pages/index/index',
      url: '/images/social3.gif'
    }, {
      link: '/pages/index/index',
      url: '/images/social4.gif'
    }],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    currentId: 1001,
    hotList: [],
    // 亲友圈(类似朋友圈)
    liveList: [],
    // 番剧更新
    bangumiList: [{
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/4d06e660b8da9cb5335552f4ebde89bbcb2e9d4f.jpg',
        bangumiTitle: 'aaaaaa',
        bangumiPage: '更新至第34话',
        avid: 'av9'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/0e6bce5d018796dda7782aa5c97bfdd14691348a.jpg',
        bangumiTitle: '口水三国',
        bangumiPage: '更新至第 关羽篇话',
        avid: 'av10'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/367387d69ac43c160a453d14cb34256abaca3b4a.jpg',
        bangumiTitle: '生死回放',
        bangumiPage: '更新至第34话',
        avid: 'av11'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/4937bf71a4a5a6a426d09e9a78d27696b4746507.jpg',
        bangumiTitle: '罗小黑战记',
        bangumiPage: '更新至第34话',
        avid: 'av12'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/2ed6be9050dfa4afe6e2651741d81843a0e81c67.jpg',
        bangumiTitle: '黑白来看守所',
        bangumiPage: '更新至第9话',
        avid: 'av13'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/bangumi/2673ac643b48eb5bda64c960a2ca850fbebb839d.jpg',
        bangumiTitle: '夏目友人帐 伍',
        bangumiPage: '更新至第8话',
        avid: 'av14'
      }
    ],
    animationList: [{
        coverImg: 'http://i2.hdslb.com/bfs/archive/1239539a2f262d933bca7c2c1e290139420ba76a.jpg_320x200.jpg',
        title: '【乐正绫】《华夏之章》【小旭PRO】【绛舞乱丸】',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av15'
      },
      {
        coverImg: 'http://i1.hdslb.com/bfs/archive/ecce95b426faf188e6c28f9d3a0bdc63c5a72bb3.jpg_320x200.jpg',
        title: '【斗图歌】装逼不如斗图',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av16'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/archive/11bf8d41fffcad31976317760e301e2db64be8c8.png_320x200.png',
        title: '【胖胖球】【双子星】【獒龙】荒岛 - El transcurrir de las horas',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av17'
      },
      {
        coverImg: 'http://i0.hdslb.com/bfs/archive/e73a92b0ed615b4d6568888906d09f84d0835674.jpg_320x200.jpg',
        title: '撩人净土系列【红菱歌舞伎初音】极乐净土【大神犬PV付】MME配布',
        playNum: '4.7万',
        commentNum: '977',
        avid: 'av18'
      }
    ],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow: function () {
    this.getSocial();
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setTopDistance();
    // this.setData({
    //   stagePoint: util.stagePoint()
    // })
    if (this.data.currentId == 1001) {
      // this.Page();
    } else if (this.data.currentId == 1004) {
      this.channelPage();
    } else if (this.data.currentId == 1003) {
      this.livePage();
    }

  },
  setTopDistance: function () {

  },
  //上方选项点击
  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({
        currentId: id
      })
      this.onLoad();
    }
  },
  channelPage: function () {
    this.GetMyList()
  },
  livePage: function () {
    this.getSecondHand();
  },

  GetMyList() {
    var that = this
    // console.log(wx.getStorageSync('userInfo'))
    wx.request({
      url: api.GetMySocial + wx.getStorageSync('userInfo').id,
      method: "GET",
      dataType: 'json',
      responseType: 'text',
      header: {
        "Authorization": wx.getStorageSync('token'),
      },
      success: (res) => {
        // console.log(res)
        if (res.data.status == 200) {
          var list = res.data.data
          for (let index = 0; index < list.length; index++) {
            this.setData({
              MyWordList: this.data.MyWordList.concat(list[index])
            })
          }
        }else{
          wx.showToast({
            title: '获取失败',
            duration: 2000,
            icon: icon,
          })
        }
      }
    })
    console.log(this.data.MyWordList)
  },

  getSocial: function () {
    var list = []
    wx.request({
      url: api.GetSocial,
      method: "GET",
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res)
        if (res.data.status == 200) {
          list = res.data.data.item
          for (let index = 0; index < list.length; index++) {
            if (list[index].category_id != 5) {
              this.setData({
                hotList: this.data.hotList.concat(list[index])
              })
            }
          }
        }
      }
    })
  },
  changePlay() {
    let flag = !this.data.play;
    this.setData({
      play: flag
    });
    //start title
    let titleOpenAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    titleOpenAn.opacity(0).step();
    this.setData({
      titleOpenAn: titleOpenAn.export()
    });
    let titleCloseAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    titleCloseAn.opacity(1).step();
    this.setData({
      titleCloseAn: titleCloseAn.export()
    });
    //end title
    // start 第一条line
    let line1OpenAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '50% 50% 0'
    });
    line1OpenAn.translateY(12).rotate(45).scale(1.4, 1).step();
    this.setData({
      line1OpenAn: line1OpenAn.export()
    });
    let line1CloseAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '12rpx 50%'
    });
    line1CloseAn.translateY(0).rotate(0).scale(1, 1).step();
    this.setData({
      line1CloseAn: line1CloseAn.export()
    });
    //end 第一条line

    // start 第二条line
    let line2OpenAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    line2OpenAn.translateY(-6.5).translateX(-1).rotate(-45).scale(1.4, 1).step();
    this.setData({
      line2OpenAn: line2OpenAn.export()
    });

    let line2CloseAn = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    line2CloseAn.translateY(0).rotate(0).scale(1, 1).step();
    this.setData({
      line2CloseAn: line2CloseAn.export()
    });
    //end 第二条line

    //start 第一个按钮
    let btn1Open = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn1Open.translateX(-60).opacity(1).step();
    this.setData({
      btn1Open: btn1Open.export()
    });

    let btn1Close = wx.createAnimation({
      duration: 300,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn1Close.translateX(0).opacity(0).step();
    this.setData({
      btn1Close: btn1Close.export()
    });
    //end 第一个按钮
    //start 第二个按钮
    let btn2Open = wx.createAnimation({
      duration: 500,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn2Open.translateX(-120).opacity(1).step();
    this.setData({
      btn2Open: btn2Open.export()
    });

    let btn2Close = wx.createAnimation({
      duration: 500,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn2Close.translateX(0).opacity(0).step();
    this.setData({
      btn2Close: btn2Close.export()
    });
    //end 第二个按钮
    //start 第三个按钮
    let btn3Open = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn3Open.translateX(-180).opacity(1).step();
    this.setData({
      btn3Open: btn3Open.export()
    });

    let btn3Close = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn3Close.translateX(0).opacity(0).step();
    this.setData({
      btn3Close: btn3Close.export()
    });
    //end 第三个按钮
    //start 第四个按钮
    let btn4Open = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '100% 0'
    });
    btn4Open.translateX(-240).opacity(1).step();
    this.setData({
      btn4Open: btn4Open.export()
    });

    let btn4Close = wx.createAnimation({
      duration: 700,
      timingFunction: 'forwards',
      delay: 0,
      transformOrigin: '46rpx 50%'
    });
    btn4Close.translateX(0).opacity(0).step();
    this.setData({
      btn4Close: btn4Close.export()
    });

    //end 第四个按钮
  },
  getSecondHand: function () {
    var list = []
    wx.request({
      url: api.GetSocial,
      method: "GET",
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        if (res.data.status == 200) {
          list = res.data.data.item
          for (let index = 0; index < list.length; index++) {
            if (list[index].category_id == 5) {
              this.setData({
                liveList: this.data.liveList.concat(list[index])
              })
            }
          }
        }
      }
    })
  }



})