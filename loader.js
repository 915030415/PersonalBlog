let fs = require('fs');
let gloabConfig = require('./config.js');
let file = fs.readdirSync('./' + gloabConfig.web_path);
let controllerSet = [];
let pathMap = new Map();
for(let i = 0; i < file.length; i++){
   let temp = require('./' + gloabConfig["web_path"] + '/'+ file[i]);
   if(temp.path){
       for(let [key, val] of temp.path){
           if(pathMap.get(key) == null){
               pathMap.set(key,val);
           }else{
               throw new Error('url path异常，url:' + key);
           }

       }
       controllerSet.push(temp);
   }
}
module.exports = pathMap;
