var Goodbye = function() {}
var Message = require('../Message.js');

Goodbye.prototype = {
    interact: function(message, from) {
        message = Message.fromMessage(message, from);
        if (this.tellsGoodbye(message.contents)) {
            return message.contents + " " + from;
        }

        return undefined;
    },

    tellsGoodbye: function(message) {
        return (/^((le'?ah)|(sl[ea][ea]p)|(later)|((wel)?te?rusten?))$/)
            .test(message);
    },
}

module.exports = Goodbye;
