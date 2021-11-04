const fs=require('fs');
const path=require('path');

function copyDir(sourceDir, targetDir) {
  fs.rmdir(targetDir, { recursive: true },err=>{
    if(err) throw err;
    fs.mkdir(targetDir,{ recursive: true },err=>{
      if(err) throw err;
      fs.readdir(sourceDir,(err,files)=>{
        if(err){
          throw err;
        }else {
          files.forEach(file => {
            fs.stat(path.join(sourceDir, file),(err,stats)=>{
              if(err){
                throw err;
              } else
              if(stats.isFile()){
                fs
                  .createReadStream(path.join(sourceDir, file))
                  .pipe(fs.createWriteStream(path.join(targetDir, file)));
              } else {
                copyDir(path.join(sourceDir, file), path.join(targetDir, file));
              }
            });
          }); 
        }
      });
    });
  });
 
}

module.exports.copyDir=copyDir;