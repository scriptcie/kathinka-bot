var Actiepuntjes = require ('../../src/Interactions/Actiepuntjes.js');

var AP = new Actiepuntjes;

describe("The Actiepuntjes interaction", function() {

    it("Saves new actiepuntjes", function() {
        var response = AP.interact("AP plus fix actiepuntjes", "mark");
        AP.data.should.equal({"plus": ["fix actiepuntjes"]});
    });

    it("Displays all actiepuntjes", function() {
    	var response = AP.interact("AP", "mark");
        response.should.equal(["AP plus fix actiepuntjes"]);
    });

    it("Displays one person's actiepuntjes", function() {
    	var response = AP.interact("AP plus", "mark[1]");
    	response.should.equal(["AP plus fix actiepuntjes"]);
    });
});