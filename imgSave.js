const http = require('http');
const fs = require('fs');

const mkdirIfNotExits = function(dir){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
};

const imgSave = function(url, dir, name){
    //sleep(500);
    let newDir = '../imgs/' + dir;
    if(fs.existsSync(newDir)) return;
    http.get(url, function(res){
        res.setEncoding('binary');
        let data='';
        res.on('data', function(chunk){
            data+=chunk;
        });
        res.on('end', function(){
            mkdirIfNotExits(newDir);
            fs.writeFile(newDir + "/"+name, data, 'binary', function (err) {
                if (err) throw err;
                console.log('file saved '+name);
            });
        });
    }).on('error', function(e) {
        console.log('error'+e)
    });
};

module.exports = imgSave;