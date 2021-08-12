var api = require("../config/api.js")

function connect (to_uid, func) {
  var uid = wx.getStorageSync('userInfo').id
  // to_uid = 2 
  console.log(uid)
  console.log(to_uid)
  console.log("CONNECT1111111")
  wx.connectSocket({
    url: api.WebsocketConnect+ '?uid='+uid+'&&to_uid='+to_uid
  });
  wx.onSocketMessage(func);  
}

function send(msg){
  wx.sendSocketMessage({
    data: JSON.stringify({"type": 1, "content": msg})
  });
}



// wx.onSocketOpen(function(res) {
//   socketOpen = true
//   for (let i = 0; i < socketMsgQueue.length; i++){
//     sendSocketMessage(socketMsgQueue[i])
//   }
//   socketMsgQueue = []
// })

// function sendSocketMessage(msg) {
//   if (socketOpen) {
//     wx.sendSocketMessage({
//       data:msg
//     })
//   } else {
//     socketMsgQueue.push(msg)
//   }
// }



module.exports = {
  connect: connect,
  send : send
}
