// The eighball returns a random message for messages for
// which the isAQuestion function returns true

var isAQuestion = require('../Helpers/IsAQuestion.js');

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
            "Very doubtful"],
        'dutch': [
            "Het is zeker", "Het is beslist zo", "Zonder twijfel",
            "Zeer zeker", "Je kunt erop vertrouwen", "Volgens mij wel",
            "Zeer waarschijnlijk", "Goed vooruitzicht", "Ja", "Tekenen wijzen op ja",
            "Reactie is wazig, probeer opnieuw", "Vraag later opnieuw", "Beter je nu niet te zeggen",
            "Niet nu te voorspellen", "Concentreer en vraag opnieuw", "Reken er niet op",
            "Mijn antwoord is nee", "Mijn bronnen zeggen nee", "Vooruitzicht is niet zo goed",
            "Zeer twijfelachtig"
        ]
    };
}

Eightball.prototype = {
    interact: function(message, sender) {
        // If the senders asks for some advice, then we give it
        // some random advice
        if (isAQuestion(message)) {
            // Response based on language
            var language = "english";
            if (this.state.language !== undefined) {
                language = this.state.language;
            }
            var idx = message.split('')
                .map(function(i){
                    return i.charCodeAt(0);
                })
                .reduce(function(previousValue, currentValue) {
                    return previousValue + currentValue;}
                       ) * 13 % this.eightball[language].length;

            return this.eightball[language][idx];
        }

        return undefined;
    },
};

module.exports = Eightball;
