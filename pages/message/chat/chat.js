let chatInput = require('../../../modules/chat-input/chat-input');
var utils = require("../../../utils/util.js")
const api = require("../../../config/api.js")
var websocket = require('../../../utils/websocket.js');


Page({
  data: {
    wxchatLists: [],
    friendHeadUrl: '',
    // textMessage: '',
    chatItems: [],
    scrollTopTimeStamp: 0,
    height: 0, //屏幕高度
    chatHeight: 0, //聊天屏幕高度
    normalDataTime: '',
    userAvatar: "",
    userID: 2,
    content: "",
    userName: "",
    text: "",
    ReplayInfo: "",
    IsRead: false,
  },
  //item的所有单向信息
  // {
  //     dataTime: '',//当前时间
  //     msg_type: '',//发送消息类型
  //     userImgSrc: '',//用户头像
  //     textMessage: '',//文字消息
  //     voiceSrc: '',//录音的路径
  //     voiceTime: 0,//录音的时长
  //     sendImgSrc: '',//图片路径
  //   }

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getInfo();
    that.initData();
    websocket.connect(that.data.userID, function (res) {
      // console.log("FUCK")
      console.log(res)
      var info = JSON.parse(res.data)
      console.log(info)
      if (info.code == 50005) {
        that.setData({
          IsRead: false
        })
      } else if (info.code == 50004){
        that.setData({
          IsRead: true,
        })
      }else if (info.code == 50001){
        that.setData({
          ReplayInfo : info.content
        })
      }
    })
    wx.getSystemInfo({
      success(res) {
        that.setData({
          height: wx.getSystemInfoSync().windowHeight,
          chatHeight: wx.getSystemInfoSync().windowHeight - 55
        })
      }
    })
  },

  getInfo: function (id) {
    var id = 2
    var that = this
    wx.request({
      url: api.GetMessageInfo + id,
      method: "GET",
      data: {
        token: wx.getStorageSync('token'),
      },
      success: function (res) {
        console.log(res)
        if (res.data.status == 200) {
          that.setData({
            userAvatar: res.data.data.avatar,
            userID: res.data.data.id,
            userName: res.data.data.user_name
          })
        } else {

        }
      }
    })
  },

  initData: function () {
    let that = this;
    let systemInfo = wx.getSystemInfoSync();
    chatInput.init(this, {
      systemInfo: systemInfo,
      minVoiceTime: 1,
      maxVoiceTime: 60,
      startTimeDown: 56,
      format: 'mp3', //aac/mp3
      sendButtonBgColor: 'mediumseagreen',
      sendButtonTextColor: 'white',
      extraArr: [{
        picName: 'choose_picture',
        description: '照片'
      }, {
        picName: 'take_photos',
        description: '拍摄'
      }],
      // tabbarHeigth: 48
    });

    that.setData({
      pageHeight: systemInfo.windowHeight,
      normalDataTime: utils.formatTime(new Date()),
    });
    wx.setNavigationBarTitle({
      title: that.data.userName
    });
    that.textButton();
    that.extraButton();
    that.voiceButton();
  },
  textButton: function () {
    var that = this;
    chatInput.setTextMessageListener(function (e) {
      let content = e.detail.value;
      console.log(content);
      that.setData({
        content: content
      })
      var list = that.data.wxchatLists;
      var temp = {
        userImgSrc: '../../../images/chat/extra/close_chat.png',
        textMessage: content,
        dataTime: utils.formatTime(new Date()),
        msg_type: 'text',
        type: 1
      };
      list.push(temp);
      that.setData({
        wxchatLists: list,
      })
      websocket.send(that.data.userID + " : " + that.data.wxchatLists[0].textMessage);
    });

  },
  voiceButton: function () {
    var that = this;
    chatInput.recordVoiceListener(function (res, duration) {
      let tempFilePath = res.tempFilePath;
      let vDuration = duration;
      // console.log(tempFilePath);
      // console.log(vDuration + "这是voice的时长");
      var list = that.data.wxchatLists;
      var temp = {
        userImgSrc: '../../../images/chat/extra/close_chat.png',
        voiceSrc: tempFilePath,
        voiceTime: vDuration,
        dataTime: utils.formatTime(new Date()),
        msg_type: 'voice',
        type: 1
      };
      list.push(temp);
      that.setData({
        wxchatLists: list,
      })
    });
    chatInput.setVoiceRecordStatusListener(function (status) {
      switch (status) {
        case chatInput.VRStatus.START: //开始录音
          break;
        case chatInput.VRStatus.SUCCESS: //录音成功
          break;
        case chatInput.VRStatus.CANCEL: //取消录音
          break;
        case chatInput.VRStatus.SHORT: //录音时长太短
          break;
        case chatInput.VRStatus.UNAUTH: //未授权录音功能
          break;
        case chatInput.VRStatus.FAIL: //录音失败(已经授权了)
          break;
      }
    })
  },
  //播放录音
  playRecord: function (e) {
    let _this = this;
    wx.playVoice({
      filePath: voiceSrc // src可以是录音文件临时路径
    })
    console.log(e)
    console.log(_this)
  },


  extraButton: function () {
    let that = this;
    chatInput.clickExtraListener(function (e) {
      console.log(e);
      let itemIndex = parseInt(e.currentTarget.dataset.index);
      if (itemIndex === 2) {
        that.myFun();
        return;
      }
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'],
        sourceType: itemIndex === 0 ? ['album'] : ['camera'],
        success: function (res) {
          let tempFilePath = res.tempFilePaths[0];
          console.log(tempFilePath);
          var list = that.data.wxchatLists;
          var temp = {
            dataTime: utils.formatTime(new Date()),
            userImgSrc: '../../../images/chat/extra/close_chat.png',
            sendImgSrc: tempFilePath,
            msg_type: 'img',
            type: 1
          };
          list.push(temp);
          that.setData({
            wxchatLists: list,
          })
        }
      });

    });
    chatInput.setExtraButtonClickListener(function (dismiss) {
      console.log('Extra弹窗是否消息', dismiss);
    })
  },


  resetInputStatus: function () {
    chatInput.closeExtraView();
  },

  //删除单条消息
  delMsg: function (e) {
    var that = this;
    var magIdx = parseInt(e.currentTarget.dataset.index);
    var list = that.data.wxchatLists;

    wx.showModal({
      title: '提示',
      content: '确定删除此消息吗？',
      success: function (res) {
        if (res.confirm) {
          console.log(e);
          list.splice(magIdx, 1);
          that.setData({
            wxchatLists: list,
          });
          // wx.showToast({
          //   title: '删除成功',
          //   mask: true,
          //   icon: 'none',
          // })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })



  },
  //点击图片 预览大图
  seeBigImg: function (e) {
    var that = this;
    var idx = parseInt(e.currentTarget.dataset.index);
    var src = that.data.wxchatLists[idx].sendImgSrc;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
});