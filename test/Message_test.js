import Message from '../src/Message.js';

describe("Message", function() {
    let prefixes = [
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

    it("can recognize questions", function() {
        prefixes.forEach(function(prefix) {
            let message = new Message(Message.Type.Null,
                                      prefix + " kan ik jou dit vragen?",
                                      "Mark");
            let question = message.question();
            question.should.equal("kan ik jou dit vragen");
        });
    });

    it("returns null when something isn't a question", function() {
        let message = new Message(Message.Type.Null, "Hallo!", "Mark");
        let question = message.question();
        (question === false).should.be.true;
    });

    it("always answers Steam questions", function() {
        let message = new Message(Message.Type.Steam, "hallo?", "Mark");
        let question = message.question();
        question.should.equal("hallo");
    });

    it("can recognize commands", function() {
        prefixes.forEach(function(prefix) {
            let message = new Message(Message.Type.Null,
                                      prefix + " doe dit",
                                      "Mark");
            let command = message.command();
            command.should.equal("doe dit");
        });
    });

    it("returns null when something isn't a command", function() {
        let message = new Message(Message.Type.Null, "Hallo!", "Mark");
        let command = message.command();
        (command === null).should.be.true;
    });

    it("unless it's a Steam message", function() {
        let message = new Message(Message.Type.Steam, "Hallo!", "Mark");
        let command = message.command();
        command.should.equal("Hallo!");
    });
});
