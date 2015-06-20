var Goodbye = function() {}

Goodbye.prototype = {
    interact: function(message, from) {
        if (this.tellsGoodbye(message)) {
            return message + " " + from;
        }

        return undefined;
    },

    tellsGoodbye: function(message) {
        return (/^((le'?ah)|(sl[ea][ea]p)|(later)|((wel)?te?rusten?))$/)
            .test(message);
    }
}

module.exports = Goodbye;