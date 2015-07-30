var Actiepuntjes = require ('../../src/Interactions/Actiepuntjes.js');

var data = {};
var AP = new Actiepuntjes(data);

describe("The Actiepuntjes interaction", function() {

    it("Saves new actiepuntjes", function() {
        var response = AP.interact("kathinka AP plus fix actiepuntjes", "mark");
        AP.data.should.eql({"plus": [" fix actiepuntjes"]});
    });

    it("Displays all actiepuntjes", function() {
    	var response = AP.interact("kathinka AP ls", "mark");
        response.should.eql(["AP plus fix actiepuntjes"]);
    });

    it("Removes a person actiepuntje", function() {
    	var response = AP.interact("kathinka AP rm fix actiepuntjes", "mark[1]");
        AP.data.should.eql({"plus": []});
    });
});