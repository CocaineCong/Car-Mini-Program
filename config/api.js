const rootUrl = 'http://localhost:3000/api/v1';
const wsUrl = 'ws://localhost:3000/api/v1';
const ocrUrl = 'http://localhost:5000'

module.exports = {

  WebsocketConnect : wsUrl + "/ws",            //聊天

  Login: rootUrl+ "/user/login",               //用户登陆
  UserInfo : rootUrl + "/user/show",           //返回用户信息
  CheckToken :rootUrl+"/ping",                 //检查token
  BindEmail : rootUrl+ "/user/vaild-email",    //解绑定邮箱
  GetCode : rootUrl + "/user/get-code",        //获得验证码
  BindPhone : rootUrl + "/user/vaild-phone",   //解绑定手机
  GetTopic : rootUrl + "/get-topic",           //获取分类
 
  CreateSocial : rootUrl +"/create-social/",      //创建帖子
  GetSocial: rootUrl + "/get-social",             //获取社区帖子
  GetMySocial:rootUrl+"/get-my-social/",          //获取我的帖子
  GetSocialDetail : rootUrl + "/get-detail/",     //获取详情

  Upload : rootUrl + "/upload",                   //上传照片文件

  GetCarInfo : rootUrl + "/cars/",                //获取车辆信息 
  NoBindCar : rootUrl +"/car/",                   //解绑车辆
  CreateCar :rootUrl + "/cars",                   //绑定车

  GetComment : rootUrl +"/comment/get-all/",      //获取某个帖子下的评论
  CreateComment : rootUrl +"/comment/create-comment",   //发表评论
  DeleteComment : rootUrl + "/comment/delete-comment",  //删除评论

  GetMyFriends : rootUrl+"/get-my-friend/",             //获得我的伙伴
  GetMyFriendInfo : rootUrl +"/ShowFriendInfo/",        //查看好友页面
  DeleteMyFriend : rootUrl+ "/delete-my-friend/",       //删除好友     
  CreateMyFriend : rootUrl + "/create-my-friend/",      //创造好友
  
  GetMessageInfo :rootUrl + "/get-user-id/",            //获取聊天内容
  GetMessageList :rootUrl + "/MessageIndex/",           //获取聊天最新列表


  OcrCar : ocrUrl + "/upload"       //ocr
}