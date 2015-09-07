var Properties = require ('../../src/Interactions/Properties.js');

function someProperties() {
    var state = {properties: {}};
    return new Properties(state);
}

describe("Properties interaction", function() {
    var sender = "Mark";

    it("Is empty when nothing happened", function() {
        var getset = someProperties();
        getset.interact("", sender);
        getset.data.should.eql({});
    });

    it("Should get able to get after a set", function() {
        var getset = someProperties();
        var response = getset.interact("Kathinka set blaat 1 2 3 a b c", sender);
        response = getset.interact("Kathinka get blaat", sender);
        response.should.equal("1 2 3 a b c");

        response = getset.interact("Kathinka get blyat", sender);
        (response === undefined).should.be.true;
    });

    it("Handles arrays", function() {
        var getset = someProperties();
        getset.interact("Kathinka set blaat [1, 2, 3, a, b, c]", sender);
        getset.data['blaat'].should.eql(['1', '2', '3', 'a', 'b', 'c']);
    });
});
