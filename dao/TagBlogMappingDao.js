let dbutill = require('./DBUtil');



function insertTagBlogMapping(success,...arg){
    // 给 这个表 真加一个 唯一索引 uq_tag_blog_id type 为unique  该索引又 tagId 和 blogId 共同决定 唯一
    let insertSql = "insert into tag_blog_mapping (`tag_id`, `blog_id`, `ctime`, `utime`) values(?,?,?,?);";
    let params = [...arg];
    let connection = dbutill.createConnection();
    connection.connect();
    connection.query(insertSql,params,(error,result) =>{
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
        }
    );
    connection.end();
}
function queryByTag(success,tagId, page, pageSize){

    let insertSql = "select * from tag_blog_mapping where tag_id = ? limit ?, ?;";
    let params = [tagId,page*pageSize,pageSize];
    let connection = dbutill.createConnection();
    connection.connect();
    connection.query(insertSql,params,(error,result) =>{
            if (error == null) {
                success(result);
            } else {
                console.log(error);
            }
        }
    );
    connection.end();
}
function queryByTagCount(success,TagId){

    let insertSql = "select count(1) as count from tag_blog_mapping where tag_id = ?;";
    let params = [TagId];
    let connection = dbutill.createConnection();
    connection.connect();
    connection.query(insertSql,params,(error,result) =>{
            if (error == null) {
                success(result);
            } else {
                console.log(error);
            }
        }
    );
    connection.end();
}

module.exports.insertTagBlogMapping = insertTagBlogMapping;
module.exports.queryByTag = queryByTag;
module.exports.queryByTagCount = queryByTagCount;