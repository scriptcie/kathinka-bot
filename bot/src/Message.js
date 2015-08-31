var Message = function(type, contents, to) {
    this.type = type;
    this.contents = contents;
    this.to = to;
    this.priority = -1;
}

Message.prototype.command = function() {
    var match = this.contents.match(/^[Kk]athinka(-bot)?[,:]{0,1}\s+(.*)$/);

    // Return the command
    if (match !== undefined && match !== null) {
        return match[2];
    }

    return null;
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
