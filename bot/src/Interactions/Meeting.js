var isACommand = require('../Helpers/IsACommand.js');

var Meeting = function(data) {
    this.data = data;
    this.started = false;
    this.index = 0;
    this.agenda = [];
}

Meeting.prototype = {
    interact: function(message, from) {
        var command = isACommand(message);
        if (command !== null) {
            return response = this.handleCommand(command, from);
        }

        return undefined;
    },

    handleCommand: function(command, sender) {
        if ('agenda' in this.data &&
            (command === "start meeting" || command === "start vergadering")) {
            this.started = true;
            var response = ['Staring meeting', 'Agenda:'];
            this.setAgenda();
            this.index = 0;
            response.push.apply(response, this.agenda);
            return response;
        }

        if (this.started && command === "next") {
            this.index++;
            if (this.index >= this.agenda.length) {
                command = "stop meeting";
            } else {
                return this.agenda[this.index];
            }
        }

        if (command === "stop meeting" || command === "stop vergadering") {
            this.started = false;
            return "End of the meeting";
        }

        if ('agenda' in this.data && command === "agenda") {
            this.setAgenda();
            return this.agenda;
        }
        return undefined;
    },

    setAgenda: function () {
        if ('agenda' in this.data) {
            this.agenda = ['1. Opening', '2. Vaststellen agenda'];
            var agendaData = this.data['agenda'];
            var index = 3;
            if (typeof agendaData === 'string') {
                this.agenda.push((index++) + '. ' + agendaData);
            } else {
                for (var i = 0; i < agendaData.length; i++) {
                    this.agenda.push('' + (index++) + '. ' + agendaData[i]);
                }
            }
            var end = [(index++) + '. W.v.t.t.k', (index++) + '. Rondvraag',
                       (index++) + '. Sluiting'];
            this.agenda.push.apply(this.agenda, end);
        }
    },
}

module.exports = Meeting
