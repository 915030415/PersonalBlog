let dbutill = require('./DBUtil');

function queryTag(success,tag){
    let querySql = "select * from tags where tag = ?;";
    let params = [tag];
    let connection = dbutill.createConnection();
    connection.connect();
    connection.query(querySql,params,(error,result) => {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}
function insertTag(success,...arg){
    let querySql = "insert into tags (`tag`, `ctime`, `utime`) values(?,?,?);";
    let params = [...arg]
    let connection = dbutill.createConnection();
    connection.connect();
    connection.query(querySql,params,(error,result) => {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function queyrAllTag(success){
    let querySql = "select * from tags;";
    let connection = dbutill.createConnection();
    connection.connect();
    connection.query(querySql, (error,result) => {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

// function queryByTag(success,...arg){
//     let querySql = "select * from tags where tag = ?;";
//     let params = [...arg];
//     let connection = dbutill.createConnection();
//     connection.connect();
//     connection.query(querySql,params,(error,result) =>{
//         if(error == null){
//             success(result);
//         }else{
//             console.log(error);
//         }
//     });
//     connection.end();
// }




module.exports.queryTag = queryTag;
module.exports.insertTag = insertTag
module.exports.queyrAllTag=queyrAllTag;
