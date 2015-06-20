var BotNet = require ('../src/BotNet.js');
var Kathinka = require ('../src/Kathinka.js');
var should = require('should');

describe("A BotNet", function() {
    it("Connects to a client", function() {
        var client = {};
        var channels = {};
        var kathinka = new Kathinka;

        var botNet = new BotNet(client, channels, kathinka);
    });

    it("Receives messages from a client and sents it to its bots", function() {

    });


    it("Uses responds from bots to respond to the client", function() {

    });
});