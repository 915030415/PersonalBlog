let express = require('express');
let gloabConfig = require('./config.js');
let loader = require('./loader.js');
let app = new express();
app.use(express.static('./page/'));
// console.log(loader);
app.post('/editEveryDay',loader.get('/editEveryDay'));// 监听每日一句接口 编辑接口
app.get('/queryEveryDay',loader.get('/queryEveryDay'));//监听 每日一局 渲染接口
app.post('/editBlog',loader.get('/editBlog'));// 编辑博客接口
app.get('/queryBlogByPage',loader.get('/queryBlogByPage'));// 根据页面信息 获取文章列表接口
app.get('/queryBlogCount',loader.get('/queryBlogCount'));//查看文章总数
app.get('/queryBlogById',loader.get('/queryBlogById'));// 根据文章id 请求文章详细
app.get('/addComment',loader.get('/addComment'));// 保存 评论
app.get('/queryRandomCode',loader.get('/queryRandomCode'));// 验证码接口
app.get('/queryCommentsByBlogId',loader.get('/queryCommentsByBlogId'));// 获取留言接口
app.get('/queryCommentsCountByBlogId',loader.get('/queryCommentsCountByBlogId'));// 获取总留言
app.get('/queryAllBlog',loader.get('/queryAllBlog'));// 获取全部文章
app.get('/queryRandomTags',loader.get('/queryRandomTags'));//获取随机标签
app.get('/queryHotBlog',loader.get('/queryHotBlog'));// 获取热门文章
app.get('/queryNewComments',loader.get('/queryNewComments'));// 获取最新评论
app.get('/queryByTagAndPage',loader.get('/queryByTagAndPage'));// 根据 标签 和 当前页面 筛选 文章
app.get('/queryByTagCount',loader.get('/queryByTagCount'));//根据 tag 值查看文章 总数
app.get('/queryBlogIdByTitle',loader.get('/queryBlogIdByTitle'));// 根据文章 标题关键字 查询 文章id
app.get('/queryBlogByIdArr',loader.get('/queryBlogByIdArr'));//根据文章id数组获取文章列表
app.listen(gloabConfig.port,()=>{
    console.log('服务已启动');
});