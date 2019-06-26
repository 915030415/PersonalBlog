let blogDao = require("../dao/BlogDao");
let tagsDao = require("../dao/TagsDao");
let tagBlogMappingDao = require("../dao/TagBlogMappingDao");
let timeUtill = require('../util/TimeUtill');
let respUtill = require('../util/RespUtill');
let url = require('url');

let path = new Map();

//编辑博客
function editBlog(request,response){
    let params = url.parse(request.url,true).query;
    let title = params.title;
    let tags = params.tags.replace(/ /g, '').replace('，',',');// 标题中的空格被替换 英文逗号
    request.on('data',data => {
        blogDao.insertBlog(result =>{
            response.writeHead(200);
            response.write(respUtill.writeResult('success','添加成功',null));
            response.end();
            //    遍历标签 每个标签 一个文章可以对应多个标签 一个标签也可以对应多篇文章
            let tagList = tags.split(',');
            // console.log(result);
            let blogId = result.insertId;// 获取博客的id  后面 插入 到 tag_blog_mapping 表中
            for(let i = 0; i < tagList.length; i++){
                if(tagList[i] == ''){
                    continue;
                }
            //    遍历 标签
                queryTag(tagList[i],blogId);

            }
        },title,data.toString(),tags,0,timeUtill.getNow(),timeUtill.getNow());
    });
}
path.set('/editBlog',editBlog);

function queryTag(tag,blogId){// 对标签 进行筛选 如果 tags 表中存在 则  直接进行 tag_blog_mapping 标签id 与文章id 对应操作
//    如果 不存在 则进行插入标签 操作
//    查找标签
    tagsDao.queryTag(result => {
        if(result == null || result.length == 0){//该标签 在 表中不存在 插入
            insertTag(tag,blogId)
        }else{ // 标签存在 进行tag_blog_mapping 标签id 与文章id 对应操作 一个标签可以对应多篇文
            // console.log(result);
            insertTagBlogMapping(result[0].id,blogId);
            // console.log(111)
        }
    },tag);
}

function insertTag(tags,blogId){
    //插入 该标签
   tagsDao.insertTag(result => {// 插入完成后 则 进行tag_blog_mapping 标签id 与文章id 对应操作
       insertTagBlogMapping(result.insertId,blogId);
   },tags,timeUtill.getNow(),timeUtill.getNow());
}

function insertTagBlogMapping(tagId,blogId){
    // 进行tag_blog_mapping 标签id 与文章id 对应操作
    tagBlogMappingDao.insertTagBlogMapping((reslut) =>{

    },tagId,blogId,timeUtill.getNow(),timeUtill.getNow());
}


function queryBlogByPage(request,response){

    let params = url.parse(request.url,true).query;
    blogDao.queryBlogByPage(result =>{
        // console.log(result);
    //     过滤数 把文章 里面的 div 等标签  图片 过滤掉 只显示 300字
        for(let i = 0; i < result.length.length; i++){
            result[i].content = result[i].content.replace(/<img[\w\W]*">/,'');// 替换图片 图片会是base64格式的
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g,'');// 替换标签
            result[i].content = result[i].content.substring(0,300);// 只显示300 字在首页

        }
        response.writeHead(200);
        response.write(respUtill.writeResult('success','查询成功',result));
        response.end();
    },parseInt(params.page),parseInt(params.pageSize));
}
path.set('/queryBlogByPage',queryBlogByPage);

function queryBlogCount(request,response){// 查看文章总数
    blogDao.queryBlogCount(result =>{
        response.writeHead(200);
        response.write(respUtill.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set('/queryBlogCount',queryBlogCount);

// 根据id 查找文章详情
function queryBlogById(request,response){
    let params = url.parse(request.url,true).query;
    blogDao.queryBlogById(result =>{
        response.writeHead(200);
        response.write(respUtill.writeResult("success", "查询成功", result));
        response.end();
        blogDao.addViews(result =>{

        },parseInt(params.bid));
    },parseInt(params.bid));
}
path.set('/queryBlogById',queryBlogById);

function queryAllBlog(request,response) {
    blogDao.queryAllBlog(result =>{
        response.writeHead(200);
        response.write(respUtill.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set('/queryAllBlog',queryAllBlog);

function queryHotBlog(request,response){
    blogDao.queryHotBlog(result =>{
        response.writeHead(200);
        response.write(respUtill.writeResult("success", "查询成功", result));
        response.end();
    },5);
}
path.set('/queryHotBlog',queryHotBlog);
function queryBlogIdByTitle(request,response){
    let params = url.parse(request.url,true).query;
    blogDao.queryBlogIdByTitle(result =>{
        response.writeHead(200);
        response.write(respUtill.writeResult("success", "查询成功", result));
        response.end();
    },params.keyWord);
}
path.set('/queryBlogIdByTitle',queryBlogIdByTitle);


function queryBlogByIdArr(request,response){
    let params = url.parse(request.url,true).query;
   // console.log(params);
    let blogArr = [];
    let bidArr = params.bid.split('|');
    // console.log(bidArrLen);
    let blogList = [];
    for(let i = 0; i < bidArr.length; i++){//根据文章 id 查询 文章
        blogDao.queryBlogById(resp => {
               blogList.push(resp[0]);
        },parseInt(bidArr[i]));
    }
    getResult(blogList,bidArr.length,response);
}
function getResult(blogList,len,response){
    if(blogList.length < len){// 没查找完成 阻塞 递归
        setTimeout(()=>{
            getResult(blogList,len,response);
        },10);
    }else{// 过滤文章 返回结果
        // console.log(blogList);
        for (var i = 0 ; i < blogList.length ; i ++) {
            blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/, "");
            blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, "");
            blogList[i].content = blogList[i].content.substring(0, 300);
        }
        response.writeHead(200);
        response.write(respUtill.writeResult("success", "查询成功", blogList));
        response.end();
    }
}
path.set('/queryBlogByIdArr',queryBlogByIdArr);
module.exports.path = path;
