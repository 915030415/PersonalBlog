function getTime(time){ //转化时间格式
    let now = new Date(time*1000);
    return now.getFullYear() + '年' + now.getMonth() + '月' + now.getDay() + '日';
}

module.exports.getTime = getTime;
