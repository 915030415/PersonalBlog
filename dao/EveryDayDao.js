let dbutil = require('./DBUtil');
function insertEveryDao(success,...arg){
let connection = dbutil.createConnection();
let insertSql = "insert into every_day (`content`, `ctime`) values(?, ?);";
let params = [...arg];
connection.connect();
connection.query(insertSql,params,(error,result) =>{
    if(error == null){
        success(result);
    }else{
        console.log(error);
    }
});
connection.end();
}
function queryEveryDay(success){
    let connection = dbutil.createConnection();
    let querySql = "select * from every_day order by id desc limit 1;";
//     根据id 倒叙查 只取一个
    connection.connect();
      connection.query(querySql, (error,result)=>{
          if(error == null){
              success(result);
          }else{
              console.log(error);
          }
      });
      connection.end();
}
module.exports.insertEveryDao = insertEveryDao;
module.exports.queryEveryDay = queryEveryDay;