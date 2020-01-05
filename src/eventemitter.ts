const isEventName = (eventName: string | symbol): boolean => {
    if (typeof eventName !== 'string' || 'symbol') {
        return false;
    }

    return true;
};

export default class EventEmitter {
    public maxListeners: number;
    public events: Map<string | symbol, Function[]>;

    constructor() {
        this.events = new Map();
        this.maxListeners = 10;
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

        if (this.maxListeners > 0 && this.getListenerCount(eventName) > this.maxListeners) {
            throw new Error(`The maximum amount of listeners should not exceed ${this.maxListeners}.`);
        }
        return this;
    }
}
