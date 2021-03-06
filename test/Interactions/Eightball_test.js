var Eightball = require ('../../src/Interactions/Eightball.js');

describe("The eightball interaction", function() {

    it("Will return a message if the sender asks for advice", function() {
        var eightball = new Eightball({});
        var sender = "Mark";

        var response = eightball.interact("Kathinka, is this a question?", sender);
        (response === undefined).should.be.false;
    });

    it("Won't return a message if the sender does not ask for advice", function() {
        var eightball = new Eightball({});
        var sender = "Mark";

        var response = eightball.interact("Some message", sender);
        (response === undefined).should.be.true;
    });

    it("Won't return a message if the sender does not adress Kathinka", function() {
        var eightball = new Eightball({});
        var sender = "Mark";

        var response = eightball.interact("Some message?", sender);
        (response === undefined).should.be.true;
    });

    it("Eightball's reactions are not random", function() {
        var eightball = new Eightball({});
        var sender = "Mark";
        var message = "Kathinka, something something?";

        var aResponse = eightball.interact(message, sender);
        eightball.interact(message, sender)
            .should.equal(aResponse);

        eightball.interact(message, sender)
            .should.equal(aResponse);
    });

    it(" can recognize more question words/types", function(){
        var eightball = new Eightball({});
        var sender = "Mark";
        var messagelist = [
                "What are you doing?",
                "When are you done?",
                "Why are you so awesome?",
                "where are my shoes?",
                "how do you know all this?",
                "who takes the next drink?",
                "which road should I take?",
                "wat ben je aan het doen?",
                "wanneer ben jij er?",
                "waarom ben je zo ontzagwekkend?",
                "waar zijn mijn schoenen?",
                "hoe doe je dit allemaal?",
                "Welke weg moet ik inslaan?",
                "Wie heeft er honger?",
                "Wie wil er nou nog gaan branchen?",
                "Welk biertje ad jij eerst?",
                "Who did not take the left path?",
                "which branch is this again?",
                        ];        
         var answerlist = [
                "That",
                "3/12/2033, 11:52:14 PM",
                "Because 3.",
                "(-43.386939019432766, 178.70983782660068) (http://maps.google.com?q=-43.386939019432766,178.70983782660068)",
                "Just... you know..",
                "Me?",
                "The right one.",
                "Dat.",
                "7/17/1987, 1:59:43 PM",
                "Daarom",
                "(84.79808211327745, -133.7674144194062) (http://maps.google.com?q=84.79808211327745,-133.7674144194062)",
                "Gewoon...",
                "De rechter.",
                "Ik?",
                "Jij?",
                "De linker.",
                "You?", 
                "The left one.", 
                         ];
        (messagelist.length).should.equal(answerlist.length);
        for(var index = 0; index < messagelist.length; index = index + 1){
        //let index = 0;
            let message = "Kathinka, " + messagelist[index];
            let response = eightball.interact(message, sender);
            response.should.equal(answerlist[index]);
        }
    });
});
