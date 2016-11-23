var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var wechat = require('wechat');
var config = {
  token: 'crossbell',
  appid: 'wx824f65ef17325c1f',
  encodingAESKey: 'KJypj77B3Sx2qOOlxDvWwAffVOUgRYVM76kjfyTziny'
};

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/ionic', express.static(path.join(__dirname, 'ionic')));
app.use('/jquery', express.static(path.join(__dirname, 'jquery')));
app.use('/', routes);
app.use('/wechat', routes);
app.use('/users', users);
app.use(express.query());

app.use('/wechat', wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
   // if(message.MsgType == 'text'){
   //        res.reply({ type: "text", content: "you input " + message.Content});  
   //  }
   if((message.MsgType == 'event') && (message.Event == 'subscribe'))
   {  
      var homePage = "<a href='http://crossbell.herokuapp.com/'>公众号主页</a>";
      var magicMusic = "<a href='http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244245&idx=1&sn=79ce26b5ea15ce6275ee3e0cc6fd9d00&chksm=71b6767946c1ff6ffe48fe9db490b864fcf565087e6a81078e0b344b6bd35c719b50aaab893a#rd'>Grad Erlija - Retrospektiva</a>";
      var magicMusic2 = "<a href='http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244250&idx=1&sn=92678ea2ceedf0b46db8c6329faf0397&chksm=71b6767646c1ff60308ed9b0f3aa0b091c599c88f6bdbf24d5d0c213b85385447d12982b7d74#rd'>歌に形はないけれど゙</a>";
      var replyString = "感谢你的关注！\n" + homePage  + "\n以下是音乐推荐\n" + magicMusic + "\n" + magicMusic2 + "\n回复\nmagic\njp\n可以查看更多歌单\n输入-roll 或者 roll 可以随机100以内的数字";
      res.reply(replyString);

   }
  else if (message.FromUserName === 'cc') {
    res.reply('欢迎公众号主人');
  } else if( message.Content.toLowerCase() === 'magic')
  {
    res.reply([
      {
        title: 'Grad Erlija - Retrospektiva',
        description: '',
        picurl: 'https://mmbiz.qlogo.cn/mmbiz_jpg/GGHzdWaiaKq2expibSqlpAwib2KpPib4PAsWODQglEFciaH64xMBg0yMYPRpJC5NYWtBLicewgYsANfnd4UIc1zpzDmQ/0?wx_fmt=jpeg',
        url: 'http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244245&idx=1&sn=79ce26b5ea15ce6275ee3e0cc6fd9d00&chksm=71b6767946c1ff6ffe48fe9db490b864fcf565087e6a81078e0b344b6bd35c719b50aaab893a#rd'
      },
      {
        title: 'SPÏKA',
        description: '',
        picurl: 'https://mmbiz.qlogo.cn/mmbiz_jpg/GGHzdWaiaKq2expibSqlpAwib2KpPib4PAsWXZjIxLFRDL8l3rmIaaicTK3svVS7EArs4oib1iaNTcD1PvOs9kcnZwNxg/0?wx_fmt=jpeg',
        url: 'http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244245&idx=2&sn=593e66dad7cd90b55b5da07b692159b3&chksm=71b6767946c1ff6f1ed59474964e9f92bacb5044cc03125c6575a9aa893734e732c0fc442c18#rd'
      }
    ]);
  }
  else if( message.Content.toLowerCase() === 'jp')
  {
      res.reply([
      {
        title: '歌に形はないけれど゙',
        description: '',
        picurl: 'https://mmbiz.qlogo.cn/mmbiz_png/GGHzdWaiaKq2expibSqlpAwib2KpPib4PAsW0Qom4PzbyoEbnOMvVv2iajRFL6K9jMibYNMt8iaTvETXWWremUnaM68eA/0?wx_fmt=png',
        url: 'http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244250&idx=1&sn=92678ea2ceedf0b46db8c6329faf0397&chksm=71b6767646c1ff60308ed9b0f3aa0b091c599c88f6bdbf24d5d0c213b85385447d12982b7d74#rd'
      },
      {
        title: '三线の花',
        description: '',
        picurl: 'https://mmbiz.qlogo.cn/mmbiz_png/GGHzdWaiaKq2expibSqlpAwib2KpPib4PAsWXX1CrnReWzkJPVflbiabHIbVCCiaPz25LkSrIfvTMV1wJeg6ZRqYQyLA/0?wx_fmt=png',
        url: 'http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244251&idx=1&sn=f4e59fa8d7c5c6d8d94c0c6760a9c416&chksm=71b6767746c1ff614a34fc9a2ce53bd24fe0c5cf46cc0ed6c98d443993ad68d8bb0c9916bfbf#rd'
      }
    ]);
  }
  else if( message.Content.toLowerCase() === 'music')
  {
     res.reply({ type: "text", content: "回复 magic jp 获取各式歌单"}); 
  }
  else if (  message.Content.toLowerCase() === '-roll' || message.Content.toLowerCase() === 'roll')
  {
    var randomNum = Math.random()*100;
    var result = Math.ceil(randomNum)
     res.reply({ type: "text", content:  '' + result}); 
  }
  else
  {
      var homePage = "<a href='http://crossbell.duapp.com/'>公众号主页</a>";
      var magicMusic = "<a href='http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244245&idx=1&sn=79ce26b5ea15ce6275ee3e0cc6fd9d00&chksm=71b6767946c1ff6ffe48fe9db490b864fcf565087e6a81078e0b344b6bd35c719b50aaab893a#rd'>Grad Erlija - Retrospektiva</a>";
      var magicMusic2 = "<a href='http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244250&idx=1&sn=92678ea2ceedf0b46db8c6329faf0397&chksm=71b6767646c1ff60308ed9b0f3aa0b091c599c88f6bdbf24d5d0c213b85385447d12982b7d74#rd'>歌に形はないけれど゙</a>";
      var replyString = "以下信息希望可以帮助您\n" + homePage  + "\n音乐推荐\n" + magicMusic + "\n" + magicMusic2 + "\n回复\nmagic\njp\n可以查看更多歌单\n输入-roll 或者 roll 可以随机100以内的数字";
      res.reply(replyString);
  }
}));

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handlers

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });



module.exports = app;
