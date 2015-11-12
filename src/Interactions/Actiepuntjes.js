import Message from '../Message.js';

export default class Actiepuntjes {
    constructor(state) {
        this.state = state
        this.data = state.actiepuntjes;
    }

  interact(message, from) {
        message = Message.fromMessage(message, from);
        var command = message.command();
        if (!command) {
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
    }

    displayAll() {
        var response = [];
        var idx = 0;
        for(var name in this.data) {
            this.data[name].forEach(function(a) {
                ++idx;
                response.push(idx + ". AP " + name + " " + a);
            });
        }
        return response;
    }

    save(name, ap) {
        if (this.data[name] === undefined) {
            this.data[name] = [ap];
            return;
        }
        this.data[name].push(ap);
    }

    remove(ap) {
        var toInt = parseInt(ap);

        // Remove the ith APtje
        if(! isNaN(toInt) && toInt > 0) {
            return this.removeByIndex(toInt);
        }

        return this.removeBySubject(ap);
    }

    removeBySubject(ap) {
        for(var name in this.data){
            var idx = this.data[name].indexOf(ap);
            if (idx != -1) {
                this.data[name].splice(idx, 1)
                return "Goed bezig " + name;
            }
        }
    }

    removeByIndex(idx) {
        for(var name in this.data){
            if(idx <= this.data[name].length) {
                this.data[name].splice(idx - 1, 1);
                return "Goed bezig " + name;
            } else {
                idx -= this.data[name].length;
            }
        }
    }
}