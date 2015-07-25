var isACommand = require('../Helpers/IsACommand.js');

var Meeting = function(data) {
    this.data = data;
    this.started = false;
}

Meeting.prototype = {
    interact: function(message, from) {
        var command = isACommand(message);
        if (command !== null) {
            var response = this.handleCommand(command, from);
            if (response !== undefined) {
                return response;
            }
        }

        return undefined;
    },

    handleCommand: function(command, sender) {
        if ('agenda' in this.data &&
            (command === "start meeting" || command === "start vergadering")) {
            this.started = true;
            var response = ['Staring meeting', 'Agenda:', '1. Opening',
                            '2. Vaststellen agenda'];
            var agenda = this.data['agenda'];
            var index = 3;
            if (typeof agenda === 'string') {
                response.push((index++) + '. ' + agenda);
            } else {
                for (var i = 0; i < agenda.length; i++) {
                    response.push('' + (index++) + '. ' + agenda[i]);
                }
            }
            var end = [(index++) + '. W.v.t.t.k', (index++) + '. Rondvraag',
                       (index++) + '. Sluiting'];
            response.push.apply(response, end);
            return response;
        }
        if (command === "stop meeting" || command === "stop vergadering") {
            this.started = false;
            return "Stopping meeting";
        }
        return undefined;
    },
}

module.exports = Meeting
