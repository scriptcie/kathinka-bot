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

Message.prototype.command = function() {
    var match = this.contents.match(/^[Kk]athinka(-bot)?[,:]{0,1}\s+(.*)$/);

    // Return the command
    if (match !== undefined && match !== null) {
        return match[2];
    }

    if (this.type === MessageType.Steam) {
        // Steam only has commands since it's private chat
        return this.contents;
    }
    return null;
}

Message.prototype.question = function() {
    var command = this.command();
    if (!command) {
        return false;
    }
    var match = command.match(/^(.*)\?$/)

    // Return the question
    if (match !== undefined && match !== null) {
        return match[1];
    }

    return false;
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
