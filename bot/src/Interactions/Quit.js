var isACommand = require('../Helpers/IsACommand.js');
var Quit = function(client) {
    // Meh lelijk, maar werkt voorlopig
    this.client = client;
}

Quit.prototype = {
    interact: function(message, from) {
        var command = isACommand(message);
        if (command && /^af!?$/.test(command)) {
            this.client.disconnect("Is goed, doei!", function() {
                setTimeout(function() {
                    process.exit(1);
                }, 1000);
            });
        }
        return undefined;
    },
}

module.exports = Quit;