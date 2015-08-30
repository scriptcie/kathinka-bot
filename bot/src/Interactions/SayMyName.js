var SayMyName = function() {}

SayMyName.prototype = {
    interact: function(message, from) {

        if (/^.*[Kk]athinka.*$/.test(message)) {
            return "* I AM KATHINKA-BOT *";
        }

        return undefined;
    },
}

module.exports = SayMyName;
