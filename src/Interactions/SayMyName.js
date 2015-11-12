import Message from '../Message.js';

export default class SayMyName {
    interact(message, from) {
        message = Message.fromMessage(message, from);
        if (/^.*[Kk]athinka.*$/.test(message.contents)) {
            return "* I AM KATHINKA-BOT *";
        }
        return undefined;
    }
}