var http = require('http');
http.get('http://www.google.com/index.html', (res) => {
  console.log(`Got response: ${res.statusCode}`);
  // consume response body
  res.resume();
})