var Message = require('../Message.js');

var SayMyName = function() {}

SayMyName.prototype = {
    interact: function(message, from) {
        var message = Message.fromMessage(message, from);

        if (/^.*[Kk]athinka.*$/.test(message.contents)) {
            return "* I AM KATHINKA-BOT *";
        }

        return undefined;
    },
}

module.exports = SayMyName;
