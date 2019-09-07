// 写 日志  方便 出错的 时候 查看
let fs = require('fs');
let globalCofig = require('./config.js');
let file = '.'+ globalCofig.log_path + globalCofig.log_name;
// // console.log(file);
// fs.writeFile(file,'asdfasdfasdfasdf',{mode :0o666,flag : 'a'},function(){// 第三个参数 控制 写入文件 的 方式 是 覆盖 或者 追加写
//     // w  覆盖 如果没有该文件 则创建
//     //  a  追加   如果没有该文件 则创建}
//     // r  读取 文件
//     // 默认是  w  覆盖

//  mode :0o666 代表  文件 对用户的权限
// 666 对所有用户可读 可写
// 第一个 6 第一位 代表文件所有者的权限
// 第二位 同组用户的权限
// 第三位 非同组用户的权限
// r :4  w:2   x :1    r 可读  w：可写   x:可执行
// 4  2   1         6 可读 可写   7 可读可写 可执行
//     console.log("finish");
// }); // 异步 执行  写入文件

// fs.writeFileSync(file,'asdfasdfasdfasdf',{flag:"a"});// 同步 执行 参数是一样的 没有回调

function log(data){
    fs.appendFile(file,data + '\n',{flag : 'a'},function(){// 和  fx.writeFile 一样的 不过 默认值是 a  追加
       console.log('finish')
    });
    // fs.appendFileSync(file,data + '\n');// 和  fx.writeFileSync 一样的 不过 默认值 为  a
}

module.exports = log;// 导出 写日志的方法