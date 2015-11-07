var Message = require('../Message.js');

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

        if (command === 'show issues') {
            this.api.issues(this.showIssues.bind(this));
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
        return "Issue: #" + issue.number + ': ' + issue.title;
    },
}

module.exports = Issues;
