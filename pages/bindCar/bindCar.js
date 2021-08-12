const api = require("../../config/api")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgs: [],
    placeholder: '请选择',
    multiIndex: [0, 0, 0],
    carNum: "",
    carName: "",
    imgs: [],
    lenMore:'',
    bossID:"",
    count:[],
    countIndex:"",
    imageList:[],
    carNum:""
  },
  watchName: function (e) {
    this.setData({
      carName: e.detail.value
    })
  },
  watchNum: function (e) {
    this.setData({
      carNum: e.detail.value
    })
  },
  onLoad:function(options){
    this.setData({
      bossID:options.detail
    })
  },

  chooseImg: function () {
    var that = this;
    wx.chooseImage({
      count: this.data.count[this.data.countIndex],
      success: function (res) {
        //缓存下 
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 2000,
          success: function (res) {
            console.log('成功加载动画');
          }
        })
        that.setData({
          imageList: res.tempFilePaths
        })
        //获取第一张图片地址 
        var filep = res.tempFilePaths[0]
        //向服务器端上传图片 
        wx.uploadFile({
          method:"POST",
          url: api.OcrCar,
          filePath:filep ,
          name: 'picture',   // 和后端沟通好 接收文件的name
          success: function (res) {
            // console.log("RES")
          // console.log(res)
           var data = JSON.parse(res.data)
            // console.log(data)
            if(data.status == 200){
              wx.showToast({
                title: '解析成功',
                duration: 2000,
              })
              that.setData({
                carNum:data.msg
              })
              console.log(that.data.carNum)
              // wx.redirectTo({
              //   url: '/pages/car/car'
              // })
            }else{
              wx.showToast({
                title: '绑定失败',
                duration: 2000,
              })
            }
          },
          fail: function (err) {
            console.log(err)
          }
        });
      }
    })
  },


  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs
    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
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