import Goodbye from '../../src/Interactions/Goodbye.js';
import Message from '../../src/Message.js';

describe("The goodbye interaction", function() {
    let goodbye = new Goodbye;
    let sender = "Mark";

    it("Tells a user goodbye when he or she leaves a channel", function() {
        let messages = [
            ["leah", "leah Mark"],
            ["le'ah", "le'ah Mark"],
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
            let messageObj = new Message(Message.Type.Null, message[0], sender);
            let response = goodbye.interact(messageObj, sender);
            response.should.equal(message[1]);
        }, this);
    });

    it("Wont tell goodbye for an arbitrary message", function() {
        let message = goodbye.interact("ik blijf nog even", sender);
        (message === undefined).should.be.true;
    });
});
