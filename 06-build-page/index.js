const fs=require('fs');
const path=require('path');
const copy=require('../04-copy-directory/utils/copyDirectory');
const merge=require('../05-merge-styles/utils/mergeStyles');

let sourceDirAssets=path.join(__dirname,'assets');
let sourceDirStyles=path.join(__dirname,'styles');
let targetDir=path.join(__dirname,'project-dist');
let targetFile=path.join(__dirname,'project-dist','./style.css');
let components=path.join(__dirname,'components');

fs
  .mkdir(targetDir,{ recursive: true },err=>
  {
    if(err) throw err;  
    fs
      .createReadStream(path.join(__dirname, 'template.html'))
      .pipe(fs.createWriteStream(path.join(targetDir, 'index.html')));
    merge.mergeStyles(sourceDirStyles,targetFile);
    replace();
  });

const replace=()=>{
  fs.readdir(components,async(err,files)=>{
    if(err) throw err;
    let template=await fs.promises.readFile(path.join(targetDir,'index.html'),'utf8');
    await files.forEach(async(file)=>{
      if(await path.extname(file)==='.html'){
        let promise =await new Promise((resolve)=>{
          resolve(fs.promises.readFile(path.join(components,path.basename(file)),'utf8'));
        });
        const dataComponent=await promise;
        let reg= await new RegExp(`{{${path.basename(file,path.extname(file))}}}`,'g');
        promise =await new Promise((resolve)=>{
          resolve(template.replace(reg, dataComponent));
        });
        template = await promise;
        await fs.promises.writeFile(path.join(__dirname,'project-dist','index.html'),template); 
      } 
      
    });
  }); 
};

copy.copyDir(sourceDirAssets,path.join(targetDir,'assets'));
