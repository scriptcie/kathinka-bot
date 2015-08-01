var isACommand = require('../Helpers/IsACommand.js');

var Meeting = function(data) {
    this.data = data;
    this.started = false;
    this.index = 0;
    this.agenda = [];
    this.lastActivity = 0;
}

Meeting.prototype = {
    interact: function(message, from) {
        var command = isACommand(message);
        if (command !== null) {
            return response = this.handleCommand(command, from);
        }

        var self = this;
        this.lastActivity = (new Date()).getTime() / 1000;
        setTimeout(function() {self.goNext();}, 60 * 5 * 1000);

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
            return this.goNext(true);
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

    setAgenda: function() {
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

    goNext: function(force) {
        var time = (new Date()).getTime();
        if (force || this.lastActivity + 60 * 5 - 1 <= time) {
            this.index++;
            if (this.index >= this.agenda.length) {
                this.started = false;
                return "End of the meeting";
            } else {
                return this.agenda[this.index];
            }
        }
    }
}

module.exports = Meeting
