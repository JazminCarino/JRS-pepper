var http = require("http");

http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text-plain" });

    console.log(req.url);

    res.write(req.url);

    res.end("Hello World");
  })
  .listen(8081);

console.log("server listening to port 8081");
