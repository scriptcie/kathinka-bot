// Constructor
var Kathinka = function() {
    this.requests = [];
};

Kathinka.prototype = {

    // Process a request, create
    notify: function(message, respond) {
        // Get the messages returned by the handlers
        var responses = this.handle(message);

        respond(responses);
    }

    handle: function(message) {
        // todo have it handle a set of requests
        return ['hallo, dit is een test', 'hier is een ander bericht'];
    }
};

// Zorgt ervoor dat we:
//     var kathinka = new require('Kathinka');
// kunnen doen
module.exports = Kathinka;