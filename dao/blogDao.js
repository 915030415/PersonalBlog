let dbutil = require('./DBUtil');

function insertBlog(success,...arg){ //插入博客文章
    let connection = dbutil.createConnection();
    let insertSql = "insert into blog (`title`, `content`, `tags`, `view`, `ctime`, `utime`) values(?,?,?,?,?,?);";
    let params = [...arg];
    connection.connect();
   connection.query(insertSql,params,(error,result) => {
       if(error == null){
           success(result);
       }else{
           console.log(error);
       }
   });
   connection.end();
}

function queryBlogByPage(success,page,pageSize){// 获取博客文章
    let querySql = "select * from blog order by id desc limit ?, ?;";
    // 偏移量  取多少个
    let params = [page*pageSize,pageSize];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(error,result) =>{
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    });
    connection.end();
}

function queryBlogCount(success){//获取文章总数
    let querySql = "select count(1) as count from blog;";// 去别名 count
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,(error,result) =>{
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    });
    connection.end();
}

function queryBlogById(success,bid){
    let querySql = "select * from blog where id = ?;";
    let params = [bid];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(error, result) =>{
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    });
    connection.end();
}

function queryAllBlog(success){
    let querySql = "select * from blog order by id desc;";
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,(error,result) =>{
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    });
    connection.end();
}
function addViews(success,id){
    let querySql = "update blog set view = view + 1 where id = ?;";
    let params = [id];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(error,result) =>{
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    });
    connection.end();
}

function queryHotBlog(success,size){

    let querySql = "select * from blog order by view desc limit ?;";
    let params = [size];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(error,result) =>{
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    });
    connection.end();
}

function queryBlogIdByTitle(success,keyWord){
    let querySql = 'select * from blog where title like ?';
    let params = ["%" + keyWord + "%"];
    let connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,(error,result) =>{
        if(error == null){
            success(result);
        }else{
            console.log(error)
        }
    });
    connection.end();
}
// function queryBlogByIdArr(success,bid){
//
//     let querySql = "select * from blog where id = ?";
//     let params = [bid];
//     let connection = dbutil.createConnection();
//     connection.connect();
//     connection.query(querySql,params,(error,result) =>{
//         if(error == null){
//             success(result);
//         }else{
//             console.log(error)
//         }
//     });
//     connection.end();
// }

module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryAllBlog = queryAllBlog;
module.exports.addViews = addViews;
module.exports.queryHotBlog = queryHotBlog;
module.exports.queryBlogIdByTitle = queryBlogIdByTitle;
// module.exports.queryBlogByIdArr = queryBlogByIdArr;
