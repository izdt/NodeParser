var http = require('http');
var url = process.argv[2];
var regx = process.argv[3];
//import http from 'http';
http.get(url, (res) => {
  //console.log(`Got response: ${res.statusCode}`);
  res.setEncoding('utf8');
  res.on("data",(data) => {
	//console.log(data);
    data.match(regx).forEach((match) => {
     console.log(match);
    });
    //console.log(data.match(/<img [^>]*\/>/gi));
  });
  // consume response body
  res.resume();
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});;