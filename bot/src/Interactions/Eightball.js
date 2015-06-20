// The eighball returns a random message for messages for
// which the askedForAdvice function returns true
// TODO (dit vind ik niet echt een mooie interface)
var Eightball = function(askedForAdvice) {
    this.askedForAdvice = askedForAdvice;

    this.eightball = [
        "It is certain", "It is decidedly so", "Without a doubt",
        "Yes definitely", "You may rely on it", "As I see it, yes",
        "Most likely", "Outlook good", "Yes", "Signs point to yes",
        "Reply hazy try again", "Ask again later", "Better not tell you now",
        "Cannot predict now", "Concentrate and ask again", "Don't count on it",
        "My reply is no", "My sources say no", "Outlook not so good",
        "Very doubtful"
    ];
}

Eightball.prototype = {
    interact: function(message, sender) {
        // If the senders asks for some advice, then we give it
        // some random advice
        if (this.askedForAdvice(message)) {
            var idx = message.split('')
                .map(function(i){
                    return i.charCodeAt(0);
                })
                .reduce(function(previousValue, currentValue) {
                    return previousValue + currentValue;}
                ) * 13 % this.eightball.length;

            return this.eightball[idx];
        }

        return undefined;
    },
};

module.exports = Eightball;