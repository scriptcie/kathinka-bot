var GitHubApi = require("github");

var Github = function() {
    this.github = new GitHubApi({
        version: "3.0.0",
    });

    this.user = "scriptcie";
    this.repo = "kathinka-bot";
};

Github.prototype = {
    // Show all issues from the
    issues: function(callback) {
        return this.github.issues.repoIssues(
             {
                user: this.user,
                repo: this.repo,
                sort: "updated",
                direction: "asc",
            },
            function(err, res) {
                callback(res.map(function(issue) {
                    return {
                        title:    issue.title,
                        number:   issue.number,
                        state:    issue.state,
                        body:     issue.body,
                        assignee: issue.assignee,
                    }
                }));
           }
        );
    },
}

module.exports = Github;