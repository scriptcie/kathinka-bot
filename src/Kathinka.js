// Kathinka is a bot that can interact with messages

let Kathinka = function(interactions, bus) {
    this.interactions = interactions || [];
    this.bus = bus;
};

Kathinka.prototype = {

    // Process a request, create
    notify: function(message, from, respond) {
        // Get the messages returned by the handlers
        let responses = this.handle(message, from);

        respond(responses);
    },

    // handles a message (one line of text)
    handle: function(message, sender) {
        let responses = this.responsesFrom(message, sender);

        return this.prioritizedResponse(responses);
    },

    responsesFrom: function(message, from) {
        // Get any valid response and remember its prioirty
        let responses = [];
        this.interactions.forEach(function(interaction, index) {
            let response = null;

            // Try giving both a Message object and a string to
            // the message handlers
            try {
                response = interaction.interact(message, from);
            }
            catch(err) {
                response = interaction.interact(message.contents, from);
            }

            // We don't want to return empty responses
            if (response === undefined || response === null) {
                return;
            }

            // Convert to an array of messages
            if (typeof response === 'string') {
                response = [response];
            }

            // Remember the response and its priority such that we can
            // determine which response to return based on priority
            responses.push({
                message: response,
                priority: this.basePriorityOf(index),
            });
        }, this);

        return responses;
    },

    prioritizedResponse: function(responses) {
        // By default we won't return a response
        let prioritized = { message: [], priority: -1 };

        // Return the response with the heighest priority
        responses.forEach(function(res) {
            if (prioritized.priority < res.priority) {
                prioritized = res;
            }
        });

        return prioritized.message;
    },

    basePriorityOf: function(index) {
        return index;
    },
};

// Zorgt ervoor dat we:
//     let kathinka = new require('Kathinka');
// kunnen doen
module.exports = Kathinka;
