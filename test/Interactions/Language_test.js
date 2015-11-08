var Language = require ('../../src/Interactions/Language.js');
var Message = require ('../../src/Message.js');

function someDetector() {
    // a helper for if we want to provide a log repository for the logger
    return new Language({});
}

describe("The language detection interaction", function() {
    var sender = "Mark";

    it("Can detect Dutch", function() {
        var detector = someDetector();
        var message = new Message(Message.Type.Null, "hoi numwis", sender);
        detector.interact(message, sender);
        detector.state.language.should.equal('dutch');
    });

    it("Can detect Dutch", function() {
        var detector = someDetector();
        var message = new Message(Message.Type.Null, "hoi numwis", sender);
        detector.interact(message, sender);
        detector.state.language.should.equal('dutch');
        message = new Message(Message.Type.Null, "hoe gaat het?", sender);
        detector.interact(message, sender);
        detector.state.language.should.equal('dutch');
        message = new Message(Message.Type.Null, "ik snap de properties class niet", sender);
        detector.interact(message, sender);
        detector.state.language.should.equal('dutch');
    });

    it("Can detect English", function() {
        var detector = someDetector();
        var message = new Message(Message.Type.Null, "hey numwis", sender);
        detector.interact(message, sender);
        detector.state.language.should.equal('english');
        message = new Message(Message.Type.Null, "how are you?", sender);
        detector.interact(message, sender);
        detector.state.language.should.equal('english');
        message = new Message(Message.Type.Null, "I don't understand the properties class", sender);
        detector.interact(message, sender);
        detector.state.language.should.equal('english');
    });
});
