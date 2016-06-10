var fs = require('fs');

var dir = "./";
var generateIndex = function(dir){
    var files = fs.readdirSync(dir);
    console.log(files);
};
generateIndex(dir);

//modules.export = generateIndex;