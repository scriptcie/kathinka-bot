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