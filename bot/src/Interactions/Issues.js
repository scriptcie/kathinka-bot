var Message = require('../Message.js');

var AskForIssues = [
    'show issues',
    'waarom kijk je zo sip?',
    'wat is er aan de hand?',
    'hoe voel je je?',
    'waarom ben je zo stil?',
];

var Issues = function(api, bus) {
    this.api = api;
    this.bus = bus;
}

Issues.prototype = {
    interact: function(message, sender) {
        message = Message.fromMessage(message, sender);
        var command = message.command();
        if (!command) {
            return;
        }

        // Save the current protocol type and to
        this.protocol = message;

        if (AskForIssues.indexOf(command) >= 0) {
            this.api.issues(this.showIssues.bind(this));
            return "Laat me even nadenken";
        }

        var match = command.match(/^wat heeft (\w+) jou aangedaan\?$/);
        if (match !== null && match.length > 0) {
            var username = match[1];
            this.api.issuesAssignedFor(
                username,
                this.showIssues.bind(this)
            );
            return "Laat me even nadenken";
        }
    },

    showIssues: function(issues) {
        issues.forEach(function(issue) {
            this.bus.add(
                this.formatIssueMessage(issue)
            );
        }.bind(this));
    },

    formatIssueMessage: function(issue) {
        var message = "Issue: #" + issue.number + ': ' + issue.title;
        return new Message(this.protocol.type, message, this.protocol.to);
    },
}

module.exports = Issues;
