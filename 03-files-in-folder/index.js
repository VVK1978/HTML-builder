const fs = require('fs');
const path=require('path'); 
const dir=path.join(__dirname+'\\secret-folder');

let getFiles = function (dir){
  fs.readdir(dir,(err,files)=>{
    if(err){
      throw err;
    } else{
      files.forEach(file=>{
        let filePath=`${dir}\\${file}`;
        fs.stat(filePath,(err,stats)=>{
          if(err){
            throw err;
          } else
          if(stats.isFile()){
            let extname=path.extname(filePath);
            if(path.basename(filePath,extname)[0]!=='.'){
              console.log(path.basename(filePath,extname),' - ', extname.slice(1),' - ', (stats.size/1024).toFixed(3),'kb');}
          }
          // Рекурсия для всех вложенных папок
          else{
            getFiles(filePath);
          }
        });
      });
    }
  });
};

getFiles(dir);
