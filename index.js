var http = require('http');
var imgSave = require('./imgSave');
var url = process.argv[2];
var regexString = process.argv[3];
//import http from 'http';
var matchData = [];

var showData = function(){
    for(var i in matchData){
      console.log(matchData[i]);
    }
};

regexString = regexString || "data-src=\"(http:\/\/crawling.*?)\"";

var saveImgs = function(){
    var imgDir = decodeURI(url.substr(url.indexOf('.net/')+5)).replace('/','');
    for(var i in matchData){
      var imgUrl = matchData[i];
      var imgName = imgUrl.substr(imgUrl.lastIndexOf('/')+1);
      console.log("save img:" + imgName)
      imgSave(matchData[i], imgDir, imgName);
    }   
}

http.get(url, (res) => {
  //console.log(`Got response: ${res.statusCode}`);
  res.setEncoding('utf8');
  var html = "";
  res.on('data',(data) => {
    html+=data;
  });
  res.on('end',()=>{
	  //console.log(html);
    //var regex = /\d+/g;
    var regex = new RegExp(regexString,"g");
    //console.log(regex.exec(html));
    //console.log(html.match(regex));

    while ((matchArray = regex.exec(html)) !== null) {
      //console.log(matchArray[1]);
      matchData.push(matchArray[1]);
    }
    //showData();
    saveImgs();
    /*
    html.match(regex).forEach((match) => {
     console.log(match);
    });
    */
    //console.log(html.match(/<img [^>]*\/>/gi));
  });
  // consume response body
  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});

