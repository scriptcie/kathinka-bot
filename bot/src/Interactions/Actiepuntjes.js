var isACommand = require('../Helpers/IsACommand.js');

var Actiepuntjes = function(data) {
	this.data = data;
}

Actiepuntjes.prototype = {
	interact: function(message, from) {
		var matched = message.match(/^[Kk]athinka(?:-bot)?[,:]{0,1}\s+([Aa]ctiepunt[a-z]*|AP[a-z]*)\s+(\S+)(.*)/);
		if(matched) {
			switch(matched[2]){
				case "ls":
					return this.displayAll();

				case "rm":
				case "voltooid":
				case "gedaan":
					return this.rm(matched[3]);

				default:
					return this.save(matched[2], matched[3])
			}
		}
	},

	displayAll: function() {
		var response = [];
		var idx = 0;
		for(name in this.data) {
			this.data[name].forEach(function(a) {
				++idx;
				response.push(idx + ". AP " + name + a);
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

	rm: function(ap) {
		var toInt = parseInt(ap);
		if(toInt != NaN && toInt > 0) {
			for(name in this.data){
				if(toInt < this.data[name].length) {
					this.data[name].splice(toInt - 1, 1);
					return "Goed bezig " + name;
				} else {
					toInt -= this.data[name].length;
				}
			}
		}

		for(name in this.data){
			var idx = this.data[name].indexOf(ap);
			if (idx != -1) {
				this.data[name].splice(idx, 1)
				return "Goed bezig " + name;	
			}
		}
	},
}

module.exports = Actiepuntjes;