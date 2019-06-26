var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeUtill = require("../util/TimeUtill");
var respUtill = require("../util/RespUtill");
let url = require('url');
let path = new Map();

function queryRandomTags(request,response) {
    tagsDao.queyrAllTag(result =>{
        result.sort(() =>{
            return Math.random() > 0.5 ? true: false;
        });

        response.writeHead(200);
        response.write(respUtill.writeResult("success", "查询成功", result));
        response.end();
    });
}
path.set('/queryRandomTags',queryRandomTags);

function queryByTagAndPage(request,response){
  let params = url.parse(request.url,true).query;
    //查询 标签的id
    tagsDao.queryTag(result =>{

        if(result == null || result.length ==0){
            response.writeHead(200);
            response.write(respUtill.writeResult("success", "没有关于该标签的文章", result));
            response.end();
        }else{//根据 标签的id 查找 文章的 id
            tagBlogMappingDao.queryByTag(result =>{
                // 根据 文章 id 一篇 一篇 查找 文章 直到所有 文章 都查找完成

                let blogList = [];
                for(let i = 0; i < result.length; i++){
                    blogDao.queryBlogById(result =>{
                        blogList.push(result[0]);
                    },result[i].blog_id);
                }
            //     阻塞页面 直到 文章 全 部 查找完毕
                getResult(blogList,result.length,response);
            },result[0].id,parseInt(params.page),parseInt(params.pageSize));
        }
    },params.tag);
}
path.set('/queryByTagAndPage',queryByTagAndPage);

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

function queryByTagCount(request,response){
    let params = url.parse(request.url,true).query;
//    先 根据 tag 值 查看 tag id
//    再根据 tag_id 查看 总数
    tagsDao.queryTag(result =>{
        console.log(result);
        tagBlogMappingDao.queryByTagCount(result =>{
            response.writeHead(200);
            response.write(respUtill.writeResult("success", "查询成功", result));
            response.end();
        },result[0].id);
    },params.tag);
}
path.set('/queryByTagCount',queryByTagCount);
module.exports.path = path;
