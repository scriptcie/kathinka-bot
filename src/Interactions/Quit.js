import Message from '../Message.js';

export default class Quit {
    constructor(client) {
        this.client = client;
    }

    interact(message, from) {
        message = Message.fromMessage(message, from);
        let command = message.command();
        if (command && /^af!?$/.test(command)) {
            this.client.disconnect("Is goed, doei!", function() {
                setTimeout(function() {
                    process.exit(1);
                }, 1000);
            });
        }
        return undefined;
    }
}