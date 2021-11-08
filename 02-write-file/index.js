const readline = require('readline');
const fs=require('fs');
const path=require('path');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });

rl.on('SIGINT', () => {
  output.write('\nGood By;)');
  setTimeout(()=>{
    rl.close();
  },500);
});

function inputStream(){
  rl.question('Input your text,please(type "exit" to exit from input mode): ', async(input) => {
    if(input.match(/^exit?$/i)){
      output.write('\nGood By;)');
      rl.close();
    } else 
    { 
      const writeStream=fs.createWriteStream(path.join(__dirname,'text.txt'),{flags:'a'});
      writeStream.write(`\r\n${input}`);
      inputStream();
    }
  });
}

inputStream();