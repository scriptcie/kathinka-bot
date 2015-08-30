var isACommand = require('../Helpers/IsACommand.js');

var Actiepuntjes = function(state) {
    this.state = state
    this.data = state.actiepuntjes;
}

Actiepuntjes.prototype = {
    interact: function(message, from) {
        var command = isACommand(message);
        if (! command) {
            return;
        }

        var matched = command.match(/([Aa]ctiepunt[a-z]*|AP[a-z]*)\s+(\S+)(.*)/);
        if(matched) {
            switch(matched[2]){
            case "ls":
                return this.displayAll();

            case "rm":
            case "voltooid":
            case "gedaan":
                return this.remove(matched[3].trim());

            default:
                return this.save(matched[2], matched[3].trim())
            }
        }
    },

    displayAll: function() {
        var response = [];
        var idx = 0;
        for(name in this.data) {
            this.data[name].forEach(function(a) {
                ++idx;
                response.push(idx + ". AP " + name + " " + a);
            });
        }
        return response;
    },

    save: function(name, ap) {
        if (this.data[name] === undefined) {
            this.data[name] = [ap];
            return;
        }
        this.data[name].push(ap);
    },

    remove: function(ap) {
        var toInt = parseInt(ap);

        // Remove the ith APtje
        if(toInt != NaN && toInt > 0) {
            return this.removeByIndex(toInt);
        }

        return this.removeBySubject(ap);
    },

    removeBySubject: function(ap) {
        for(name in this.data){
            var idx = this.data[name].indexOf(ap);
            if (idx != -1) {
                this.data[name].splice(idx, 1)
                return "Goed bezig " + name;
            }
        }
    },

    removeByIndex: function(idx) {
        for(name in this.data){
            if(idx <= this.data[name].length) {
                this.data[name].splice(idx - 1, 1);
                return "Goed bezig " + name;
            } else {
                idx -= this.data[name].length;
            }
        }
    }
}

module.exports = Actiepuntjes;
