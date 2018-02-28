var http = require('http');
var port = 80;
http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var body = ' \
        <html> \
            <head> \
                <meta charset="utf-8"> \
                <title>Welcome to BAE</title> \
            </head> \
            <body> \
                <h4>Welcome to Baidu App Engine!</h4> \
                <h2>欢迎开启BAE之旅！</h2> \
                <br> \
                <br> \
                <ul>以下链接可能对您有用：</ul> \
                <ul><a href="https://bce.baidu.com/doc/BAE/QuickGuide.html" target="_blank">入门指南</a></ul> \
                <ul><a href="http://developer.baidu.com/forum/topic/list?boardId=66" target="_blank">论坛</a></ul> \
                <ul><a href="http://www.baeblog.com/" target="_blank">技术博客</a></ul> \
                <ul><a href="http://weibo.com/baiduappengine" target="_blank">微博</a></ul> \
                <ul><a href="https://bce.baidu.com/doc/BAE/FAQ.html" target="_blank">常见问题</a></ul> \
            </body> \
        </html> \
    ';
    res.write(body);
    res.end();
}).listen(port);


var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

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

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
