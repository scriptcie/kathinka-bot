var isACommand = require('../Helpers/IsACommand.js');

var Actiepuntjes = function() {
	this.data = {};
}

Actiepuntjes.prototype = {
	interact: function(message, from) {
		var matched = message.match(/^([Aa]ctiepunt[a-z]*|AP[a-z]*) ?(.*)/);
		if(!matched) {
			return; 
		}
		var command = matched[2];
		if ( command === "" ) {
			return this.displayAll();
		}
		var matched2 = command.match(/(\S+) ?(.*)/);
		console.log(matched2[1]);
		if ( matched2[2] === "" ) {
			return this.displayOne(matched2[1]);
		}
		this.save(matched2);
	},

	displayAll: function() {
		var response = [];
		for(name in this.data) {
			this.data[name].forEach(function(res) {
				response.push("AP " + name + " " + res);
			});
		}
		return response;
	},

	displayOne: function(name) {
		var response = [];
		this.data[name].forEach(function(res) {
			response.push("AP " + name + " " + res);
		});
		return response;
	},

	save: function(matched) {
		if (this.data[matched[1]] === undefined) {
			this.data[matched[1]] = [matched[2]];
			return;
		}
		this.data[matched[1]].push(matched[2]);
	},
}

module.exports = Actiepuntjes;