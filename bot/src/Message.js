var Message = function(type, contents, to) {
    this.type = type;
    this.contents = contents;
    this.to = to;
    this.priority = -1;
}

var MessageType = {
    IRC: 'IRC',
    Telegram: 'Telegram',
    Steam: 'Steam'
}

module.exports = Message;
module.exports.Type = MessageType;
