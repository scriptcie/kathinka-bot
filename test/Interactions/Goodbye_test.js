var Goodbye = require ('../../src/Interactions/Goodbye.js');
var Message = require ('../../src/Message.js');

describe("The goodbye interaction", function() {
    var goodbye = new Goodbye;
    var sender = "Mark";

    it("Tells a user goodbye when he or she leaves a channel", function() {
        var messages = [
            ["leah", "leah Mark"],
            ["le'ah", "le'ah Mark"],
            ["Le'ah", "Le'ah Mark"],
            ["sleap", "sleap Mark"],
            ["slaap", "slaap Mark"],
            ["sleep", "sleep Mark"],
            ["later", "later Mark"],
            ["welterusten", "welterusten Mark"],
            ["welteruste", "welteruste Mark"],
            ["weltrusten", "weltrusten Mark"],
            ["weltruste", "weltruste Mark"],
            ["terusten", "terusten Mark"],
            ["teruste", "teruste Mark"],
            ["trusten", "trusten Mark"],
            ["truste", "truste Mark"],
        ];

        messages.forEach(function(message) {
            var messageObj = new Message(Message.Type.Null, message[0], sender);
            var response = goodbye.interact(messageObj, sender);
            response.should.equal(message[1]);
        }, this);
    });

    it("Wont tell goodbye for an arbitrary message", function() {
        var message = goodbye.interact("ik blijf nog even", sender);
        (message === undefined).should.be.true;
    });
});
