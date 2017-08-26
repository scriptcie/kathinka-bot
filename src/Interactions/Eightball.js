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


var PRNG = function (seed) {
    let x = seed;
    for(let index = 0; index <= 100; index = index+1){
    x = 3.99 * x * (1-x);}
    return x;
}

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

        let vraagwoord = message.contents.match(/([Ww]hat)|([Ww]hen)|([Ww]hy)|([Ww]here)|([Hh]ow)|([Ww]ho)|([Ww]hich)|([Ww]at)|([Ww]anneer)|([Ww]aarom)|([Ww]aar)|([Hh]oe)|([Ww]ie)|([Ww]elke?)/i);
        if(vraagwoord){
            vraagwoord = vraagwoord[0];
            let idx = message.contents.split('')
                .map(function(i){
                    return i.charCodeAt(0);
                })
                .reduce(function(previousValue, currentValue) {
                    return previousValue + currentValue;}
                       ) * 13 % this.eightball[language].length;
            let rng = PRNG((idx % 2147483647)/2147483647);
            let lat = (((PRNG(rng))*180 - 90));
            let lng = (((PRNG(PRNG(rng))*360 - 180)));

        switch(vraagwoord.toLowerCase()) {
            case "what":
                return "That";
            case "when":
                return new Date(Math.floor(rng*(1475245914029)-(1475245914029)/2)).toLocaleString('en-GB', {timeZone : 'Europe/Amsterdam'});
            case "why":
                return "Because 3.";
            case "where":
                return "(" + lat +  ", " + lng + ")" + " (http://maps.google.com?q=" + lat + "," + lng + ")";
            case "how":
                return "Just... you know..";
            case "who":
                return rng > 0.5 ? "Me?" : "You?";
            case "which":
                return rng > 0.5 ? "The left one." : "The right one.";
            case "wat":
                return "Dat.";
            case "wanneer":
                return new Date(Math.floor(rng*(1475245914029)-(1475245914029)/2)).toLocaleString('nl-NL', {timeZone : 'Europe/Amsterdam'});
            case "waarom":
                return "Daarom";
            case "waar":
                return "(" + lat +  ", " + lng + ")" + " (http://maps.google.com?q=" + lat + "," + lng + ")";
            case "hoe":
                return "Gewoon...";
            case "wie":
                return rng > 0.5 ? "Ik?" : "Jij?";
            case "welk":
            case "welke":
                return rng > 0.5 ? "De linker." : "De rechter.";

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
