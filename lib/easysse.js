var Message = require("./message");

var clients = [];

function easysse(req, res) {

  // don't timeout this request
  req.socket.setTimeout(Infinity);

  // client connect
  clients.push(res);

  // client disconnect
  req.on("close", function() {
    clients.splice(clients.indexOf(res), 1);
  });

  // set headers
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });
};

easysse.emit = function emit() {
  var message = Message.create.apply(null, [].slice.call(arguments)).toString();

  clients.forEach(function(client) {
    client.write(message);
  });
}

module.exports = easysse;
