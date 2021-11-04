const path=require('path');
const merge=require('./utils/mergeStyles');
let sourceDir=path.join(__dirname,'styles');
let targetFile=path.join(__dirname,'project-dist','./bundle.css');

merge.mergeStyles(sourceDir,targetFile);
