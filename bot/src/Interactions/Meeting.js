var isACommand = require('../Helpers/IsACommand.js');
var Message = require('../Message.js');

var Meeting = function(state, bus) {
    this.state = state
    this.data = state.properties;
    this.started = false;
    this.index = 0;
    this.agenda = [];
    this.lastActivity = 0;
    this.bus = bus;
    this.protocol = '';
}

Meeting.prototype = {
    interact: function(message, from) {
        var message = Message.fromMessage(message, from);

        var command = isACommand(message.contents);
        var response = undefined;
        if (command !== null) {
            response = this.handleCommand(command, from, message);
        }

        if (this.started && this.protocol.type === message.type) {
            var self = this;
            this.lastActivity = (new Date()).getTime() / 1000;
            setTimeout(function() {self.goNext();}, 60 * 5 * 1000);
        }

        return response;
    },

    handleCommand: function(command, sender, protocol) {
        if ('agenda' in this.data &&
            (command === "start meeting" || command === "start vergadering")) {
            this.started = true;
            var response = ['Staring meeting', 'Agenda:'];
            this.setAgenda();
            this.index = 0;
            this.protocol = protocol;
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
        var time = (new Date()).getTime() / 1000;
        if (!this.started) {
            return;
        }

        if (force) {
            this.index++;
            if (this.index >= this.agenda.length) {
                this.started = false;
                return "End of the meeting";
            } else {
                return this.agenda[this.index];
            }
        } else if (this.lastActivity + 60 * 5 - 1 <= time) {
            this.index++;
            if (this.index >= this.agenda.length) {
                this.started = false;
                var message = new Message(this.protocol.type, "End of the meeting", this.protocol.to);
                this.bus.add(message);
            } else {
                var message = new Message(this.protocol.type, this.agenda[this.index], this.protocol.to);
                this.bus.add(message);

                // And restart the timeout
                var self = this;
                this.lastActivity = time;
                setTimeout(function() {self.goNext();}, 60 * 5 * 1000);
            }
        }
    }
}

module.exports = Meeting
