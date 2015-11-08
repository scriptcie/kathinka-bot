var Issues = require ('../../src/Interactions/Issues.js');
var Message = require('../../src/Message.js');
var sinon = require('sinon');

describe("Github integration with kathinka", function() {

    it("Shows a list of open issues", function() {
        var messages = [
            'show issues',
            'waarom kijk je zo sip?',
            'wat is er aan de hand?',
            'hoe voel je je?',
            'waarom ben je zo stil?',
        ];

        messages.forEach(function(message) {
            var bus = { add: sinon.spy() }
            var api = {
                issues: function(callback) {
                    callback([
                        {
                            title:    "Mijn issue",
                            number:   1,
                            state:    "open",
                            body:     null,
                            assignee: null,
                        },
                    ])
                },
            }

            var issues = new Issues(api, bus);
            issues.interact("Kathinka " + message, "Mark");
            bus.add.calledWith(
                Message.fromMessage("Issue: #1: Mijn issue", "Mark")
            ).should.be.true;
        });
    });


    it("Shows a list of someone's open issues", function() {
        var username = "MarkRedeman";

        var bus = { add: sinon.spy() }
        var api = {
            issuesAssignedFor: function(username, callback) {
                callback([
                    {
                        title:    "Issue voor mark",
                        number:   1,
                        state:    "open",
                        body:     null,
                        assignee: username,
                    },
                ])
            },
        }

        var issues = new Issues(api, bus);
        issues.interact("Kathinka wat heeft " + username + " jou aangedaan?");
        bus.add.calledWith(
            Message.fromMessage("Issue: #1: Issue voor mark")
        ).should.be.true;
    });
});
