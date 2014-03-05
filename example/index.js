var http    = require("http"),
    path    = require("path"),
    express = require("express"),
    easysse = require("../lib/easysse");

var app     = express(),
    server  = http.createServer(app);

app.get("/", function(req, res) {
  res.sendfile(path.join(__dirname, "index.html"));
});

app.get("/event-stream", easysse);

setInterval(function() {
  easysse.emit("foo", 1, 2, 3);
}, 1000);

server.listen(function() {
  var address = server.address();
  console.log("listening on http://%s:%d", address.address, address.port);
});

