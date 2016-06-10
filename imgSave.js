var http = require('http');
var fs = require('fs');

var imgSave = function(url, name){
    //sleep(500);
    var dir = '../imgs'
    http.get(url, function(res){
        res.setEncoding('binary');
        var data='';
        res.on('data', function(chunk){
            data+=chunk;
        });
        res.on('end', function(){
            fs.writeFile(dir + "/"+name, data, 'binary', function (err) {
                if (err) throw err;
                console.log('file saved '+name);
            });
        });
    }).on('error', function(e) {
        console.log('error'+e)
    });
};

module.exports = imgSave;