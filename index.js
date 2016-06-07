var http = require('http');
var url = process.argv[2];
var regexString = process.argv[3];
//import http from 'http';
http.get(url, (res) => {
  //console.log(`Got response: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on("data",(data) => {
	//console.log(data);
    //var regex = /\d+/g;
    var regex = new RegExp(regexString,"g");
    data.match(regex).forEach((match) => {
     console.log(match);
    });
    //console.log(data.match(/<img [^>]*\/>/gi));
  });
  // consume response body
  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});