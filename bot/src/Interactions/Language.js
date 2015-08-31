var isACommand = require('../Helpers/IsACommand.js');
var languagedetect = require('languagedetect');
var Message = require('../Message.js');

var Language = function(state) {
    this.state = state;
    this.detector = new languagedetect();
}

Language.prototype = {
    interact: function(message, from) {
        var message = Message.fromMessage(message, from);
        var list = this.detector.detect(message.contents);

        for (var i = 0; i < list.length; i++) {
            if (list[i][0] === 'english' || list[i][0] === 'dutch') {
                this.state.language = list[i][0];
                break;
            }
        }

        return undefined;
    },
}

module.exports = Language;
