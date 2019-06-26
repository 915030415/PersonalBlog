let everyDao = require('../dao/EveryDayDao');
let timeUtill = require('../util/TimeUtill');
let respUtill = require('../util/RespUtill');
let path = new Map();

//向数据库 添加 每一句
function editEveryDay(request,response){// 保存编辑的每日一句
//    post 传来 的数据 需要用data 方法来 接收
//     request.on("data",function(data){
//         // console.log(data.toString().trim());
//         everyDao.insertEveryDao((data)=>{
//              response.writeHead(200);
//              response.write(respUtill.writeResult('success','添加文章成功',null));
//              response.end();
//         },data.toString().trim(),timeUtill.getNow());
//     });
    let myPromise = new Promise((resolve,reject) =>{
        console.log(111);
        request.on('data',data =>{
            if(data){
                resolve(data);
            }
        });
    });
    myPromise.then(data =>{
        return new Promise((res,rej) =>{
            everyDao.insertEveryDao(data =>{
                res(data);
            },data.toString().trim(),timeUtill.getNow());
        });
    }).then(data =>{
        response.writeHead(200);
        response.write(respUtill.writeResult('success','添加文章成功',null));
        response.end();
    });
}
// 向数据库 查找 每一句
function queryEveryDay(request,response){
// console.log(222);
  everyDao.queryEveryDay(data => {
      // console.log(data);
      response.writeHead(200);
      response.write(respUtill.writeResult('success','请求成功',data));
      response.end();
  });
}
path.set('/queryEveryDay',queryEveryDay);
path.set('/editEveryDay',editEveryDay);



module.exports.path = path;
