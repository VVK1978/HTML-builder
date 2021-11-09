const fs=require('fs');
const path=require('path');

async function copyDir(sourceDir,targetDir){
  fs.access(targetDir,async err=> {
    if (err && err.code === 'ENOENT') {
      fs.mkdir(targetDir,{ recursive: true, force:true },err=>{
        if(err) throw err;
      });
      copyFiles(sourceDir,targetDir);
    } else {
      await delFiles(targetDir);
      await copyFiles(sourceDir,targetDir);
    }
  });
}

function delFiles(targetDir){
  fs.readdir(targetDir, (err, files) => {
    if (err) throw err;
    if(!files.length){
      fs.rmdir(targetDir,err=>{
        if(err) throw err;
      });
    } 
    files.forEach((file) =>{
      fs.stat(path.join(targetDir, file),(err,stats)=>{
        if(stats.isFile()){
          fs.unlink(path.join(targetDir, file), err => {
            if (err) throw err;
          });
        } 
      });
    });
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