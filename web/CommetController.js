let commentDao = require("../dao/CommentDao");
let timeUtill = require('../util/TimeUtill');
let respUtill = require('../util/RespUtill');
let url = require('url');
let captcha = require("svg-captcha");//验证码库

let path = new Map();

function addComment(request,response){
  let params = url.parse(request.url,true).query;
  console.log(params);
    commentDao.insertComment(result =>{
        // console.log(result);
        response.writeHead(200);
        response.write(respUtill.writeResult("success", "评论成功", null));
        response.end();
    },parseInt(params.bid), parseInt(params.parent), params.userName,params.parentName, params.email, params.content, timeUtill.getNow(), timeUtill.getNow())
}
path.set('/addComment',addComment);

//验证码接口
function queryRandomCode(request,response){
 let img = captcha.create({fontSize:50, width:100, height:34});
    // console.log(img); // img 中的text 是验证码的文本 data 是svg
    response.writeHead(200);
    response.write(respUtill.writeResult("success", "评论成功", img));
    response.end();
}

path.set('/queryRandomCode',queryRandomCode);
//获取文章留言
function queryCommentsByBlogId(request,response){
  let params = url.parse(request.url,true).query;
    commentDao.queryCommentCountByBlogId(result => {
        response.writeHead(200);
        response.write(respUtill.writeResult("success", "获取留言成功", result));
        response.end();
    },parseInt(params.bid));
}
path.set('/queryCommentsByBlogId',queryCommentsByBlogId);

//获取总留言数

function queryCommentsCountByBlogId(request, response) {
    let params = url.parse(request.url, true).query;
    commentDao.queryCommentsCountByBlogId(function (result) {
        response.writeHead(200);
        response.write(respUtill.writeResult("success", "获取总留言数成功", result));
        response.end();
    },parseInt(params.bid));
}
path.set("/queryCommentsCountByBlogId", queryCommentsCountByBlogId);

function queryNewComments(request,response){
    commentDao.queryNewComments(function (result) {
        response.writeHead(200);
        response.write(respUtill.writeResult("success", "评论成功", result));
        response.end();
    },5);
}
path.set('/queryNewComments',queryNewComments);
module.exports.path = path;
