let fs = require('fs');
let gloabConfig = {}
try{
    let conf  = fs.readFileSync('./server.conf').toString().split('\n');
    for(let i = 0; i < conf.length; i++){
        gloabConfig[conf[i].split('=')[0].trim()] = conf[i].split('=')[1].trim();
    }
}catch(e){
    console.log(e);
}
// console.log(gloabConfig);
module.exports = gloabConfig