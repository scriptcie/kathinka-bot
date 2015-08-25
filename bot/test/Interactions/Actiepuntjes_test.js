var Actiepuntjes = require ('../../src/Interactions/Actiepuntjes.js');

describe("The Actiepuntjes interaction", function() {

    it("Saves new actiepuntjes", function() {
        var AP = new Actiepuntjes({});
        var response = AP.interact("kathinka AP plus fix actiepuntjes", "mark");
        AP.data.should.eql({"plus": ["fix actiepuntjes"]});
    });

    it("Displays all actiepuntjes", function() {
        var AP = new Actiepuntjes({});
        AP.interact("kathinka AP plus fix actiepuntjes", "mark");
        var response = AP.interact("kathinka AP ls", "mark");

        response.length.should.equal(1);
        response[0].should.eql("1. AP plus fix actiepuntjes");
    });

    it("Removes a person actiepuntje", function() {
        ["rm", "voltooid", "gedaan"].forEach(function(rm) {
            var AP = new Actiepuntjes({"plus": ["fix actiepuntjes"]});
            var message = "kathinka AP " + rm + " fix actiepuntjes";
            var response = AP.interact(message, "mark[1]");
            response.should.equal("Goed bezig plus");
            AP.data.should.eql({"plus": []});
        });
    });

    it("Removes a person actiepuntje given an index", function() {
        var AP = new Actiepuntjes({});
        AP.data = {"plus": ["ap1", "ap2"], "mark": ["ap3", "ap4"]};
        AP.interact("kathinka AP rm 3", "mark[1]");
        AP.data.should.eql({"plus": ["ap1", "ap2"], "mark": ["ap4"]});
    });

});