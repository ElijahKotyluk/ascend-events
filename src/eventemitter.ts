export default class EventEmitter {
    public listeners: number;
    public events: Map<string | symbol, Function[]>;

    constructor() {
        this.events = new Map();
        this.listeners = 10;
    }

    public getListenerCount(eventName: string | symbol): number {
        if (this.events.has(eventName)) {
            return (this.events.get(eventName) as Function[]).length;
        } else {
            return 0;
        }
    }

    public addListener(eventName: string | symbol, listener: Function): EventEmitter {
        if (this.events.has(eventName)) {
            const listeners = this.events.get(eventName) as Function[];
            listeners.push(listener);
        } else {
            this.events.set(eventName, [listener]);
        }

        if (this.listeners > 0 && this.getListenerCount(eventName) > this.listeners) {
            throw new Error(`The maximum amount of listeners should not exceed ${this.listeners}.`);
        }
        return this;
    }


    public setListenerCount(num: number): EventEmitter {
        this.listeners = num;

        return this;
    }
}
