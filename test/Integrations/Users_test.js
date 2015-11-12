import Properties from '../../src/Interactions/Properties';
import Message from '../../src/Message.js';

function someProperties() {
    let state = {};
    return new Properties(state);
}

describe("Users that can have different usernames", function() {
    let sender = "Mark";

    it("Can set users", function() {
        let props = someProperties();
        let response = props.interact("Kathinka set user Mark [Mark, Renamed]", sender);
        response = props.interact("Kathinka get user Mark", sender);
        response.should.eql(['Mark', 'Renamed']);

        props.state['users'].should.eql({'Mark': ["Mark", "Renamed"]});
    });
});
