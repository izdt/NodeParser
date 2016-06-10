var fs = require('fs');
var dir = "../imgs/";
var folders = [];
var lessFolders = [];

var deleteFolder = function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.lstatSync(curPath).isDirectory()) { 
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

var generateIndex = function(dir){
    var files = fs.readdirSync(dir);
    folders = files;
    folders.forEach((element)=>{
        if (fs.statSync(dir+element).isDirectory()){
            var imgs = fs.readdirSync(dir+element);
            //if(imgs.length<10) lessFolders.push(element);
            var html = "";
            imgs.forEach((item)=>{
                var imgLine = `<img src="${item}" width="100%"/>`;
                html+=imgLine;
            });
            
            fs.writeFile(dir+element+'/index.html', html, (err) => {
                if (err) throw err;
                console.log('It\'s saved!');
            });
            
            //console.log(html);
        }
        //console.log(dir+element);
    });
    fs.writeFile(dir+'/less.txt',lessFolders,(err)=>{

    });
    /*
    lessFolders.forEach((f)=>{
        deleteFolder(dir+f);
        console.log('Removed '+f);
    });
    */
    //console.log(files);
};
generateIndex(dir);

//modules.export = generateIndex;