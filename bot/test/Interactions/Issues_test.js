var Issues = require ('../../src/Interactions/Issues.js');
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
            bus.add.calledWith('Issue: #1: Mijn issue').should.be.true;
        });
    });
});
