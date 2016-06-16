const http = require('http');
const crawPage = function(url,regexString,callback){
    let matchData = [];
    http.get(url, (res) => {
    //console.log(`Got response: ${res.statusCode}`);
    res.setEncoding('utf8');
    let html = "";
    res.on('data',(data) => {
      html+=data;
    });
    res.on('end',()=>{
      let regex = new RegExp(regexString,"g");
      let matchArray;
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