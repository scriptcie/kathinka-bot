var isACommand = require('../../src/helpers/isACommand.js');

describe("A kathinka command", function() {

    it("Kathinka can be commanded to do things", function() {
        var prefixes = [
            "Kathinka-bot",
            "kathinka-bot",
            "Kathinka",
            "kathinka",

            "Kathinka-bot, ",
            "kathinka-bot, ",
            "Kathinka, ",
            "kathinka, ",

            "Kathinka-bot: ",
            "kathinka-bot: ",
            "Kathinka: ",
            "kathinka: ",
        ];

        prefixes.forEach(function(prefix) {
            var command = isACommand(prefix + " doe dit");
            command.should.equal("doe dit");
        });
    });

    it("Returns null when something isnt a command", function() {
        var notACommand = isACommand("Hallo!");
        (notACommand === null).should.be.true;
    });
});