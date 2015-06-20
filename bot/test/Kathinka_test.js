var Kathinka = require ('../src/Kathinka.js');

describe("Kathinka", function() {

    // 't is eigenlijk wel lelijk om zo hier een object te maken
    var HelloWorldInteraction = function() {

    };

    HelloWorldInteraction.prototype.interact = function(message, from) {
        return "Hallo " + from;
    };

    it("Gets notified about messages from users and responds appropriately", function() {
        var kathinka = new Kathinka([new HelloWorldInteraction]);

        var message = "Hallo Kathinka";
        var from = "Mark";

        kathinka.notify(message, from, function(response) {
            response.should.equal("Hallo Mark");
        });
    });

    it("Chooses a responses from multiple interactions", function() {

    });

    // describe("With simple interactions", function() {
    //     it("Has a set of interactions", function() {
    //         var interactions = [];

    //         var kathinka = new Kathinka(interactions);
    //     });

    // })



    // Some test ideas:
    // it prioritizes grouped interacitons
    //   example: "hoe laat is het?" geeft agenda punt als eerder om agenda punt is gevraagd
    //
    //   example: m0i zegt welterusten, Mark reageert welterusten "m0i", dan is welterusten "Mark" niet echt een goede reactie

});