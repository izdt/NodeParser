var http = require('http');
var crawPage = function(url,regexString,callback){
    var matchData = [];
    http.get(url, (res) => {
    //console.log(`Got response: ${res.statusCode}`);
    res.setEncoding('utf8');
    var html = "";
    res.on('data',(data) => {
      html+=data;
    });
    res.on('end',()=>{
      var regex = new RegExp(regexString,"g");
      while ((matchArray = regex.exec(html)) !== null) {
        matchData.push(matchArray[1]);
      }
      callback(matchData,url);
    });
    res.resume();
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
  });
};
module.exports = crawPage;