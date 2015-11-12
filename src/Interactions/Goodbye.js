import Message from '../Message.js';

export default class Goodbye {
    interact(message, from) {
        message = Message.fromMessage(message, from);
        if (this.tellsGoodbye(message.contents)) {
            return message.contents + " " + from;
        }

        return undefined;
    }

    tellsGoodbye(message) {
        return (/^((le'?ah)|(sl[ea][ea]p)|(later)|((wel)?te?rusten?))$/)
            .test(message);
    }

}