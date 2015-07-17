var Actiepuntjes = require ('../../src/Interactions/Actiepuntjes.js');

var AP = new Actiepuntjes;

describe("The Actiepuntjes interaction", function() {

    it("Saves new actiepuntjes", function() {
        var response = AP.interact("AP plus fix actiepuntjes", "mark");
        AP.data.should.equal({"plus": ["fix actiepuntjes"]});
    });

    it("ignores AP anywhere else than at the start of a sentence",function(){
        AP.interact("hoi hoi AP hoi hoi", "mark");
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