const path=require('path');
const copy=require('./utils/copyDirectory');
let sourceDir=path.join(__dirname,'files');
let targetDir=path.join(__dirname,'files-copy');

copy.copyDir(sourceDir,targetDir);
