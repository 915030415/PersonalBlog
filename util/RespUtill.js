function writeResult(status,msg,data){//设置 返回体
    return JSON.stringify({status:status,msg:msg,data:data})
}
module.exports.writeResult = writeResult