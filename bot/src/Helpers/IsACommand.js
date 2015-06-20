isACommand = function(message) {
    var match = message.match(/^[Kk]athinka(-bot)?[,:]{0,1}\s+(.*)$/);

    // Return the command
    if (match !== undefined && match !== null) {
        return match[2];
    }

    return null;
}

module.exports = isACommand;