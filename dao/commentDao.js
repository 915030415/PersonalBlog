let dbutill = require('./DBUtil');

function insertComment(success,...arg){
    let insertSql = "insert into comments (`blog_id`, `parent`, `user_name`, `parent_name`, `email`, `comments`, `ctime`, `utime`) values(?, ?, ?, ?, ?, ?, ?, ?);";
    let params = [...arg];
    let connection = dbutill.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryCommentCountByBlogId(success,bid){
    let querySql = "select * from comments where blog_id = ?;";
    let params = [bid];
    let connection = dbutill.createConnection();
    connection.connect();
    connection.query(querySql,params,(error, result) =>{
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}
function queryCommentsCountByBlogId(success,bid){
    let querySql = "select count(1) as count from comments where blog_id = ?;";
    let params = [bid];
    let connection = dbutill.createConnection();
    connection.connect();
    connection.query(querySql,params,(error, result) =>{
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}
function queryNewComments(success,bid){
    let querySql = "select * from comments order by id desc limit ?";
    let params = [bid];
    let connection = dbutill.createConnection();
    connection.connect();
    connection.query(querySql,params,(error, result) =>{
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.insertComment = insertComment;
module.exports.queryCommentCountByBlogId = queryCommentCountByBlogId;
module.exports.queryCommentsCountByBlogId = queryCommentsCountByBlogId;
module.exports.queryNewComments = queryNewComments;