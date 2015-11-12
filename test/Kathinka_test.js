import Kathinka from '../src/Kathinka.js';

describe("Kathinka", function() {

    // 't is eigenlijk wel lelijk om zo hier een object te maken
    let HelloWorldInteraction = function() {

    };

    HelloWorldInteraction.prototype.interact = function(message, from) {
        return "Hallo " + from;
    };

    it("Gets notified about messages from users and responds appropriately", function() {
        let kathinka = new Kathinka([new HelloWorldInteraction]);

        let message = "Hallo Kathinka";
        let from = "Mark";

        kathinka.notify(message, from, function(response) {
            response.should.eql(["Hallo Mark"]);
        });
    });


    // TODO: add observer and dispatcher stuff

    // Some test ideas:
    // it prioritizes grouped interacitons
    //   example: "hoe laat is het?" geeft agenda punt als eerder om agenda punt is gevraagd
    //
    //   example: m0i zegt welterusten, Mark reageert welterusten "m0i", dan is welterusten "Mark" niet echt een goede reactie

});