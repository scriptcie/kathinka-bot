var API = require('../../src/Helpers/Github');


describe("Github API", function() {


    it("It gets a list of issues from github and it converts it to an array of issues", function() {
        var api = new API;

        api.issues(function(issues) {
            issues.should.be.instanceof(Array);
        });
    });
});
