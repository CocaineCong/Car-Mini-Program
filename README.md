# Car-Manage-System (mini-program) 

# 车辆信息管理平台 小程序端



**后端**详情看

Golang部分 [Golang](https://github.com/CocaineCong/Car-Manage-System)

Python部分 [Python](https://github.com/CocaineCong/Car-Yolo-FasterRcnn)



![image-20210812221147691](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20210812221147691.png)





# 前言

由于本人真的不会前端，所以这个项目的前端都是`东拼西凑`来的

非常感谢**隔壁有坑**小程序作者的开源，Github地址[隔壁有坑](https://github.com/miniappdeveloper/gbyk)，本程序使用了该小程序的`主页`以及`个人信息页面` 

其他部分都是我自己百度找的模块，或是自己乱写的页面，所以页面之间在美观方面就很会有很大的差距。



# 项目结构目录

```
carSystem/
├── component    
├── config
├── images
├── modules
├── pages
│  ├── auth
│  ├── bindCar
│  ├── bindPhone
│  ├── car
│  ├── chat
│  ├── common
│  ├── firendInfo
│  ├── firends
│  ├── incharge
│  ├── index
│  ├── logs
│  ├── message
│  ├── newsDetail
│  ├── publish
│  ├── publishSuccess
│  ├── reports
│  ├── social
│  ├── template
│  ├── user
└── utils
```





- component ：放一些组件
- config ：存放与后端交互的 api 接口以及一些全局环境的变量
-  images：存放一些静态文件
-  modules：存放聊天的模型，其实这个应该和组件放在一起的
- pages / auth ：用户登陆的验证
- pages / bindCar：绑定车辆页面
- pages / bindPhone：绑定手机页面
- pages / car：我的车库
- pages / chat：好友聊天列表
- pages / common：社区页面的组件
- pages / firendInfo：好友信息
- pages / firends：好友列表
- pages / incharge：充电页面
- pages / index：主页
- pages / logs：前端日志打印
- pages / message：好友聊天页面
- pages / newsDetail：帖子详情页面
- pages / publish：发布帖子
- pages / publishSuccess：发布帖子成功
- pages / reports：反馈页面
- pages / social：社区页面
- pages / template ： 搜索页面
- pages / user：用户个人信息页面
- utils：一些时间转换、ws的工具





# 简要说明

上面结构比较乱，足以说明本人真的不会前端，都是东拼西凑来的，我只会写微信的请求去请求后台。





# 部分页面介绍

## pages / index：主页

<img src="https://img-blog.csdnimg.cn/2021060116274051.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTMwNDUwMw==,size_16,color_FFFFFF,t_70 #pic_center" width="45%" >





## pages / user：用户个人信息页面

<img src="https://img-blog.csdnimg.cn/20210601163755462.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTMwNDUwMw==,size_16,color_FFFFFF,t_70" width="47%">





## pages / message：好友聊天页面

<img src="https://img-blog.csdnimg.cn/20210601172530128.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTMwNDUwMw==,size_16,color_FFFFFF,t_70" width="47%">





## pages / publish：发布帖子



<img src="https://img-blog.csdnimg.cn/20210601165907562.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTMwNDUwMw==,size_16,color_FFFFFF,t_70" width="47%">





## pages / social：社区页面



<img src="https://img-blog.csdnimg.cn/20210601165725598.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTMwNDUwMw==,size_16,color_FFFFFF,t_70" width="47%">



<img src="https://img-blog.csdnimg.cn/20210601165748755.png?x-oss-
process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTMwNDUwMw==,size_16,color_FFFFFF,t_70" width="47%">



## pages / newsDetail：帖子详情页面



<img src="https://img-blog.csdnimg.cn/2021060200261436.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NTMwNDUwMw==,size_16,color_FFFFFF,t_70" width="47%">







## 总结

本人下学期准备大三了，打算是往`区块链`或`大数据`方向学习，

前端大概率是不会涉及了，不过下学期的软工实践可能会优化这个前端的逻辑结构。

这个项目的前后端（go+微信小程序）是我今年五一假期写的，写的比较仓促，所以就没什么优化，希望大佬轻喷。

如果你喜欢的话可以在右上角点一个`star`~

好了~感谢你的支持！













