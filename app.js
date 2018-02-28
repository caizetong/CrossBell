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
var formidable = require('formidable');

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


var http = require('http');
var querystring = require('querystring');
var fs = require('fs');
var util = require('util');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var multiparty = require('multiparty');

var multer = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

var uploadFun = upload.single('file');

app.post('/profile', upload.single('avatar'), function(req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log("profilereq :" + req);
})

app.post('/upload', function(req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    uploadFun(req, res, function(err) {
        if (err) {
            // An error occurred when uploading
            res.writeHead(400, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            res.end(util.inspect({ "code": 400 , "err" : err}));
        } else {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            res.end(util.inspect({ "code": "200" }));
        }

        // Everything went fine
    })




})


app.get('/getData', function(req, res1) {
    console.log(req.query.userName);


    res1.writeHead(200, { "Content-Type": "dapplication/json" });
    res1.json({ "status": "get" });
    res1.end;
    return;
});

app.post('/getData', function(req, res1) {
    console.log(req.query.userName);


    // res1.writeHead(200, {"Content-Type": "application/json"});
    res1.json({ "status": 200 });
    res1.end;
    return;

    var options = {
        host: 'localhost', // 这个不用说了, 请求地址
        port: 18080,
        path: '/test', // 具体路径, 必须以'/'开头, 是相对于host而言的
        method: 'GET', // 请求方式, 这里以post为例
        headers: { // 必选信息, 如果不知道哪些信息是必须的, 建议用抓包工具看一下, 都写上也无妨...
            'Content-Type': 'application/json'
        }
    };
    var req2 = http.request(options, function(res) {
        // console.log(res.text);
        res.on('data', function(chunk) {
            console.log('BODY: ' + chunk);
            // res1.writeHead(200, {"Content-Type": "application/json"});
            res1.type('application/json');
            res1.json(JSON.parse(chunk));
            res1.end;
        });

    });

    req2.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    req2.end();


});

// app.post('/upload', function(req, res) {
//     var form = new multiparty.Form();
//     //设置编辑
//     form.encoding = 'utf-8';
//     //设置文件存储路径
//     form.uploadDir = "uploads/images/";
//     //设置单文件大小限制


//     form.parse(req, function(err, fields, files) {
//         if (err) {
//             res.writeHead(400, { 'content-type': 'text/html' });
//             res.end("invalid request: " + err.message);
//             return;
//         }
//         console.log("fields:" + fields + "\nfiles:" + files);
//         res.writeHead(200, { 'content-type': 'text/plain' });
//         res.write('received upload:\n\n');
//         res.end(util.inspect({ fields: fields, files: files }));
//     });
//     // don't forget to delete all req.files when done 
// });


app.get('/getMusic', function(req, res1) {
    console.log(req.query.name);
    console.log(req.query.tel);

    // http://music.163.com/api/song/detail/?id=229083&ids=[229083]
    var options = {
        host: 'music.163.com', // 这个不用说了, 请求地址
        port: 80,
        path: '/api/song/detail/?id=229083&ids=[229083]', // 具体路径, 必须以'/'开头, 是相对于host而言的
        method: 'GET', // 请求方式, 这里以post为例
        headers: { // 必选信息, 如果不知道哪些信息是必须的, 建议用抓包工具看一下, 都写上也无妨...
            'Content-Type': 'application/json'
        }
    };
    var req2 = http.request(options, function(res) {
        // console.log(res.text);
        // res.on('data', function(chunk) {
        //     console.log('BODY: ' + chunk);
        //     res1.type('application/json');
        //     // res1.json(JSON.parse(chunk));
        //     res1.send(chunk);
        // });
        var body = '';
        res.on('data', function(chunk) {
            body += chunk;
        });
        res.on('end', function() {
            console.log(body);
            res1.type('application/json');
            res1.send(body);
        });

    });

    req2.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    req2.end();


});


app.get('/searchMusic', function(req, res1) {
    /**
     * HOW TO Make an HTTP Call - POST
     */
    // do a POST request
    // create the JSON object
    jsonObject = {
        "s": req.query.name,
        "offset": 0,
        "limit": 100,
        "type": 1
    };

    var formdata = querystring.stringify(jsonObject)

    // prepare the header
    var postheaders = {
        'Cookie': 'appver=1.5.0.75771',
        'Referer': 'http://music.163.com/',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': formdata.length
            // 'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
    };

    // the post options
    var optionspost = {
        host: 'music.163.com',
        port: 80,
        path: '/api/search/pc',
        method: 'POST',
        headers: postheaders
    };

    console.info('Options prepared:');
    console.info(optionspost);
    console.info('Do the POST call');

    // do the POST call
    var reqPost = http.request(optionspost, function(res) {
        console.log("statusCode: ", res.statusCode);
        // uncomment it for header details
        //  console.log("headers: ", res.headers);

        var body = '';
        res.on('data', function(chunk) {
            res1.write(chunk);
        });
        res.on('end', function() {
            // console.log(body);
            // res1.type('application/json');
            // res1.send(body);
            res1.end();
        });
    });

    // write the json data
    reqPost.write(formdata);
    reqPost.end();
    reqPost.on('error', function(e) {
        console.error(e);
    });


});

app.get('/getLyric', function(req, res1) {
    /**
     * HOW TO Make an HTTP Call - POST
     */
    // do a POST request
    // create the JSON object
    var id = req.query.id;
    console.log(id);

    var path = "/api/song/lyric?os=pc&id=" + id + "&lv=-1&kv=-1&tv=-1";
    // prepare the header
    var postheaders = {
        'Cookie': 'appver=1.5.0.75771',
        'Referer': 'http://music.163.com/',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Length': formdata.length
        // 'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
    };

    // the post options
    var optionspost = {
        host: 'music.163.com',
        port: 80,
        path: path,
        method: 'GET',
        headers: postheaders
    };

    console.info('Options prepared:');
    console.info(optionspost);
    console.info('Do the GET call');

    // do the POST call
    var reqPost = http.request(optionspost, function(res) {
        console.log("statusCode: ", res.statusCode);
        // uncomment it for header details
        //  console.log("headers: ", res.headers);

        var body = '';
        res.on('data', function(chunk) {
            res1.write(chunk);
        });
        res.on('end', function() {
            // console.log(body);
            // res1.type('application/json');
            // res1.send(body);
            res1.end();
        });
    });

    // write the json data
    reqPost.end();
    reqPost.on('error', function(e) {
        console.error(e);
    });


});

app.get('/test', function(req, res) {
    console.log(1222);
    res.json({ "status": 1 })
});

app.use('/wechat', wechat(config, function(req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    // if(message.MsgType == 'text'){
    //        res.reply({ type: "text", content: "you input " + message.Content});  
    //  }
    if ((message.MsgType == 'event') && (message.Event == 'subscribe')) {
//         var homePage = "<a href='http://crossbell.herokuapp.com/'>公众号主页</a>";
//         var magicMusic = "<a href='http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244245&idx=1&sn=79ce26b5ea15ce6275ee3e0cc6fd9d00&chksm=71b6767946c1ff6ffe48fe9db490b864fcf565087e6a81078e0b344b6bd35c719b50aaab893a#rd'>Grad Erlija - Retrospektiva</a>";
//         var magicMusic2 = "<a href='http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244250&idx=1&sn=92678ea2ceedf0b46db8c6329faf0397&chksm=71b6767646c1ff60308ed9b0f3aa0b091c599c88f6bdbf24d5d0c213b85385447d12982b7d74#rd'>歌に形はないけれど゙</a>";
        var replyString = "感谢你的关注！\n";
        res.reply(replyString);

    } else if (message.FromUserName === 'cc') {
        res.reply('欢迎公众号主人');
    }
//  else if (message.Content.toLowerCase() === 'magic') {
//         res.reply([{
//             title: 'Grad Erlija - Retrospektiva',
//             description: '',
//             picurl: 'https://mmbiz.qlogo.cn/mmbiz_jpg/GGHzdWaiaKq2expibSqlpAwib2KpPib4PAsWODQglEFciaH64xMBg0yMYPRpJC5NYWtBLicewgYsANfnd4UIc1zpzDmQ/0?wx_fmt=jpeg',
//             url: 'http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244245&idx=1&sn=79ce26b5ea15ce6275ee3e0cc6fd9d00&chksm=71b6767946c1ff6ffe48fe9db490b864fcf565087e6a81078e0b344b6bd35c719b50aaab893a#rd'
//         }, {
//             title: 'SPÏKA',
//             description: '',
//             picurl: 'https://mmbiz.qlogo.cn/mmbiz_jpg/GGHzdWaiaKq2expibSqlpAwib2KpPib4PAsWXZjIxLFRDL8l3rmIaaicTK3svVS7EArs4oib1iaNTcD1PvOs9kcnZwNxg/0?wx_fmt=jpeg',
//             url: 'http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244245&idx=2&sn=593e66dad7cd90b55b5da07b692159b3&chksm=71b6767946c1ff6f1ed59474964e9f92bacb5044cc03125c6575a9aa893734e732c0fc442c18#rd'
//         }]);
//     } else if (message.Content.toLowerCase() === 'jp') {
//         res.reply([{
//             title: '歌に形はないけれど゙',
//             description: '',
//             picurl: 'https://mmbiz.qlogo.cn/mmbiz_png/GGHzdWaiaKq2expibSqlpAwib2KpPib4PAsW0Qom4PzbyoEbnOMvVv2iajRFL6K9jMibYNMt8iaTvETXWWremUnaM68eA/0?wx_fmt=png',
//             url: 'http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244250&idx=1&sn=92678ea2ceedf0b46db8c6329faf0397&chksm=71b6767646c1ff60308ed9b0f3aa0b091c599c88f6bdbf24d5d0c213b85385447d12982b7d74#rd'
//         }, {
//             title: '三线の花',
//             description: '',
//             picurl: 'https://mmbiz.qlogo.cn/mmbiz_png/GGHzdWaiaKq2expibSqlpAwib2KpPib4PAsWXX1CrnReWzkJPVflbiabHIbVCCiaPz25LkSrIfvTMV1wJeg6ZRqYQyLA/0?wx_fmt=png',
//             url: 'http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244251&idx=1&sn=f4e59fa8d7c5c6d8d94c0c6760a9c416&chksm=71b6767746c1ff614a34fc9a2ce53bd24fe0c5cf46cc0ed6c98d443993ad68d8bb0c9916bfbf#rd'
//         }]);
//     } else if (message.Content.toLowerCase() === 'music') {
//         res.reply({ type: "text", content: "回复 magic jp 获取各式歌单" });
//     } else if (message.Content.toLowerCase() === '-roll' || message.Content.toLowerCase() === 'roll') {
//         var randomNum = Math.random() * 100;
//         var result = Math.ceil(randomNum)
//         res.reply({ type: "text", content: '' + result });
//     } 
    else {
        var homePage = "<a href='http://www.utwigo.com/index.php?r=s/p&i=ad462f'>每日精选</a>";
        var wenzhang = "<a href='https://mp.weixin.qq.com/s/yYxDjBpq3ZbYe-U5qqaWgw'>图文 - 每日精选</a>";
//         var magicMusic = "<a href='http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244245&idx=1&sn=79ce26b5ea15ce6275ee3e0cc6fd9d00&chksm=71b6767946c1ff6ffe48fe9db490b864fcf565087e6a81078e0b344b6bd35c719b50aaab893a#rd'>Grad Erlija - Retrospektiva</a>";
//         var magicMusic2 = "<a href='http://mp.weixin.qq.com/s?__biz=MzI2NDA5NjQ1MQ==&mid=519244250&idx=1&sn=92678ea2ceedf0b46db8c6329faf0397&chksm=71b6767646c1ff60308ed9b0f3aa0b091c599c88f6bdbf24d5d0c213b85385447d12982b7d74#rd'>歌に形はないけれど゙</a>";
        var replyString = "欢迎，请选择你要访问的链接\n" + homePage;
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
