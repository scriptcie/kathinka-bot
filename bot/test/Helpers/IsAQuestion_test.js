var isAQuestion = require('../../src/Helpers/IsAQuestion.js');

describe("A question for kathinka", function() {

    it("Kathinka can be asked questions", function() {
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
            var command = isAQuestion(prefix + " kan ik jou dit vragen?");
            command.should.equal("kan ik jou dit vragen");
        });
    });

    it("Returns null when something isnt a Question", function() {
        var isQuestion = isAQuestion("Hallo!");
        (isQuestion === false).should.be.true;
    });
});