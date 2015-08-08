var Language = require ('../../src/Interactions/Language.js');

function someDetector() {
    // a helper for if we want to provide a log repository for the logger
    return new Language({});
}

describe("The language detection interaction", function() {
    var sender = "Mark";

    it("Can detect Dutch", function() {
        var detector = someDetector();
        detector.interact("hoi numwis", sender);
        detector.state.language.should.equal('dutch');
    });

    it("Can detect Dutch", function() {
        var detector = someDetector();
        detector.interact("hoi numwis", sender);
        detector.state.language.should.equal('dutch');
        detector.interact("hoe gaat het?", sender);
        detector.state.language.should.equal('dutch');
        detector.interact("ik snap de properties class niet", sender);
        detector.state.language.should.equal('dutch');
    });

    it("Can detect English", function() {
        var detector = someDetector();
        detector.interact("hey numwis", sender);
        detector.state.language.should.equal('english');
        detector.interact("how are you?", sender);
        detector.state.language.should.equal('english');
        detector.interact("I don't understand the properties class", sender);
        detector.state.language.should.equal('english');
    });
});
