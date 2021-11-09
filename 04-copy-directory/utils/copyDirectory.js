const fs=require('fs');
const path=require('path');

function copyDir(sourceDir, targetDir) {

  fs.stat(targetDir, function(err) {
    if (!err) {
      fs.readdir(targetDir, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(targetDir, file), err => {
            if (err) throw err;
          });
        }
        copyFiles(sourceDir,targetDir);
      });
    }
    else if (err.code === 'ENOENT') {
      fs.mkdir(targetDir,{ recursive: true, force:true },err=>{
        if(err) throw err;
        copyFiles(sourceDir,targetDir);
      });
    }
  });
}

function copyFiles(sourceDir,targetDir){
 
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
}

module.exports.copyDir=copyDir;