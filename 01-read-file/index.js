const fs = require('fs');
const process = require('process');
const path=require('path');
const readStream=fs.createReadStream(path.join(__dirname,'text.txt'));

readStream.on('data',(chunk)=>{
  process.stdout.write(chunk);
});