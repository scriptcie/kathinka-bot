var GitHubApi = require("github");

var Github = function() {
    this.github = new GitHubApi({
        version: "3.0.0",
    });

    this.user = "scriptcie";
    this.repo = "kathinka-bot";
};

/**
 * Converts a http response from the github api to an issue object
 * @param  result
 * @return issue object
 */
var convertToIssue = function(issue) {
    return {
        title:    issue.title,
        number:   issue.number,
        state:    issue.state,
        body:     issue.body,
        assignee: issue.assignee,
    }
}

Github.prototype = {
    // Show all issues from the
    issues: function(callback) {
        return this.github.issues.repoIssues(
             {
                user:       this.user,
                repo:       this.repo,
                sort:       "updated",
                direction:  "asc",
            },
            function(errro, response) {
                callback(response.map(function(issue) {
                    return convertToIssue(issue);
                }));
           }
        );
    },

    issuesAssignedFor: function(username, callback) {
        return this.github.issues.repoIssues(
             {
                user:       this.user,
                repo:       this.repo,
                sort:       "updated",
                direction:  "asc",
                assignee:   username,
            },
            function(error, response) {
                callback(response.map(function(issue) {
                    return convertToIssue(issue);
                }));
           }
        );
    },
}

module.exports = Github;