var fs = require('fs');

var dir = "../imgs/";
var folders = [];


var generateIndex = function(dir){
    var files = fs.readdirSync(dir);
    folders = files;
    folders.forEach(function(element) {
        if (fs.statSync(dir+element).isDirectory()){
            var imgs = fs.readdirSync(dir+element);
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
    }, this);
    //console.log(files);
};
generateIndex(dir);

//modules.export = generateIndex;