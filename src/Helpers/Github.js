var GitHubApi = require("@octokit/rest");

var Github = function() {
    this.github = new GitHubApi();
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
    async_issues: async function() {
        const options = this.github.issues.listForRepo.endpoint.merge(
            {
                owner:      this.user,
                repo:       this.repo,
                sort:       "updated",
                direction:  "asc",
            });
        var issues = [];
        for await (const response of this.github.paginate.iterator(options)) {
            response.data.map(function(issue) {
                issues.push(convertToIssue(issue));
            });
        }
        return issues;
    },

    issues: function(callback) {
        this.async_issues().then(
            function(issues) {
                callback(issues);
            });
    },

    async_issuesAssignedFor: async function(username) {
        const options = this.github.issues.listForRepo.endpoint.merge(
            {
                owner:      this.user,
                repo:       this.repo,
                sort:       "updated",
                direction:  "asc",
                assignee:   username,
            });
        var issues = [];
        for await (const response of this.github.paginate.iterator(options)) {
            response.data.map(function(issue) {
                issues.push(convertToIssue(issue));
            });
        }
        return issues;
    },

    issuesAssignedFor: function(username, callback) {
        this.async_issuesAssignedFor(username).then(
            function(issues) {
                callback(issues);
            });
    },
}

module.exports = Github;
