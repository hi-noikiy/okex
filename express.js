var express = require("express");
var ejs = require('ejs');
//var fs = require("fs");
//var bodyParser = require('body-parser');

var app = express();

app.engine('html', ejs.renderFile);

app.set("view engine", "html"); 

app.use(function(req, res, next) {
    res.locals.userinfo = {
        userid : 123,
        username : "ladeng"
    };
    next();
});

app.get("/", function(req, res) {
    var list = [1, 2, 4, 5, 5, 7, 8];
    res.render("sdf", {title : "我是NodeJs测试", list : list});
});

app.listen(8188);

console.log("服务器运行中");
