var Message = function(type, contents, to) {
    this.type = type;
    this.contents = contents;
    this.to = to;
    this.priority = -1;
}

var MessageType = {
    Null: 'Null',
    IRC: 'IRC',
    Telegram: 'Telegram',
    Steam: 'Steam'
}

Message.fromString = function(message, to) {
    return new Message(MessageType.Null, message, to);
}

Message.fromMessage = function(message, to) {
    if (message instanceof Message) {
        return message;
    }

    return Message.fromString(message, to);
}


module.exports = Message;
module.exports.Type = MessageType;
