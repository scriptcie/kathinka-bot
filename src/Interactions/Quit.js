var Message = require('../Message.js');

var Quit = function(bus) {
    this.bus = bus;
}

Quit.prototype = {
    interact: function(message, from) {
        message = Message.fromMessage(message, from);
        var command = message.command();
        if (command && /^af!?$/.test(command)) {
            this.bus.quit();
            setTimeout(function() {
                process.exit(1);
            }, 1000);
        }
        return undefined;
    },
}

module.exports = Quit;
