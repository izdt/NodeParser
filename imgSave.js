var http = require('http');
var fs = require('fs');

var mkdirIfNotExits = function(dir){
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
};

var imgSave = function(url, dir, name){
    //sleep(500);
    var newDir = '../imgs/' + dir;
    http.get(url, function(res){
        res.setEncoding('binary');
        var data='';
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