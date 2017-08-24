// The eighball returns a random message for messages for
// which the isAQuestion function returns true

var Message = require('../Message.js');

var Eightball = function(state) {
    this.state = state;

    this.eightball = {
        'english': [
            "It is certain", "It is decidedly so", "Without a doubt",
            "Yes definitely", "You may rely on it", "As I see it, yes",
            "Most likely", "Outlook good", "Yes", "Signs point to yes",
            "Reply hazy try again", "Ask again later", "Better not tell you now",
            "Cannot predict now", "Concentrate and ask again", "Don't count on it",
            "My reply is no", "My sources say no", "Outlook not so good",
            "Very doubtful",
        ],
        'dutch': [
            "Het is zeker", "Het is beslist zo", "Zonder twijfel",
            "Zeer zeker", "Je kunt erop vertrouwen", "Volgens mij wel",
            "Zeer waarschijnlijk", "Goed vooruitzicht", "Ja", "Tekenen wijzen op ja",
            "Reactie is wazig, probeer opnieuw", "Vraag later opnieuw", "Beter je nu niet te zeggen",
            "Niet nu te voorspellen", "Concentreer en vraag opnieuw", "Reken er niet op",
            "Mijn antwoord is nee", "Mijn bronnen zeggen nee", "Vooruitzicht is niet zo goed",
            "Zeer twijfelachtig",
        ],
    };
}

function Random(seed) {
	  this._seed = seed % 2147483647;
	  if (this._seed <= 0) this._seed += 2147483646;
}

/**
 *  * Returns a pseudo-random value between 1 and 2^32 - 2.
 *   */
Random.prototype.next = function () {
	  return this._seed = this._seed * 16807 % 2147483647;
};


/**
 *  * Returns a pseudo-random floating point number in range [0, 1).
 *   */
Random.prototype.nextFloat = function (opt_minOrMax, opt_max) {
	  // We know that result of next() will be 1 to 2147483646 (inclusive).
	//   return (this.next() - 1) / 2147483646;
	//   };
	//
	//

Eightball.prototype = {
    interact: function(message, sender) {
        // If the senders asks for some advice, then we give it some random advice
        message = Message.fromMessage(message, sender);
        if (message.question()) {
            // Response based on language
            var language = "english";
            if (this.state.language !== undefined) {
                language = this.state.language;
            }
	    vraagwoord = message.contents.match(/(what)|(when)|(why)|(where)|(how)|(who)|(which)|(wat)|(wanneer)|(waarom)|(waar)|(hoe)|(wie)|(welke?)/i);
	    if(!!vraagwoord){
		vraagwoord = vraagwoord[0];
		    var idx = message.contents.split('')
		        .map(function(i){
		            return i.charCodeAt(0);
		        })
		        .reduce(function(previousValue, currentValue) {
		            return previousValue + currentValue;}
		               ) * 13 % this.eightball[language].length;
		    var rng = Random(idx);
		switch(vraagwoord) {
			case "what":
				return "That";
				break;
			case "when":
				return new Date(Math.floor(rng.next()*(1475245914029)-(1475245914029)/2)).toLocaleString();
				break;
			case "why":
				return "Because 3.";
				break;
			case "where":
				lat = ((rng.next()*180 - 90));
				lng = ((rng.next()*360 - 180));
				return (lat +  ", " + lng) + " (http://maps.google.com?q=" + lat + "," + lng + ")";
				break;
			case "how":
				return "Just... you know..";
				break;
			case "who":
				return rng.next() > 0.5 ? "Me?" : "You?";
				break;
			case "which":
				return rng.next() > 0.5 ? "The left one." : "The right one.";
				break;
			case "wat":
				return "Dat.";
				break;
			case "wanneer":
				return new Date(Math.floor(rng.next()*(1475245914029)-(1475245914029)/2)).toLocaleString();
				break;
			case "waarom":
				return "Daarom";
				break;
			case "waar":
				lat = ((rng.next()*180 - 90));
				lng = ((rng.next()*360 - 180));
				return (lat +  ", " + lng) + " (http://maps.google.com?q=" + lat + "," + lng + ")";
				break;
			case "hoe":
				return "Gewoon...";
				break;
			case "wie":
				return rng.next() > 0.5 ? "Ik?" : "Jij?";
				break;
			case "welk":
			case "welke":
				return rng.next() > 0.5 ? "De linker." : "De rechter.";
				break;

		}
	    }else{
		    var idx = message.contents.split('')
		        .map(function(i){
		            return i.charCodeAt(0);
		        })
		        .reduce(function(previousValue, currentValue) {
		            return previousValue + currentValue;}
		               ) * 13 % this.eightball[language].length;

		    return this.eightball[language][idx];
	    }
        }

        return undefined;
    },
};

module.exports = Eightball;
