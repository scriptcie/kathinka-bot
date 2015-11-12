import languagedetect from 'languagedetect';
import Message from '../Message.js';

export default class Language {
    constructor(state) {
        this.state = state;
        this.detector = new languagedetect();
    }

    interact(message, from) {
        message = Message.fromMessage(message, from);
        let list = this.detector.detect(message.contents);

        for (let i = 0; i < list.length; i++) {
            if (list[i][0] === 'english' || list[i][0] === 'dutch') {
                this.state.language = list[i][0];
                break;
            }
        }

        return undefined;
    }
}
