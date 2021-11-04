const fs=require('fs');
const path=require('path');
let res='';

const mergeStyles=(sourceDir,targetFile)=>{
  fs.readdir(sourceDir, (err,files)=>{
    if(err) throw err;
    files.forEach( file=>{
      fs.stat(path.join(sourceDir, file),async(err,stats)=>{
        if(err){
          throw err;
        } 
        else
        if(stats.isFile())
        {
          const extname= path.extname(path.join(sourceDir, file));
          if(extname==='.css'){
            await fs.readFile(path.join(sourceDir, file),async(err,data)=>{
              if(err) throw err;
              res+='\n'+await data;
              if(res){
                const writeStream=await fs.createWriteStream(targetFile);
                await writeStream.write(`${res}`);
              }
            });
          }
        }
      });
    });
  });};

module.exports.mergeStyles=mergeStyles;