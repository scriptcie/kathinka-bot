var API = require('./../../src/Helpers/Github');


describe("Github API", function() {


    it("It gets a list of issues from github and it converts it to an array of issues", function(done) {
        var api = new API;

        api.issues(function(issues) {
            issues.should.be.instanceof(Array);
            done();
        });
    });

    it("It gets a list of issues from github assigned by username", function(done) {
        var api = new API;

        api.issuesAssignedFor("MarkRedeman", function(issues) {
            issues.should.be.instanceof(Array);
            issues[0].assignee.login.should.be.equal("MarkRedeman");
            done();
        });
    });

});
