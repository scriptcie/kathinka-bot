var GetSet = require ('../../src/Interactions/GetSet.js');

function someGetSet() {
    var data = {};
    return new GetSet(data);
}

describe("GetSet interaction", function() {
    var sender = "Mark";

    it("Is empty when nothing happened", function() {
        var getset = someGetSet();
	var response = getset.interact("", sender);
        getset.data.should.eql({});

	(response === undefined).should.be.true;
    });

    it("Should get able to get after a set", function() {
	var getset = someGetSet();
	var response = getset.interact("Kathinka set blaat 1 2 3 a b c", sender);
	response = getset.interact("Kathinka get blaat", sender);
	response.should.equal("1 2 3 a b c");

	response = getset.interact("Kathinka get blyat", sender);
	(response === undefined).should.be.true;
    });
});
