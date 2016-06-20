const fs = require('fs');
const dir = "../imgs/";
const folders = [];
const lessFolders = [];

const deleteFolder = function(path) {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            let curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { 
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

const generateIndex = function(dir){
    let files = fs.readdirSync(dir);
    let folders = files;
    folders.forEach((element)=>{
        if (fs.statSync(dir+element).isDirectory()){
            let imgs = fs.readdirSync(dir+element);
            //if(imgs.length<10) lessFolders.push(element);
            let html = "";
            imgs.forEach((item)=>{
                let imgLine = `<img src="${item}" width="100%"/>`;
                if(item.indexOf('.jpg')>0) html+=imgLine;
            });
            
            fs.writeFile(dir+element+'/index.html', html, (err) => {
                if (err) throw err;
                console.log('It\'s saved!');
            });
            
            //console.log(html);
        }
        //console.log(dir+element);
    });
    /*
    fs.writeFile(dir+'/less.txt',lessFolders,(err)=>{
    });
    
    lessFolders.forEach((f)=>{
        deleteFolder(dir+f);
        console.log('Removed '+f);
    });
    */
    //console.log(files);
};
generateIndex(dir);

//modules.export = generateIndex;