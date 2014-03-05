var Message = function Message(eventType, args) {
  this.id = Date.now();
  this.eventType = eventType;
  this.arguments = args;
};

Message.create = function create(eventType) {
  return new Message(eventType, [].slice.call(arguments, 1));
};

Message.prototype.serialize = function serialize() {
  return JSON.stringify({eventType: this.eventType, arguments: this.arguments});
};

Message.prototype.toString = function toString() {
  return "id: " + this.id + "\n" + "data: " + this.serialize() + "\n\n";
};

module.exports = Message;
