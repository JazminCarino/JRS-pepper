var http = require("http");
var fs = require("fs");

http
  .createServer((req, res) => {
    fs.readFile("example.html", (err, data) => {
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(data);
        return res.end();
    });
  })
  .listen(8081);
