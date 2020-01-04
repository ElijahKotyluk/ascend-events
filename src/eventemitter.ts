export interface Emitter {
    events: any[];
}

export default class EventEmitter implements Emitter {
    public events: any[];

    constructor() {
        this.events = [];
    }
}
