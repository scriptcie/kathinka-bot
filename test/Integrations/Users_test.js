var Properties = require('../../src/Interactions/Properties');
var Message = require('../../src/Message.js');

function someProperties() {
    var state = {};
    return new Properties(state);
}

describe("Users that can have different usernames", function() {
    var sender = "Mark";

    it("Can set users", function() {
        var props = someProperties();
        var response = props.interact("Kathinka set user Mark [Mark, Renamed]", sender);
        response = props.interact("Kathinka get user Mark", sender);
        response.should.eql(['Mark', 'Renamed']);
 
        props.state['users'].should.eql({'Mark': ["Mark", "Renamed"]});
    });
});
