var isAQuestion = function(message) {
    var match = message.match(/^[Kk]athinka(-bot)?[,:]{0,1}\s+(.*)\?$/);

    // Return the question
    if (match !== undefined && match !== null) {
        return match[2];
    }

    return false;
}

module.exports = isAQuestion;