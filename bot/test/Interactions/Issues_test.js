var Issues = require ('../../src/Interactions/Issues.js');
var GithubAPI = require('../../src/Helpers/Github.js');
var MessageBus = require('../../src/MessageBus.js');


var sinon = require('sinon');

describe("Github integration with kathinka", function() {

    it("Shows a list of open issues", function() {
        // var api = new GithubAPI;
        // var mockedApi = sinon.mock(api);
        // var bus = new MessageBus;
        // var mockedBus = sinon.mock(bus);

        var bus = {
            add: sinon.spy(),
        }

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
        bus.add.calledWith('Issue: #1: Mijn issue');
        issues.interact("Kathinka show issues", "Mark");

        // mockedApi.verify();
        // mockedBus.verify();
    });


    // 'waarom kijk je zo sip?'
    // 'wat is er aan de hand?'
    // 'hoe voel je je?'
    // 'waarom ben je zo stil?'

    // 'wat heeft {username} jou aangedaan?'
});
